import { useState, useEffect } from 'react';
import apiCall, { HTTPMethod } from '../APICall';

interface Payload<P> {
    route: string;
    method: HTTPMethod;
    token: string | undefined;
    body?: P;
}

const useAPICall = <T=void, P={}>({ route, method, token, body }: Payload<P>): T => {
    const [data, setData] = useState<T>();

    useEffect(() => {
        const fetchData = async(): Promise<void> => {
            const data = await apiCall<T, P>(route, method, token as string, body);
            setData(data);
        }
        if (token) {
            fetchData();
        }
    }, [route, method, token, body]);

    return data as T;
};

export default useAPICall;
