import moment from 'moment';
import { Thumbnail } from './headers';

const downloadImage = async(link: string, idx: number): Promise<Thumbnail> => {
    const call = await fetch(link);
    const size = Number(call.headers.get('Content-Length'));
    const timestamp = call.headers.get('x-amz-meta-timestamp');
    let hasntUpdated = JSON.parse(call.headers.get('x-amz-meta-hasntupdated') as string);
    const uploadedAt =  call.headers.get('x-amz-meta-uploadedat');
    if (idx === 11) {
        if (uploadedAt) {
            const uploadTime = moment(uploadedAt).toDate();
            if(moment().diff(uploadTime, 'minutes') >= 36) {
                hasntUpdated = true;
            }
        }
    }
    const blob = await call.blob();
    const src = URL.createObjectURL(blob);
    return { src, size, timestamp, uploadedAt, hasntUpdated } as Thumbnail;
};

export default downloadImage;
