import { imagesAction } from '../actions/imagesAction';
import { Dispatch } from 'redux';
import { ImagesType } from '../types/imagesType';
import { VolcanoImages } from '../../api/images/headers';

export const setImages = (images:VolcanoImages[]) => {
    return async function (dispatch: Dispatch<ImagesType>) {
        dispatch(imagesAction(images));
    };
};
