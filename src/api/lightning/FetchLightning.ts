import apiCall from '../APICall';
import { APIResponse, LightningData } from './headers';

interface Response {
    code: number;
    body: any;
};

const fetchLightning = async(token: string): Promise<any> => {
    try{
        const lightningResponse = await apiCall<any>('lightning', 'GET', token);
        return lightningResponse;
        
    } catch(err) {
        throw new Error(`${err} Error: Failed to fetch lightning data`);
    }
};

export default fetchLightning;
