import { quakeAction } from '../actions/quakeAction';
import { Dispatch } from 'redux';
import { QuakeType } from '../types/quakeHistoryType';
import { QuakeWithLocation } from '../../api/quakes/headers';

export const setQuakes = (quakes:QuakeWithLocation[]) => {
    return async function (dispatch: Dispatch<QuakeType>) {
        dispatch(quakeAction(quakes));
    };
};
