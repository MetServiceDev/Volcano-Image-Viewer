import apiCall from '../APICall';
import { User } from '../User/headers';
import { APIResponse, LightningData } from './headers';

interface Response {
    code: number;
    body: any;
};

const fetchLightning = async(user: User): Promise<LightningData> => {
    try{
        const data = await apiCall<Response>('lightning', 'GET', user);
        const response: APIResponse = JSON.parse(data.body);
        const { alertCheck, innerCheck, alertNames, innerNames, areas, twentyKStrikes, hundredKStrikes } = response;
        let lightningData: LightningData = {
            severity: '',
            msg: ''
        }
        if(alertCheck === 0 && innerCheck === 0){
            lightningData.severity = 'success';
            lightningData.msg = 'No current lightning alerts for possible eruptions';
        } else if(alertCheck > 0 && innerCheck > 0){
            lightningData.severity = 'error';
            lightningData.msg = `${areas}: Possible eruption at ${alertNames.map((name: string) => `${name}`)} --- ${twentyKStrikes} lightning strikes also reported within 20km of ${innerNames.map((name: string) => `${name}`)}`;
        } else if(alertCheck > 0 && innerCheck === 0){
            lightningData.severity = 'warning';
            lightningData.msg = `${areas}: Lightning data indicates possible eruption happening at ${alertNames.map((name: string) => `${name}`)}  --- Please check latest imagery!`;
        } else if(alertCheck === 0 && innerCheck > 0){
            lightningData.severity = 'warning'; 
            lightningData.msg = `${areas}: Lightning data shows ${twentyKStrikes} strikes within 20km and ${hundredKStrikes} strikes within 100km of ${innerNames.map((name: string) => `${name}`)}  Please check latest imagery.`;
        };
        return lightningData;
    } catch(err) {
        throw new Error(`${err} Error: Failed to fetch lightning data`);
    }
};

export default fetchLightning;
