import { SET_LOGIN, LoginType } from '../types/loginType';
import { User } from '../../api/User/headers';

export const loginAction = (user: User): LoginType => {
    return {
      type: SET_LOGIN,
      payload: user
    };
};
