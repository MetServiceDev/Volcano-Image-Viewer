import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const middleware = [thunk]

const initialState = {
  gridDisplay:4,
  showNZ: true,
  showVA: true,
  showCNI: true,
  showWI: true,
  expandSidebar: true,
  timestamps: []
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
    case 'SET_CNI_FILTER':
        return {
            ...state,
            showCNI: action.payload
        }
    case 'SET_WI_FILTER':
        return {
            ...state,
            showWI: action.payload
        } 
    case 'EXPAND_SIDEBAR':
        return {
            ...state,
            expandSidebar: action.payload
        }
    case 'SET_TIMESTAMPS':
        return {
            ...state,
            timestamps: action.payload
        }
    default:
      return state;
  };
};