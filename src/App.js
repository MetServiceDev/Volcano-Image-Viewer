import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import VolcanoOverview from './ui/VolcanoOverview';
import Navbar from './ui//Navbar';
import Sidebar from './ui/Sidebar';
import { Volcanoes } from './Volcanoes';
import LandingPage from './ui/LandingPage';
import { useEffect } from 'react';
import { SulfurMaps } from './SulfurMaps';
import { Provider } from 'react-redux';
import { store } from './redux';
import MetaTags from 'react-meta-tags';
import { useDispatch, useSelector } from 'react-redux';
import { handleSidebar, handleGridDisplay, handleTimestamps, handleVolcanicAlerts, handleLogin } from './redux/actions';
import apiCall from './APICall';
import Login from './ui/Login';
import authClient from './Auth';
import AshMapOverview from './ui/AshMap';

function App() {

  const dispatch = useDispatch();
  const setSidebar = val => dispatch(handleSidebar(val));
  const setGridDisplay = size => dispatch(handleGridDisplay(size));
  const setTimestamps = array => dispatch(handleTimestamps(array));
  const setVolcanicAlerts = array => dispatch(handleVolcanicAlerts(array));
  const setLogin = bool => dispatch(handleLogin(bool));

  const loggedIn = useSelector(state => state.loggedIn);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if(token){
      authClient.token.getWithoutPrompt({
          responseType: ['id_token', 'token'],
          redirectUri: 'http://localhost:3000',
      }).then((res) => {
        const accessToken = res.tokens.accessToken.accessToken;
        localStorage.setItem('token', accessToken);
        setLogin(true);
      }).catch(err => console.log(err));
    }
    else {
      setLogin(false);
    };
  });

  useEffect(() => {
    if(loggedIn){
      const expandSidebar = localStorage.getItem('expandSidebar');
      const gridSize = localStorage.getItem('gridSize');
      if(expandSidebar){ setSidebar(JSON.parse(expandSidebar.toLowerCase())); };
      if(gridSize){ setGridDisplay(Number(gridSize)); };
      setInterval(() => {
        window.location.reload();
      },60000*10);
    };  
  });

  useEffect(() => {
    if(loggedIn){
      apiCall('metadata', 'GET', token).then(data => {
        setTimestamps([].concat(data.body.reverse().map(stamp => { return stamp.slice(0,8); })));
      })
    }
  });

  useEffect(() => {
    if(loggedIn){
      apiCall('volcanic-alerts', 'GET', token).then(data => { setVolcanicAlerts(data.body); })
    };
  })

  return (
    <Router>
      <Route exact path='/'>
        <MetaTags><title>Volcano Webcam Monitor</title></MetaTags>
        {loggedIn ?
          <div>
            <Navbar/>
            <Sidebar/>
            <LandingPage volcanoes={Volcanoes} sulfurMaps={SulfurMaps}/>
          </div> :
          <Redirect to='/login' />     
        }
      </Route>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/overview' render={props => (<VolcanoOverview {...props} volcanoes={Volcanoes}/>)}/>
      <Route exact path='/Vanuatu Ash Map' render={props => (<AshMapOverview {...props}/>)}/>
    </Router>
  );
};

const Wrapper = () => {
  return(
    <Provider store={store}>
      <App/>
    </Provider>
  );
};

export default Wrapper;
