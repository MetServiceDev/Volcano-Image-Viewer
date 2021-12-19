import React from 'react';
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

const setConfig = <T>(method: string, token: string, body?: T) => {
    if (method === 'GET'){
        let config : Config = {
            method: Method.GET,
            headers: { 'Authorization' : token }
        };
        return config;
    }

    else if (method === 'POST'){
        let config : Config = {
            method: Method.POST,
            body: JSON.stringify(body),
            headers: { 'Authorization' : token }
        };
        return config;
    }

    else if (method === 'DELETE'){
        let config : Config = {
            method: Method.DELETE,
            body: JSON.stringify(body),
            headers: { 'Authorization' : token }
        };
        return config;
    };
};

const apiCall = async <T, P = {}>(route: string, method: string, token: string, body?: P): Promise<T> => {
    if (!token) {
        throw new Error('401: Token required')
    }
    try{
        const call = await fetch(`${apiEndpoint}/${route}`, setConfig(method, token, body));
        const response = await call.json();
        return response as T;
    }catch(err){
        throw err;
    } 
};

export const useApi = <T, P = {}>(route: string, method: string, token: string, body?: P) => {
    const [data, setData] = React.useState<T>();
  
    React.useEffect(() => {
        apiCall<T>(route, method, token, body)
            .then((res) => setData(res))
    }, [route, method, token, body]);
  
    return [data];
  };

export default apiCall;
