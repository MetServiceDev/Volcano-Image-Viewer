import { apiEndpoint } from './metadata/Endpoints';

const apiCall = async (route, method, token, body) => {
    try{
        const call  = await fetch(`${apiEndpoint}/${route}`, { 
                method: method, 
                body: method === 'GET' ? null : JSON.stringify(body), 
                headers: { 'Authorization': token 
            }});
        const data = await call.json();
        return data;
    }catch(err){
        console.log(err)
        throw err;
    }
    
};

export default apiCall;
