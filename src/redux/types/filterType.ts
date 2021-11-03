export const SET_NZ_FILTER = 'SET_NZ_FILTER';
export const SET_VA_FILTER = 'SET_VA_FILTER';
export const SET_CNI_FILTER = 'SET_CNI_FILTER';
export const SET_WI_FILTER = 'SET_WI_FILTER';
export const SET_SAT_FILTER = 'SET_SAT_FILTER';

interface NZFilter {
    type: typeof SET_NZ_FILTER,
    payload: boolean
};

interface VAFilter {
    type: typeof SET_VA_FILTER,
    payload: boolean
};

interface CNIFilter {
    type: typeof SET_CNI_FILTER,
    payload: boolean 
}

interface WIFilter {
    type: typeof SET_WI_FILTER,
    payload: boolean  
}

interface SATFilter {
    type: typeof SET_SAT_FILTER,
    payload: boolean 
}

export type NZFilterType = NZFilter;
export type VAFilterType = VAFilter;
export type CNIFilterType = CNIFilter;
export type WIFilterType = WIFilter;
export type SATFilterType = SATFilter;
