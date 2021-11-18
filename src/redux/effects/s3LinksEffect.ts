import { Dispatch } from 'redux';
import { s3LinksAction } from '../actions/s3LinksAction';
import { LinksType } from "../types/s3LinkType";

export const setS3ImageTags = (token:string) => {
    return async function (dispatch: Dispatch<LinksType>) {
        dispatch(await s3LinksAction(token));
    };
};
