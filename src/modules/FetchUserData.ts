import apiCall from './APICall';

const fetchUserData = async(id: string, token: string): Promise<any> => {
    const userData = await apiCall(`user-data?id=${id}`, 'GET', token);
    return userData;
};

export default fetchUserData;
