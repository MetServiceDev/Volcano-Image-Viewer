import { SET_LOGIN, LoginType } from '../types/loginType';
import { User } from '../../api/User/headers';

const initialState: User | null = null;

export const loginReducer = (
    state = initialState,
    action: LoginType
): User | null => {
    switch (action.type) {
        case SET_LOGIN:
            return  action.payload;
        default:
            return state;
    }
};
