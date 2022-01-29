let apiEndpoint: string;
let imageBucket: string;
let userSavedImagesCDN: string;

export const loopyBucket = 'https://loopy-files.s3-ap-southeast-2.amazonaws.com';
export const redirectUri = window.location.origin;

export const gnsEndpont = 'https://data.geonet.org.nz/camera/volcano/images';
export const FITS_ENDPOINT = 'https://fits.geonet.org.nz';
export const gnsRestEndpoint = 'https://api.geonet.org.nz';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    apiEndpoint = 'https://koztdf20e6.execute-api.ap-southeast-2.amazonaws.com/prod/v0/rest';
    imageBucket = 'https://d3tdg999z8uo5q.cloudfront.net';
    userSavedImagesCDN = 'https://d1xsjyv3hh3owx.cloudfront.net';
};

export { apiEndpoint, imageBucket, userSavedImagesCDN }