import { Dispatch } from 'redux';
import { User } from '../../api/User/headers';
import { s3LinksAction } from '../actions/s3LinksAction';
import { LinksType } from "../types/s3LinkType";

export const setS3ImageTags = (user:User) => {
    return async function (dispatch: Dispatch<LinksType>) {
        dispatch(await s3LinksAction(user));
    };
};
