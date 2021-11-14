import { quakeAction } from '../actions/quakeAction';
import { Dispatch } from 'redux';
import { QuakeType } from '../types/quakeHistoryType';

export const setQuakes = (gnsIds:string[]) => {
    return async function (dispatch: Dispatch<QuakeType>) {
        dispatch(await quakeAction(gnsIds));
    };
};
