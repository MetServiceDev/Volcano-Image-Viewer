import { CurrentDisplay } from '../../api/display/headers';
export const SET_CURRENT_DISPLAY = 'SET_CURRENT_DISPLAY';

interface GetDisplay {
    type: typeof SET_CURRENT_DISPLAY,
    payload: CurrentDisplay,
};

export type DisplayType = GetDisplay;
