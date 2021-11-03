   import { gridDisplayAction } from '../actions/gridDisplayAction';
import { Dispatch } from 'redux';
import { GridDisplayType } from '../types/gridDisplayType';

export const setGrid = (grid:number) => {
    return async function (dispatch: Dispatch<GridDisplayType>) {
        dispatch(gridDisplayAction(grid));
    };
};
