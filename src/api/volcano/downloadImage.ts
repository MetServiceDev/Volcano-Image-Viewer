import { Thumbnail } from './headers';

const downloadImage = async(link: string): Promise<Thumbnail> => {
    const call = await fetch(link);
    const size = Number(call.headers.get('Content-Length'));
    const blob = await call.blob();
    const src = URL.createObjectURL(blob);
    return { src, size } as Thumbnail;
};

export default downloadImage;
