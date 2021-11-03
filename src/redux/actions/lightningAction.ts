import { LightningType, SET_LIGHTNING_DATA } from '../types/lightningType';

export const lightningAction = (data: any): LightningType => {
    return {
        type: SET_LIGHTNING_DATA,
        payload: data
    };
};
