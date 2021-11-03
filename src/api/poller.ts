import apiCall from './APICall';
import { User } from './User/headers';
import { Volcano } from './volcano/headers';

const poll = async ( user: User ): Promise<Volcano[]> => {
    const response = await apiCall('volcano-list', 'GET', user);
    return response.body as Volcano[];
};

export { poll };
