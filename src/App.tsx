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
import Navbar from './ui/Navbar/Navbar';
import Sidebar from './ui/Sidebar/Sidebar';
import LandingPage from './ui/LandingPage/LandingPage.jsx';
// import { SulfurMaps } from './metadata/SulfurMaps';
import { useDispatch, useSelector } from 'react-redux';
// import { handleSidebar, handleGridDisplay, handleLogin, handleToken, handleRefresh } from './redux/actions';
import Login from './ui/LoginForm/Login';
import AshMapOverview from './ui/Overview/AshMap';
import ErrorPage from './ui/ErrorComponents/ErrorPage';
import { Volcano } from './api/volcano/headers';
import { poll } from './api/poller';
import { User } from './api/User/headers';
import { toggleSidebar } from './redux/effects/sidebarEffect';
import { setGrid } from './redux/effects/gridEffect';
import './ui/App.css';

const App: React.FC = () => {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth:any, originalUri:string) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  const dispatch = useDispatch();

  const user = useSelector((state:AppState) => state.login) as User;

  const [volcanoes, setVolcanoes] = React.useState<Volcano[]>([]);

  React.useEffect(() => {
    if (user) {
      const expandSidebar = localStorage.getItem('expandSidebar');
      const gridSize = localStorage.getItem('gridSize');
      if(expandSidebar) { dispatch(toggleSidebar(JSON.parse(expandSidebar.toLowerCase()))); };
      if(gridSize) { dispatch(setGrid(Number(gridSize))); };
      poll(user).then(res => setVolcanoes(res))
    }
  },[user])

  const muiTheme = appTheme(false)

  return (
    <ThemeProvider theme={muiTheme}>
      <Paper style={{ height: '100vh'}}>
        <Security oktaAuth={authClient} restoreOriginalUri={restoreOriginalUri}>
          <Switch>
            <Route exact path='/'>
              <Dashboard volcanoes={volcanoes}/>
            </Route>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/overview' render={props => (<VolcanoOverview {...props} volcanoes={volcanoes}/>)}/>
            {/* <Route exact path='/Vanuatu Satellite' render={props => (<AshMapOverview {...props}/>)}/> */}
            <Route component={ErrorPage}/>
            <Route exact path='/login/callback' component={LoginCallback} />
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
