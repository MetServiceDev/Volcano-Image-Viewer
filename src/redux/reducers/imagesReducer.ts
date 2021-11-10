import { SET_IMAGES, ImagesType } from '../types/imagesType';
import { VolcanoImages } from '../../api/images/headers';

const initialState: VolcanoImages[] = [];

export const imagesReducer = (
    state = initialState,
    action: ImagesType
): VolcanoImages[] => {
    switch (action.type) {
        case SET_IMAGES:
            return  action.payload;
        default:
            return state;
    }
};
