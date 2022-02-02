import { useState, useEffect } from 'react';

import apiCall from "../APICall";
import authClient from '../auth/Auth';

interface Poller {
    links: string[];
    polling: boolean;
}

const useFetchLinks = (): Poller => {
    const [links, setlinks] = useState<string[]>([]);
    const [polling, setPolling] = useState<boolean>(true);
    const [token, setToken] = useState('');

    const POLL_INTERVAL = 60000 * 10;

    const pollSession = () => {
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
    };

    useEffect(() => {
        pollSession()
        setInterval(() => pollSession(), POLL_INTERVAL);
    }, [POLL_INTERVAL]);

    useEffect(() => {
        async function fetchLinks() {
            setPolling(true);
            const links = await apiCall<string[]>('s3-links', 'GET', token);
            setlinks(links);
            setPolling(false);
        };
        if (token) {
            fetchLinks();
        }
    }, [token]);
    
    return { links, polling } as Poller;
};

export default useFetchLinks;