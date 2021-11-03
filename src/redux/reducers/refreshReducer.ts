import { REQUIRE_REFRESH, RefreshType } from '../types/refreshType';

const initialState: boolean = false

export const refreshReducer = (
    state = initialState,
    action: RefreshType
): boolean => {
    switch (action.type) {
        case REQUIRE_REFRESH:
            return  action.payload;
        default:
            return state;
    }
};
