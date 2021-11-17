
const formatS3Tags = (array: string[], code: string): string[] => {
    var s3Tags = array.map(tag => {
        if(tag.split('/')[0] === code) {
            return tag;
        } else {
            return null
        }
    }).filter(Boolean) as string[];

    const offset = s3Tags.length - 12;
    if(offset > 0) {
        s3Tags.splice(0, offset);
    };
    return s3Tags;
};

export default formatS3Tags;
