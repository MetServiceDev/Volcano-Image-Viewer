import { apiEndpoint } from '../metadata/Endpoints';

const apiCall = async (route, method, token, body) => {
    try{
        const call = await fetch(`${apiEndpoint}/${route}`, { 
                method: method, 
                body: method === 'POST' ? JSON.stringify(body) : null, 
                headers: { 'Authorization': token }
            });
        const data = await call.json();
        return data;
    }catch(err){
        throw err;
    }
    
};

export default apiCall;
