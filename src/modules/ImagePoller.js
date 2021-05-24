import apiCall from './APICall';

const imagePoller = token => {
    return Promise.all([
        new Promise((res, rej) => {res(apiCall('metadata', 'GET', token))}), 
        new Promise((res, rej) => {res(apiCall('volcano-list', 'GET', token))})
    ]).then(res => { return res }).catch(err => { throw err});
};

export default imagePoller;
