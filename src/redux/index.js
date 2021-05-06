import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const middleware = [thunk]

const initialState = {
  gridDisplay:4,
  showNZ: true,
  showVA: true,
  expandSidebar: true
};

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
);

function reducer(state, action) {
  switch (action.type) {
    case 'SET_GRID_DISPLAY':
        return{
            ...state,
            gridDisplay:action.payload
        }
    case 'SET_NZ_FILTER':
        return {
            ...state,
            showNZ: action.payload
        }
    case 'SET_VA_FILTER':
        return {
            ...state,
            showVA: action.payload
        }
    case 'EXPAND_SIDEBAR':
        return {
            ...state,
            expandSidebar: action.payload
        }
    default:
      return state;
  };
};