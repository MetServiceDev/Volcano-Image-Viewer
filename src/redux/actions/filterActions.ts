import {
    SET_NZ_FILTER, SET_VA_FILTER, SET_CNI_FILTER, SET_WI_FILTER, SET_SAT_FILTER,
    NZFilterType, VAFilterType, CNIFilterType, WIFilterType, SATFilterType
  } from '../types/filterType';
  
  export const nzFilterAction = (bool: boolean): NZFilterType => {
      return {
        type: SET_NZ_FILTER,
        payload: bool
      };
  };
  
  export const vaFilterAction = (bool: boolean): VAFilterType => {
    return {
      type: SET_VA_FILTER,
      payload: bool
    };
  };
  
  export const cniFilterAction = (bool: boolean): CNIFilterType => {
    return {
      type: SET_CNI_FILTER,
      payload: bool
    };
  };
  
  export const wiFilterAction = (bool: boolean): WIFilterType => {
    return {
      type: SET_WI_FILTER,
      payload: bool
    };
  };
  
  export const satFilterAction = (bool: boolean): SATFilterType => {
    return {
      type: SET_SAT_FILTER,
      payload: bool
    };
  };