   import { combineReducers } from 'redux';
import { displayReducer } from './displayReducer';

const rootReducer = combineReducers({
    currentDisplay: displayReducer,
});
  
export default rootReducer;
