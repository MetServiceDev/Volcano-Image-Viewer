import { apiEndpoint } from '../metadata/Endpoints';
import { User } from './User/headers';

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

const setConfig = <T>(method: string, token: string, body?: T) => {
    if(method === 'GET'){
        let config : Config = {
            method: Method['GET'],
            headers: { 'Authorization' : token }
        };
        return config;
    }

    else if(method === 'POST'){
        let config : Config = {
            method: Method['POST'],
            body: JSON.stringify(body),
            headers: { 'Authorization' : token }
        };
        return config;
    };
};

const apiCall = async <T, P = {}>(route: string, method: string, user: User, body?: P): Promise<T> => {
    if (!user) {
        throw new Error('401: User not valid')
    }
    try{
        const call = await fetch(`${apiEndpoint}/${route}`, setConfig(method, user.token, body));
        const response = await call.json();
        return response as T;
    }catch(err){
        throw err;
    }
    
};

export default apiCall;
