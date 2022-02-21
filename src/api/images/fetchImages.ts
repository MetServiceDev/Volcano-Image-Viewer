import { Thumbnail } from '../volcano/headers';
import downloadImage from '../../api/volcano/downloadImage';
import { imageBucket } from '../../metadata/Endpoints';

async function downloadImages(imageTags: string[]): Promise<Thumbnail[]> {
    try {
        const images = await Promise.all(imageTags.map((i, idx) => downloadImage(i, idx)));
        return images;
    } catch (err) {
        throw err;
    };
};

const fetchImages = async (s3Tags:string[]): Promise<Thumbnail[]> => {
    const links = s3Tags?.map(tag => `${imageBucket}/${tag}`);
    const images = await downloadImages(links);
    return images;
};

// const fetchAllImages = async (volcanoes: Volcano[], s3Tags:string[]): Promise<VolcanoImages[]> => {
//     const allImages = await Promise.all(volcanoes.map(async(volcano) => {
//         const images = await fetchImages(s3Tags);
//         return {
//           volcanoCode: volcano.code,
//           images
//         } as VolcanoImages;
//     }));
//     return allImages;
// };

export { fetchImages };
