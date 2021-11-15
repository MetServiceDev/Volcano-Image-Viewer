import { Thumbnail, Volcano, VolcanoLocation } from '../volcano/headers';
import { VolcanoImages } from './headers';
import downloadImage from '../../api/volcano/downloadImage';
import apiCall from '../../api/APICall';
import { imageBucket } from '../../metadata/Endpoints';
import { User } from '../User/headers';

async function downloadImages(thumbnails: Thumbnail[]): Promise<any> {
    try {
        const images = await Promise.all(thumbnails.map(i => downloadImage(i.src)));
        return images;
    } catch (err) {
        
    };
};

const fetchGNSImages = async(volcano: Volcano, user:User): Promise<Thumbnail[]> => {
    try {
        const images = await apiCall(`gns-links?volcano=${volcano.code}`, 'GET', user) as any;
        return images as Thumbnail[];
    } catch (err) {
        throw err;
    }
}


const fetchImages = async (volcano: Volcano, user:User): Promise<Thumbnail[]> => {
  const domesticVolcano = volcano.location !== VolcanoLocation.VANUATU && volcano.code !== 'ERB';
    if (domesticVolcano) {
        const images = await fetchGNSImages(volcano, user);
        return images
    } else {
        const indexList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        const links = indexList.map(i => {
            return {
                src: `${imageBucket}/${volcano.s3Link}/${volcano.s3Link}-${i}.jpg`
            }
        });
        const images = await downloadImages(links);
        return images
    };
};

const fetchAllImages = async (volcanoes: Volcano[], user:User): Promise<VolcanoImages[]> => {
    const allImages = await Promise.all(volcanoes.map(async(volcano) => {
        const images = await fetchImages(volcano, user);
        return {
          volcanoCode: volcano.code,
          images
        } as VolcanoImages;
    }));
    return allImages;
};

export { fetchAllImages, fetchImages }
