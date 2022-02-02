import apiCall from '../APICall';
import { LightningStrikes } from './headers';


const fetchLightning = async(token: string): Promise<LightningStrikes> => {
    try{
        const lightningResponse = await apiCall<LightningStrikes>('lightning', 'GET', token);
        return lightningResponse;
        
    } catch(err) {
        throw new Error(`${err} Error: Failed to fetch lightning data`);
    }
};

export default fetchLightning;
