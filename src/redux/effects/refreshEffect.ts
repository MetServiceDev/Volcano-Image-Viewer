import { Dispatch } from 'redux';
import { refreshAction } from '../actions/refreshAction';
import { RefreshType } from '../types/refreshType';

export const setRefresh = (bool:boolean) => {
    return async function (dispatch: Dispatch<RefreshType>) {
        dispatch(refreshAction(bool));
    };
};
