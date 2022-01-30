   import { combineReducers } from 'redux';
import { filterReducer } from './filterReducer';
import { displayReducer } from './displayReducer';

const rootReducer = combineReducers({
    filters: filterReducer,
    currentDisplay: displayReducer,
});
  
export default rootReducer;
