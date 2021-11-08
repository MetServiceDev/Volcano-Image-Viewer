import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { SecureRoute, Security, LoginCallback } from '@okta/okta-react';
import { toRelativeUrl } from '@okta/okta-auth-js';

import authClient from './api/auth/Auth';
import appTheme from './AppTheme';
import store, { AppState } from './redux/store/index';

import Dashboard from './ui/Dashboard';
import VolcanoOverview from './ui/Overview/VolcanoOverview';
import { useDispatch, useSelector } from 'react-redux';
import Login from './ui/LoginForm/Login';
import AshMapOverview from './ui/Overview/AshMap';
import ErrorPage from './ui/ErrorComponents/ErrorPage';
import { Volcano } from './api/volcano/headers';
import { poll } from './api/poller';
import { User } from './api/User/headers';
import { toggleSidebar } from './redux/effects/sidebarEffect';
import { setGrid } from './redux/effects/gridEffect';
import issueToken from './api/auth/issueToken';
import { setLogin } from './redux/effects/loginEffect';
import './ui/App.css';
import { redirectUri } from './metadata/Endpoints';
import { searchVolcano } from './api/filterSearch';

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

  const user = useSelector((state:AppState) => state.login) as User;

  const [volcanoes, setVolcanoes] = React.useState<Volcano[]>([]);
  const [hasLoaded, setLoaded] = React.useState<boolean>(false);

  const refreshSession = async (volcanoes: Volcano[]): Promise<void> => {
    setVolcanoes(volcanoes);
    await authClient.session.refresh();
    const accessToken = await issueToken();
    user['token'] = accessToken
    dispatch(setLogin({...user} as User));
  };

  React.useEffect(() => {
    if (user) {
      poll(user).then(async(res) => {
        setVolcanoes(res);
        setLoaded(true);
      });
      const expandSidebar = localStorage.getItem('expandSidebar');
      const gridSize = localStorage.getItem('gridSize');
      if(expandSidebar) { dispatch(toggleSidebar(JSON.parse(expandSidebar.toLowerCase()))); };
      if(gridSize) { dispatch(setGrid(Number(gridSize))); };
      var poller = setInterval(() => {
        setLoaded(false)
        poll(user).then(async(res) => {
          setLoaded(true);
          await refreshSession(res);
        });
        clearInterval(poller);
      },60000*10);
    }
  },[user]);

  const setTheme = () => {
    toggleTheme(!styleTheme);
    localStorage.setItem('ui-theme', String(!styleTheme));
  }

  const volcanoSearch = (e: any) => {
    const results = searchVolcano(e.target.value, volcanoes);
    setVolcanoes(results);
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <Paper style={{ height: '250vh' }} elevation={0}>
        <Security oktaAuth={authClient} restoreOriginalUri={restoreOriginalUri}>
          <Switch>
            <Route exact path='/'>
              <Dashboard
                volcanoes={volcanoes}
                hasLoaded={hasLoaded}
                theme={styleTheme}
                toggleTheme={setTheme}
                search={(e) => volcanoSearch(e)}
              />
            </Route>
            <Route exact path='/login' component={Login}/>
            <SecureRoute exact path='/overview' component={VolcanoOverview}/>
            <SecureRoute exact path='/Vanuatu Satellite'>
              <AshMapOverview />
            </SecureRoute>
            {/* <Route component={ErrorPage}/> */}
            <Route exact path='/login/callback' component={LoginCallback} />
            <Route component={ErrorPage}/>
          </Switch>
        </Security>
      </Paper>
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
