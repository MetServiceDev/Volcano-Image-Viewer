import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import VolcanoOverview from './ui/VolcanoOverview';
import Navbar from './ui//Navbar';
import Sidebar from './ui/Sidebar';
import { Volcanoes } from './Volcanoes';
import LandingPage from './ui/LandingPage';
import { useState, useEffect } from 'react';
import { SulfurMaps } from './SulfurMaps';
import { Provider } from 'react-redux';
import {store} from './redux';
import MetaTags from 'react-meta-tags';
import { useDispatch } from 'react-redux';
import { handleSidebar, handleGridDisplay } from './redux/actions';

function App() {

  const [toggle, setToggle] = useState(true);
  const dispatch = useDispatch()
  const setSidebar = val => dispatch(handleSidebar(val))
  const setGridDisplay = size => dispatch(handleGridDisplay(size));

  useEffect(() => {
    const expandSidebar = localStorage.getItem('expandSidebar');
    const gridSize = localStorage.getItem('gridSize');
    if(expandSidebar){
      setSidebar(JSON.parse(expandSidebar.toLowerCase()));
    };
    if(gridSize){
      setGridDisplay(Number(gridSize));
    };
    setInterval(() => {
      window.location.reload();
    },60000*10);
  });

  return (
    <Router>
      <Route exact path='/'>
        <MetaTags><title>Volcano Webcam Monitor</title></MetaTags>
        <Navbar
          showVAAC={()=>{setToggle(true)}}
          showSO2={()=>{setToggle(false)}}
        />
        <Sidebar/>
        <LandingPage volcanoes={Volcanoes} toggle={toggle} sulfurMaps={SulfurMaps}/>
      </Route>
      <Route exact path='/:volcano' render={props => (<VolcanoOverview {...props} volcanoes={Volcanoes}/>)}/>
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
