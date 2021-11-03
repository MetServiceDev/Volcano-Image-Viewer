import { CurrentDisplay } from '../../api/display/headers';
import { SET_CURRENT_DISPLAY, DisplayType } from '../types/currentDisplayType';

const initialState: CurrentDisplay = CurrentDisplay.VOLCANO_MATRIX;

export const displayReducer = (
    state = initialState,
    action: DisplayType
): CurrentDisplay => {
    switch (action.type) {
        case SET_CURRENT_DISPLAY:
            return  action.payload;
        default:
            return state;
    }
};
