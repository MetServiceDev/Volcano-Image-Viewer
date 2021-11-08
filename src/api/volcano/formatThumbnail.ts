import moment from 'moment';
import { gnsEndpont } from '../../metadata/Endpoints';

const formatThumbnailData = (code:string, currentTime: any, isDomestic: boolean, s3Link?: string) => {
    if (isDomestic) {
        const year = moment().format('YYYY'); 
        const dayOfYear = currentTime.dayOfYear();
        const startMinute = currentTime.format('mm').split('')[0];
        const timeSigniture = currentTime.format(`HH${startMinute}0`);
        const timestamp = `${moment(currentTime.toDate().toString()).format(`HH:${startMinute}0`)}`;
        const imgTag =  `${year}.${dayOfYear}.${timeSigniture}.00.${code}.jpg`;
        const src = `${gnsEndpont}/${year}/${code.split('.')[0]}/${code}/${year}.${dayOfYear}/${imgTag}`
        return { src, timestamp };
    };
    return { 
        src: `${s3Link}-${currentTime}.jpg`
     }
};

export default formatThumbnailData;
