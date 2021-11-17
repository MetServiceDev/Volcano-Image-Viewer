import apiCall from './APICall';
import { User } from './User/headers';
import { Volcano } from './volcano/headers';

const poll = async ( user: User ): Promise<Volcano[]> => {
    const response = await apiCall<Volcano[]>('volcanoes', 'GET', user);
    return response;
};

export { poll };
