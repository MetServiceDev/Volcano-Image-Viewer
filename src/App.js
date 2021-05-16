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

function App() {

  const dispatch = useDispatch();
  const setSidebar = val => dispatch(handleSidebar(val));
  const setGridDisplay = size => dispatch(handleGridDisplay(size));
  const setTimestamps = array => dispatch(handleTimestamps(array));
  const setVolcanicAlerts = array => dispatch(handleVolcanicAlerts(array));
  const setLogin = bool => dispatch(handleLogin(bool));

  const loggedIn = useSelector(state => state.loggedIn);


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
      apiCall('metadata').then(data => {
        setTimestamps([].concat(data.body.reverse().map(stamp => { return stamp.slice(0,8); })));
      })
    }
  // eslint-disable-next-line
  },[]);

  useEffect(() => {
    if(loggedIn){
      fetch(`https://geonet-volcano-images.s3-ap-southeast-2.amazonaws.com/volcano-eruption-alerts.json`, {
        headers: { 'x-api-key': 'lKbptndQxl2AO4liuRVvi53IQZFLNMQI4tv3RrFq' }
      }).then(res => res.json())
      .then(data => {
        setVolcanicAlerts(data)
      });
    }  
    // eslint-disable-next-line
  },[])

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
