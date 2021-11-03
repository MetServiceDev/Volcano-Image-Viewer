export const SET_LIGHTNING_DATA = 'SET_LIGHTNING_DATA';

interface GetLightning {
    type: typeof SET_LIGHTNING_DATA,
    payload: any
};

export type LightningType = GetLightning;
