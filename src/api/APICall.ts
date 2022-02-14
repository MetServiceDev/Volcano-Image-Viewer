import { apiEndpoint } from '../metadata/Endpoints';

export enum HTTPMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
};

interface Config {
    method: HTTPMethod;
    body?:any;
    headers:any;
};

const apiCall = async <T=void, P={}>(route: string, method: HTTPMethod, token: string, body?: P): Promise<T> => {
    if (!token) {
        throw new Error('401: Token required')
    }

    const config: Config = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization':  token
        }
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${apiEndpoint}/${route}`, config);
        const json = await response.json();
        return json as T;
    } catch (error: any) {
        throw error;
    }
};

export default apiCall;
