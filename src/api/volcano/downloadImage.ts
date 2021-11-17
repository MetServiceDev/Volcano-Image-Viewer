import { Thumbnail } from './headers';

const downloadImage = async(link: string): Promise<Thumbnail> => {
    const call = await fetch(link);
    const size = Number(call.headers.get('Content-Length'));
    const timestamp = call.headers.get('x-amz-meta-timestamp');
    const hasntUpdated = call.headers.get('x-amz-meta-hasntupdated');
    const blob = await call.blob();
    const src = URL.createObjectURL(blob);
    return { src, size, timestamp, hasntUpdated:JSON.parse(hasntUpdated as string)} as Thumbnail;
};

export default downloadImage;
