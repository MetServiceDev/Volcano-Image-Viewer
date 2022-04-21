import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { SecureRoute, Security, LoginCallback } from '@okta/okta-react';
import { toRelativeUrl } from '@okta/okta-auth-js';
import { ApolloProvider } from '@apollo/client';
import { Volcano, QuakeDict } from '@metservice/aviationtypes';
import './ui/App.css';
import authClient from './api/auth/Auth';
import { HTTPMethod } from "./api/APICall";
import appTheme from './AppTheme';
import store from './redux/store/index';
import client from './graphQL/client';
import Dashboard from './ui/Dashboard';
import VolcanoOverview from './ui/Overview';
import Login from './ui/LoginForm/Login';
import AshMapOverview from './ui/Overview/AshMap';
import UserDashboard from './ui/UserDashboard';
import ErrorPage from './ui/ErrorComponents/ErrorPage';
import { redirectUri } from './metadata/Endpoints';
import useFetchLinks from './api/hooks/useFetchLinks';
import fetchQuakeHistory from "./api/quakes/fetchQuakeHistory";
import { AppContext } from './AppContext';
import { navOptionsReducer } from './api/display/headers';
// import { QuakeDict } from './api/quakes/headers';
import useAuthState from './api/hooks/useAuthState';
import useLocalStorage from './api/hooks/useLocalStorage';
import useFilter from './api/hooks/useFilter';
// import { volcanoQuery } from './graphQL/queries';
import useAPICall from './api/hooks/useAPICall';

const App: React.FC = () => {
  const theme = localStorage.getItem('ui-theme');
  const themeBool = JSON.parse(theme as string)

  const [styleTheme, toggleTheme] = React.useState<boolean>(themeBool);
  const muiTheme = appTheme(styleTheme);
  // const [volcanoes, setVolcanoes] = React.useState<Volcano[]>([]);
  // const volcanoesQuery = useQuery(volcanoQuery);
  // React.useEffect(() => {
  //   setVolcanoes(volcanoesQuery?.data?.fetchVolcanoes);
  // }, [volcanoesQuery]);
  

  const user = useAuthState();

  const volcanoes = useAPICall<Volcano[]>({
    route: 'volcanoes',
    method: HTTPMethod.GET,
    token: user?.token
  });

  const [quakes, setQuakes] = React.useState<QuakeDict>({});

  const { links, polling, counter, fetchLinks } = useFetchLinks();

  const [imageLog, setImageLog] = React.useState<any>();

  const [expandSidebar, toggleSidebar] = useLocalStorage('expandSidebar', '');
  const [gridDisplay, setGrid] = useLocalStorage('gridSize', 4);

  const { filters, dispatchFilter }  = useFilter();

  const [{ showNavFilter, showNavGrid, showThemeToggle }, dispatchNavOption] = React.useReducer(navOptionsReducer, {
    showNavFilter: false,
    showNavGrid: false,
    showThemeToggle: false,
});

  const setTheme = () => {
    toggleTheme(!styleTheme);
    localStorage.setItem('ui-theme', String(!styleTheme));
  };

  React.useEffect(()=> {
    async function fetchData(): Promise<void> {
      const volcanoIds = volcanoes?.map(v => v.gnsID);
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
    user,
    expandSidebar,
    toggleSidebar,
    gridDisplay,
    setGrid,
    theme:styleTheme,
    filters,
    dispatchFilter,
    counter,
    fetchLinks,
    currentImages: { imageLog, setImageLog },
    navFilterState: {
      showNavFilter,
      showNavGrid,
      showThemeToggle,
      dispatchNavOption,
    },
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <AppContext.Provider value={contextValue}>
        <Paper style={{ height: '250vh' }} elevation={0}>
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
        </Paper>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

const AppWithSecurity = () => {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth:any, originalUri:string) => {
    history.replace(toRelativeUrl(originalUri || '/', redirectUri));
  };
  return (
    <Security
        oktaAuth={authClient}
        restoreOriginalUri={restoreOriginalUri}
      >
        <App />
      </Security>
  )
}

const AppWithRouterAccess = () => {
  return (
    <Router>
      <AppWithSecurity />  
    </Router>
  )
};

const Wrapper = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <AppWithRouterAccess/>
    </Provider>
  </ApolloProvider>
);

export default Wrapper;
