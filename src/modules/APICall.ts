import { apiEndpoint } from '../metadata/Endpoints';

const apiCall = async (route: string, method: string, token: string, body?: object) => {
    try{
        const call = await fetch(`${apiEndpoint}/${route}`, { 
                method: method, 
                body: JSON.stringify(body),
                headers: { 'Authorization': token }
            });
        const data = await call.json();
        return data;
    }catch(err){
        throw err;
    }
    
};

export default apiCall;
