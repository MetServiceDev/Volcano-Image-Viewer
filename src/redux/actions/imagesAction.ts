import { SET_IMAGES, ImagesType } from '../types/imagesType';
import { VolcanoImages } from '../../api/images/headers';

export const imagesAction = (images: VolcanoImages[]): ImagesType => {
    return {
        type: SET_IMAGES,
        payload: images
    };
};
