import { LightningType, SET_LIGHTNING_DATA } from '../types/lightningType';

const initialState: any = {};

export const lightningReducer = (
    state = initialState,
    action: LightningType
): any => {
    switch (action.type) {
        case SET_LIGHTNING_DATA:
            return  action.payload;
        default:
            return state;
    }
};
