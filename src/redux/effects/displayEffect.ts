import { Dispatch } from 'redux';
import { displayAction } from '../actions/displayAction';
import { CurrentDisplay } from '../../api/display/headers';
import { DisplayType } from '../types/currentDisplayType';

export const setDisplay = (display:CurrentDisplay) => {
    return async function (dispatch: Dispatch<DisplayType>) {
        dispatch(displayAction(display));
    };
};
