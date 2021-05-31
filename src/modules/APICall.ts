import { apiEndpoint } from '../metadata/Endpoints';

enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
};

interface Config {
    method: string;
    body?:any;
    headers:any;
};

interface Response {
    code: number;
    body: any;
};

const setConfig = (method: string, token: string, body?: object) => {
    if(method === 'GET'){
        let config : Config = {
            method: Method['GET'],
            headers: { 'Authorization' : token }
        };
        return config
    }

    else if(method === 'POST'){
        let config : Config = {
            method: Method['POST'],
            body: JSON.stringify(body),
            headers: { 'Authorization' : token }
        };
        return config
    }
}

const apiCall = async (route: string, method: string, token: string, body?: object): Promise<Response> => {
    try{
        const call = await fetch(`${apiEndpoint}/${route}`, setConfig(method, token, body));
        const data = await call.json();
        return data as Response;
    }catch(err){
        throw err;
    }
    
};

export default apiCall;
