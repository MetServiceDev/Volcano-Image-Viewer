export const SET_GRID_DISPLAY = 'SET_GRID_DISPLAY';

interface GetGridDisplay {
    type: typeof SET_GRID_DISPLAY,
    payload: number
};

export type GridDisplayType = GetGridDisplay;
