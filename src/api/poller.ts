import apiCall from './APICall';
import { Volcano } from './volcano/headers';

const poll = async ( token: string ): Promise<Volcano[]> => {
    const response = await apiCall<Volcano[]>('volcanoes', 'GET', token);
    return response;
};

export { poll };
