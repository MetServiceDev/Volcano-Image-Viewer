import { SET_GRID_DISPLAY, GridDisplayType } from '../types/gridDisplayType';

const initialState: number = 4;

export const gridDisplayReducer = (
    state = initialState,
    action: GridDisplayType
): number => {
    switch (action.type) {
        case SET_GRID_DISPLAY:
            return  action.payload;
        default:
            return state;
    }
};
