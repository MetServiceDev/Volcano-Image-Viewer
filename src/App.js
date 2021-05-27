import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import VolcanoOverview from './ui/Overview/VolcanoOverview';
import Navbar from './ui/Navbar/Navbar';
import Sidebar from './ui/Sidebar/Sidebar';
import LandingPage from './ui/LandingPage/LandingPage.jsx';
import { useEffect } from 'react';
import { SulfurMaps } from './metadata/SulfurMaps';
import { Provider } from 'react-redux';
import { store } from './redux';
import MetaTags from 'react-meta-tags';
import { useDispatch, useSelector } from 'react-redux';
import { handleSidebar, handleGridDisplay, handleLogin, handleToken, handleRefresh } from './redux/actions';
import apiCall from './modules/APICall';
import Login from './ui/LoginForm/Login';
import authClient from './modules/Auth';
import { Security } from '@okta/okta-react';
import AshMapOverview from './ui/Overview/AshMap';
import { redirectUri } from './metadata/Endpoints';
import ErrorPage from './ui/ErrorComponents/ErrorPage';
import issueToken from './modules/IssueToken';
import SplashScreen from './ui/ReusedComponents/SplashScreen';
import { poll } from './modules/Poller';

function App() {
  
  const [volcanoes, fetchVolcanoes] = useState([]);
  const [loaded, setLoaded] = useState(false)

  const dispatch = useDispatch();

  const setSidebar = val => dispatch(handleSidebar(val));
  const setGridDisplay = size => dispatch(handleGridDisplay(size))

  const loggedIn = useSelector(state => state.loggedIn);
  const setLogin = bool => dispatch(handleLogin(bool));

  const setToken = token => dispatch(handleToken(token));
  const token = useSelector(state => state.accessToken);

  const requireRefresh = useSelector(state => state.requireRefresh);
  const setRefresh = bool => dispatch(handleRefresh(bool));

  const setCreds = async() => {
    try{
      const accessToken = await issueToken();
      setToken(accessToken);    
      localStorage.setItem('token', accessToken);
      setLogin(true);
      setLoaded(true);
    } catch(err){
      setLogin(false);
      setLoaded(true);
    };
  }

  useEffect(() => {
    authClient.session.exists()
    .then((session) => {
      if (session) {
        setCreds();
      } else {
        if(token){
          authClient.session.refresh()
            .then(() => {
              setCreds();
            })
        } else{
          setLogin(false);
          setLoaded(true);
        };
      };
    });
  },[]);

  useEffect(() => {
    if(requireRefresh){
      fetchVolcanoes([])
      poll(token, res => { 
        fetchVolcanoes(res.body);
        setTimeout(() => {
          setRefresh(false)
        },100)
      });
    }
  },[requireRefresh])

  useEffect(() => {
    if(loggedIn){
      poll(token, res => { fetchVolcanoes(res.body); });
      const expandSidebar = localStorage.getItem('expandSidebar');
      const gridSize = localStorage.getItem('gridSize');
      if(expandSidebar){ setSidebar(JSON.parse(expandSidebar.toLowerCase())); };
      if(gridSize){ setGridDisplay(Number(gridSize)); };
      var poller = setInterval(() => {
        fetchVolcanoes([])
        poll(token, res => { 
          fetchVolcanoes(res.body);
          authClient.session.refresh().then(() => { setCreds(); });
        });
        clearInterval(poller);
      },60000*10);

    };
  },[loggedIn, token]);

  const logout = async () => {
    await authClient.revokeAccessToken();
    authClient.closeSession()
      .then(() => {
        setToken('');    
        localStorage.removeItem('token');
        setLogin(false);
      }).catch(e => {
        if (e.xhr && e.xhr.status === 429) {
          throw e;
        };
      });  
  }

  return (
    <Router>
        <Switch>
          <Route exact path='/'>
            <MetaTags><title>Volcano Webcam Monitor</title></MetaTags>
            {loaded ? 
              <div>
                {loggedIn ?
                  <div>
                    <Navbar logout={logout}/>
                    <Sidebar/>
                    <LandingPage sulfurMaps={SulfurMaps} volcanoes={volcanoes}/>
                  </div> : <Redirect to='/login'/>}
              </div> : <SplashScreen/>} 
          </Route>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/overview' render={props => (<VolcanoOverview {...props} volcanoes={volcanoes}/>)}/>
          <Route exact path='/Vanuatu Satellite' render={props => (<AshMapOverview {...props}/>)}/>
          <Route component={ErrorPage}/>
        </Switch>
    </Router>
  );
};

const Wrapper = () => {
  return(
    <Provider store={store}>
      <Security oktaAuth={authClient} restoreOriginalUri={redirectUri}>
        <App/>
      </Security>
    </Provider>
  );
};

export default Wrapper;
