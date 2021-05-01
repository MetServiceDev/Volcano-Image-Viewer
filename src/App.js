import { BrowserRouter as Router, Route } from 'react-router-dom';
import VolcanoList from './ui/VolcanoList';
import VolcanoOverview from './ui/VolcanoOverview';

function App() {


  return (
    <Router>
      <Route exact path='/' component={VolcanoList}/>
      <Route exact path='/:volcano' component={VolcanoOverview}/>
    </Router>
    
  );
}

export default App;
