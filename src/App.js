import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import VolcanoOverview from './ui/VolcanoOverview';
import Navbar from './ui//Navbar';
import Sidebar from './ui/Sidebar';
import { Volcanoes } from './Volcanoes';
import LandingPage from './ui/LandingPage';
import { useState, useEffect } from 'react';
import { SulfurMaps } from './SulfurMaps';


function App() {

  const [toggle, setToggle] = useState(true);
  const [showSidebar, toggleSidebar]= useState(true);

  const [showNZ, filterNZ] = useState(true);
  const [showVA, filterVA] = useState(true);

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
          showNZ={showNZ}
          showVA={showVA}
          toggleNZ={()=>{filterNZ(!showNZ)}}
          toggleVA={()=>{filterVA(!showVA)}}
        />
        <Sidebar showMenu={showSidebar} toggle={()=>{toggleSidebar(!showSidebar)}}/>
        <LandingPage volcanoes={Volcanoes} toggle={toggle} sulfurMaps={SulfurMaps} expand={!showSidebar} showNZ={showNZ} showVA={showVA}/>
      </Route>
      <Route exact path='/:volcano' render={(props) => (<VolcanoOverview {...props} volcanoes={Volcanoes}/>)}/>
    </Router>
  );
};

export default App;
