   import { combineReducers } from 'redux';
import { gridDisplayReducer} from './gridReducer';
import { filterReducer } from './filterReducer';
import { displayReducer } from './displayReducer';
import { sidebarReducer } from './sidebarReducer';

const rootReducer = combineReducers({
    gridDisplay: gridDisplayReducer,
    filters: filterReducer,
    currentDisplay: displayReducer,
    expandSidebar: sidebarReducer,
});
  
export default rootReducer;
