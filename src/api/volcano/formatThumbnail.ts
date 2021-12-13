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

export const formatDate = (dateCode: string): Date | undefined => {
    try {
        const dateCodeSplit = dateCode.split('.');
        const year = Number(dateCodeSplit[0].split('/')[1]);
        const numericDay = Number(dateCodeSplit[1]);
        const hour = dateCodeSplit[2].slice(0, 2);
        const minute = dateCodeSplit[2].slice(2);
        const date = moment().clone().year(year).startOf('year')
            .add(numericDay-1, 'days').add(hour, 'hours').add(minute, 'minutes')
        return date.toDate();
    } catch (err) {
        return undefined;
    }; 
};

export default formatThumbnailData;
