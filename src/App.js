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


function App() {

  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    setInterval(() => {
      window.location.reload();
    },60000*10);
  },[]);

  return (
    <Router>
      <Route exact path='/'>
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
