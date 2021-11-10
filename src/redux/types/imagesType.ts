import { VolcanoImages } from '../../api/images/headers';

export const SET_IMAGES = 'SET_IMAGES';

interface GetImages {
    type: typeof SET_IMAGES,
    payload: VolcanoImages[],
};

export type ImagesType = GetImages;