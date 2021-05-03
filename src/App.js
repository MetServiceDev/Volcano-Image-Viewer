import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import VolcanoOverview from './ui/VolcanoOverview';
import Navbar from './ui//Navbar';
import Sidebar from './ui/Sidebar';
import { Volcanoes } from './Volcanoes';
import LandingPage from './ui/LandingPage';
import { useState } from 'react';


function App() {

  const [toggle, setToggle] = useState(true);

  return (
    <Router>
      <Route exact path='/'>
        <Navbar 
          volcanoes={[].concat(Volcanoes.map(volcano => { return volcano.name.replace(/_/g, ' '); }))}
          showVAAC={()=>{setToggle(true)}} showSO2={()=>{setToggle(false)}}
        />
        <Sidebar/>
        <LandingPage volcanoes={Volcanoes} toggle={toggle}/>
      </Route>
      <Route exact path='/:volcano' render={(props) => (<VolcanoOverview {...props} volcanoes={Volcanoes}/>)}/>
    </Router>
  );
};

export default App;
