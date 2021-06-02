import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const middleware = [thunk]

const initialState = {
    user:{},
    gridDisplay:4,
    showNZ: true,
    showVA: true,
    showCNI: true,
    showWI: true,
    showSAT: true,
    expandSidebar: true,
    currentDisplay: 'VOLCANO_MATRIX',
    lightningAlerts:{},
    loggedIn: false,
    accessToken: '',
    requireRefresh:false
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
    case 'SET_SAT_FILTER':
        return {
            ...state,
            showSAT: action.payload
        }
    case 'EXPAND_SIDEBAR':
        return {
            ...state,
            expandSidebar: action.payload
        }
    case 'SET_CURRENT_DISPLAY':
        return {
            ...state,
            currentDisplay: action.payload
        }
    case 'SET_LIGHTNING_DATA':
        return {
            ...state,
            lightningAlerts: action.payload
        }
    case 'SET_LOGIN':
        return {
            ...state,
            loggedIn: action.payload
        }
    case 'SET_TOKEN':
        return {
            ...state,
            accessToken: action.payload
        }
    case 'REQUIRE_REFRESH':
        return {
            ...state,
            requireRefresh:action.payload
        }
    case 'SET_USER':
        return {
            ...state,
            user: action.payload
        }
    default:
      return state;
  };
};