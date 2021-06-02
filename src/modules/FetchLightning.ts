import apiCall from './APICall';

interface LightningData {
    severity: string;
    msg: string
}

interface Response {
    alertCheck: number;
    innerCheck: number;
    alertNames: string[];
    innerNames: string[];
    areas: string[];
    twentyKStrikes: number;
    hundredKStrikes: number;
};

const fetchLightning = async(token: string): Promise<LightningData> => {
    try{
        const data = await apiCall('lightning-data', 'GET', token);
        const response: Response = JSON.parse(data.body);
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
            lightningData.msg = `${areas}: Possible eruption at ${alertNames.map((name: string) => {return `${name}`})} --- ${twentyKStrikes} lightning strikes also reported within 20km of ${innerNames.map((name: string) => {return `${name}`})}`;
        } else if(alertCheck > 0 && innerCheck === 0){
            lightningData.severity = 'warning';
            lightningData.msg = `${areas}: Lightning data indicates possible eruption happening at ${alertNames.map((name: string) => {return `${name}`})}  --- Please check latest imagery!`;
        } else if(alertCheck === 0 && innerCheck > 0){
            lightningData.severity = 'warning'; 
            lightningData.msg = `${areas}: Lightning data shows ${twentyKStrikes} strikes within 20km and ${hundredKStrikes} strikes within 100km of ${innerNames.map((name: string) => {return `${name}`})}  Please check latest imagery.`;
        };
        return lightningData;
    } catch(err) {
        throw new Error(`${err} Error: Failed to fetch lightning data`);
    }
};

export { fetchLightning };
