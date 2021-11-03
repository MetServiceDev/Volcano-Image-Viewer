import { SET_SIDEBAR, SidebarType } from '../types/sidebarType';

const initialState: boolean = true

export const sidebarReducer = (
    state = initialState,
    action: SidebarType
): boolean => {
    switch (action.type) {
        case SET_SIDEBAR:
            return  action.payload;
        default:
            return state;
    }
};
