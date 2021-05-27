import { apiEndpoint } from '../metadata/Endpoints';

interface Response {
    code: number
    body: any
};

const apiCall = async (route: string, method: string, token: string, body?: object): Promise<any> => {
    try{
        const call = await fetch(`${apiEndpoint}/${route}`, { 
                method: method, 
                body: JSON.stringify(body),
                headers: { 'Authorization': token }
            });
        const data = await call.json();
        return data as Response;
    }catch(err){
        throw err;
    }
    
};

export default apiCall;
