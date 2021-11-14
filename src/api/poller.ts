import apiCall from './APICall';
import { User } from './User/headers';
import { Volcano } from './volcano/headers';

const poll = async ( user: User ): Promise<Volcano[]> => {
    const response = await apiCall('volcanoes', 'GET', user);
    return response as any;
};

export { poll };
