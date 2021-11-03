import { SET_GRID_DISPLAY, GridDisplayType } from '../types/gridDisplayType';

export const gridDisplayAction = (grid: number): GridDisplayType => {
    return {
      type: SET_GRID_DISPLAY,
      payload: grid
    };
};
