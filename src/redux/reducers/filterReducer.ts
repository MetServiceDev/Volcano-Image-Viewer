import {
    SET_NZ_FILTER, SET_VA_FILTER, SET_CNI_FILTER, SET_WI_FILTER, SET_SAT_FILTER,
    NZFilterType, VAFilterType, CNIFilterType, WIFilterType, SATFilterType
  } from '../types/filterType';

type FilterType = NZFilterType | VAFilterType | CNIFilterType | WIFilterType | SATFilterType

const initialState: Record<string, boolean> = {
    showNZ: true,
    showVA: true,
    showCNI: true,
    showWI: true,
    showSAT: true,
}

export const filterReducer = (
    state = initialState,
    action: FilterType
): Record<string, boolean> => {
    switch (action.type) {
        case SET_NZ_FILTER:
            return  {
                ...state,
                showNZ: action.payload
            }
        case SET_VA_FILTER:
            return {
                ...state,
                showNZ: action.payload
            }
        case SET_CNI_FILTER:
            return {
                ...state,
                showCNI: action.payload
            }
        case SET_WI_FILTER:
            return {
                ...state,
                showWI: action.payload
            }
        case SET_SAT_FILTER:
            return {
                ...state,
                showSAT: action.payload 
            }
        default:
            return state;
    }
};
