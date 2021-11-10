   import { combineReducers } from 'redux';
import { gridDisplayReducer} from './gridReducer';
import { filterReducer } from './filterReducer';
import { loginReducer } from './loginReducer';
import { displayReducer } from './displayReducer';
import { lightningReducer } from './lightningReducer';
import { refreshReducer } from './refreshReducer';
import { sidebarReducer } from './sidebarReducer';
import { imagesReducer } from './imagesReducer';

const rootReducer = combineReducers({
    gridDisplay: gridDisplayReducer,
    filters: filterReducer,
    login: loginReducer,
    currentDisplay: displayReducer,
    lightningAlerts: lightningReducer,
    requireRefresh: refreshReducer,
    expandSidebar: sidebarReducer,
    images: imagesReducer,
});
  
export default rootReducer;
