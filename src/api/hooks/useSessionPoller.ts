import { useState, useEffect } from "react";
import authClient from '../auth/Auth';

const useSessionPoller = () => {
    const [token, setToken] = useState<string>('');

    useEffect(() => {
        setToken('');
        authClient.session.exists().then(session => {
            if (session) {
                authClient.session.refresh()
                    .then(() => {
                        const token = authClient.getAccessToken() as string;
                        setToken(token);
                    });
            }
        }); 
    }, []);

    return token;
};

export default useSessionPoller;
