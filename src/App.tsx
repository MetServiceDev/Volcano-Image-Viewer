import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { SecureRoute, Security, LoginCallback } from '@okta/okta-react';
import { toRelativeUrl } from '@okta/okta-auth-js';
import { useDispatch, useSelector } from 'react-redux';

import './ui/App.css';
import authClient from './api/auth/Auth';
import appTheme from './AppTheme';
import store, { AppState } from './redux/store/index';

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
import { searchVolcano } from './api/filterSearch';

import { setQuakes } from './redux/effects/quakeEffect';
import { setS3ImageTags } from './redux/effects/s3LinksEffect';

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

  React.useEffect(() => {
    setInterval(async() => {
      setLoaded(false)
      try {
        await authClient.session.refresh();
        const token = authClient.getAccessToken() as string;
        dispatch(setS3ImageTags(token));
      } catch (err) {
        console.log(err)
      };
      setLoaded(true);
    },60000*10);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (user) {
      dispatch(setS3ImageTags(user.token));
      poll(user.token).then(async(res) => {
        setVolcanoes(res);
        setLoaded(true);
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
  }

  const volcanoSearch = (e: any) => {
    const results = searchVolcano(e.target.value, volcanoes);
    setVolcanoes(results);
  }

  React.useEffect(() => {
    const volcanoIds = volcanoes.map(v => v.gnsID);
    const gnsIDs = [...new Set(volcanoIds)].filter(Boolean) as string[];
    authClient.session.exists().then(session => {
      if(session) {
        dispatch(setQuakes(gnsIDs))
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volcanoes])

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
            <SecureRoute exact path='/user/:id'>
              <UserDashboard
                volcanoes={volcanoes}
              />
            </SecureRoute>
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
