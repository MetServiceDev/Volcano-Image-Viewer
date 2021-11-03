import { Dispatch } from 'redux';
import { loginAction } from '../actions/loginAction';
import { LoginType } from '../types/loginType';
import { User } from '../../api/User/headers';

export const setLogin = (user:User) => {
    return async function (dispatch: Dispatch<LoginType>) {
        dispatch(loginAction(user));
    };
};
