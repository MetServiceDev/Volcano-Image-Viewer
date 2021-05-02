import { BrowserRouter as Router, Route } from 'react-router-dom';
import VolcanoMap from './ui/VolcanoMap';
import VolcanoOverview from './ui/VolcanoOverview';
import { withStyles } from '@material-ui/styles';
import './App.css'

const styles = {
  root: {
  },
  volcanoMap: {
   width:'100%',
   position:'absolute',
   left:'0%',
   top:'10%'
  }
}


function App({classes}) {

  return (
    <Router>
      <Route exact path='/'>
        <div>
          <VolcanoMap/>
        </div>
      </Route>
      <Route exact path='/:volcano' component={VolcanoOverview}/>
    </Router>
    
  );
}

export default withStyles(styles)(App);
