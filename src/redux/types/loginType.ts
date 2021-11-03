import { User } from '../../api/User/headers';
export const SET_LOGIN = 'SET_LOGIN';

interface GetLogin {
    type: typeof SET_LOGIN,
    payload: User
};

export type LoginType = GetLogin;
