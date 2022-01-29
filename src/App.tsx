import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { SecureRoute, Security, LoginCallback } from '@okta/okta-react';
import { toRelativeUrl } from '@okta/okta-auth-js';
import { useDispatch } from 'react-redux';

import './ui/App.css';
import authClient from './api/auth/Auth';
import appTheme from './AppTheme';
import store from './redux/store/index';

import Dashboard from './ui/Dashboard';
import VolcanoOverview from './ui/Overview';
import Login from './ui/LoginForm/Login';
import AshMapOverview from './ui/Overview/AshMap';
import UserDashboard from './ui/UserDashboard';
import ErrorPage from './ui/ErrorComponents/ErrorPage';
import { Volcano } from './api/volcano/headers';
import { poll } from './api/poller';
import { User } from './api/User/headers';
import { toggleSidebar } from './redux/effects/sidebarEffect';
import { setGrid } from './redux/effects/gridEffect';
import { redirectUri } from './metadata/Endpoints';

import useFetchLinks from './api/hooks/useFetchLinks';
import fetchQuakeHistory from "./api/quakes/fetchQuakeHistory";
import { AppContext } from './AppContext';
import { QuakeDict } from './api/quakes/headers';

const App: React.FC = () => {
  const theme = localStorage.getItem('ui-theme');
  const themeBool = JSON.parse(theme as string)

  const [styleTheme, toggleTheme] = React.useState<boolean>(themeBool);
  const muiTheme = appTheme(styleTheme);
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth:any, originalUri:string) => {
    history.replace(toRelativeUrl(originalUri || '/', redirectUri));
  };

  const dispatch = useDispatch();

  const [user, setUser] = React.useState<User | null>();

  const [volcanoes, setVolcanoes] = React.useState<Volcano[]>([]);
  const [quakes, setQuakes] = React.useState<QuakeDict>({});

  const { links, polling } = useFetchLinks(); 

  React.useEffect(() => {
    if (user) {
      poll(user.token).then(async(res) => {
        setVolcanoes(res);
      }).catch(err => console.log(err))
      const expandSidebar = localStorage.getItem('expandSidebar');
      const gridSize = localStorage.getItem('gridSize');
      if(expandSidebar) { dispatch(toggleSidebar(JSON.parse(expandSidebar.toLowerCase()))); };
      if(gridSize) { dispatch(setGrid(Number(gridSize))); };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user]);

  const setTheme = () => {
    toggleTheme(!styleTheme);
    localStorage.setItem('ui-theme', String(!styleTheme));
  };

  React.useEffect(()=> {
    async function fetchData(): Promise<void> {
      const volcanoIds = volcanoes.map(v => v.gnsID);
      const gnsIDs = [...new Set(volcanoIds)].filter(Boolean) as string[];
      const quakes = await fetchQuakeHistory(gnsIDs);
      setQuakes(quakes);
    }
    fetchData();
  }, [volcanoes]);

  const contextValue = {
    links,
    volcanoes,
    polling,
    quakes,
    user:user as User,
    setUser
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <AppContext.Provider value={contextValue}>
        <Paper style={{ height: '250vh' }} elevation={0}>
          <Security oktaAuth={authClient} restoreOriginalUri={restoreOriginalUri}>
            <Switch>
              <Route exact path='/'>
                <Dashboard
                  theme={styleTheme}
                  toggleTheme={setTheme}
                />
              </Route>
              <Route exact path='/login' component={Login}/>
              <SecureRoute exact path='/overview' component={VolcanoOverview}/>
              <SecureRoute exact path='/Vanuatu Satellite'>
                <AshMapOverview />
              </SecureRoute>
              <SecureRoute exact path='/user/:id' component={UserDashboard} />
              <Route exact path='/login/callback' component={LoginCallback} />
              <Route component={ErrorPage}/>
            </Switch>
          </Security>
        </Paper>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

const AppWithRouterAccess = () => (
  <Router>
    <App />
  </Router>
); 

const Wrapper = () => (
  <Provider store={store}>
    <AppWithRouterAccess/>
  </Provider>
);

export default Wrapper;
