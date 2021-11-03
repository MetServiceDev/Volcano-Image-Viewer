import { Dispatch } from 'redux';
import { lightningAction } from '../actions/lightningAction';
import { LightningType } from '../types/lightningType';

export const setLightningAlerts = (data: any) => {
    return async function (dispatch: Dispatch<LightningType>) {
        dispatch(lightningAction(data));
    };
};
