import { apiEndpoint } from './Endpoints';

const apiKey = 'lKbptndQxl2AO4liuRVvi53IQZFLNMQI4tv3RrFq'

const apiCall = async (route) => {
    const call  = await fetch(`${apiEndpoint}/${route}`, { headers: { 'x-api-key': apiKey }});
    const data = await call.json();
    return data;
};

export default apiCall;
