import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import VolcanoOverview from './ui/VolcanoOverview';
import Navbar from './ui//Navbar';
import Sidebar from './ui/Sidebar';
import LandingPage from './ui/LandingPage';
import { useEffect } from 'react';
import { SulfurMaps } from './metadata/SulfurMaps';
import { Provider } from 'react-redux';
import { store } from './redux';
import MetaTags from 'react-meta-tags';
import { useDispatch, useSelector } from 'react-redux';
import { handleSidebar, handleGridDisplay, handleTimestamps, handleVolcanicAlerts, handleLogin } from './redux/actions';
import apiCall from './APICall';
import Login from './ui/Login';
import authClient from './modules/Auth';
import { Security } from '@okta/okta-react';
import AshMapOverview from './ui/AshMap';
import { redirectUri } from './metadata/Endpoints';
import ErrorPage from './ui/ErrorPage';
import issueToken from './modules/IssueToken';

function App() {
  
  const [volcanoes, fetchVolcanoes] = useState([]);

  const dispatch = useDispatch();

  const setSidebar = val => dispatch(handleSidebar(val));
  const setGridDisplay = size => dispatch(handleGridDisplay(size));

  const setTimestamps = array => dispatch(handleTimestamps(array));
  const setVolcanicAlerts = array => dispatch(handleVolcanicAlerts(array));

  const loggedIn = useSelector(state => state.loggedIn);
  const setLogin = bool => dispatch(handleLogin(bool));
  const token = localStorage.getItem('token');

  useEffect(() => {
    authClient.session.exists()
    .then(async(session) => {
      if (session) {
        try{
          const accessToken = await issueToken()
          localStorage.setItem('token', accessToken);
          setLogin(true);
        } catch(err){
          setLogin(false)
        }
      } else {
        if(token){
          authClient.session.refresh()
            .then(async() => {
              try{
                const accessToken = await issueToken()
                localStorage.setItem('token', accessToken);
                setLogin(true);
              } catch(err){
                setLogin(false)
              }
            })
        } else{
          setLogin(false);
        }
      }
    });
  },[]);

  useEffect(() => {
    if(loggedIn){
      apiCall('volcano-list', 'GET', token).then(data => { fetchVolcanoes(data) });
      const expandSidebar = localStorage.getItem('expandSidebar');
      const gridSize = localStorage.getItem('gridSize');
      if(expandSidebar){ setSidebar(JSON.parse(expandSidebar.toLowerCase())); };
      if(gridSize){ setGridDisplay(Number(gridSize)); };
      setInterval(() => {
        window.location.reload();
      },60000*10);
    };
  },[]);

  useEffect(() => {
    if(loggedIn){
      apiCall('metadata', 'GET', token).then(data => {
        setTimestamps([].concat(data.body.reverse().map(stamp => { return stamp.slice(0,8); })));
      });
    };
  },[]);

  useEffect(() => {
    if(loggedIn){
      apiCall('volcanic-alerts', 'GET', token).then(data => { setVolcanicAlerts(data.body); })
    };
  },[]);

  return (
    <Router>
        <Switch>
          <Route exact path='/'>
            <MetaTags><title>Volcano Webcam Monitor</title></MetaTags>
            {loggedIn ?
              <div>
                <Navbar/>
                <Sidebar/>
                <LandingPage sulfurMaps={SulfurMaps} volcanoes={volcanoes}/>
              </div> :
              <Redirect to='/login' />
            }
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
