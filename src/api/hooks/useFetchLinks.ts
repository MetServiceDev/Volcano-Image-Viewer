import { useState, useEffect } from 'react';

import apiCall from "../APICall";
import authClient from '../auth/Auth';

interface Poller {
    links: string[];
    polling: boolean;
    counter: number;
    fetchLinks: () => void;
}

const useFetchLinks = (): Poller => {
    const [links, setlinks] = useState<string[]>([]);
    const [polling, setPolling] = useState<boolean>(true);
    const [token, setToken] = useState<string>('');

    const [counter, setCounter] = useState<number>(10);

    useEffect(() => {
        setInterval(() => {
            setCounter((state) => {
                if (state === 1) {
                    return 10;
                } else {
                    return state -1;
                };
            });
        }, 60000);
    }, []);

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

    async function fetchLinks() {
        setPolling(true);
        const links = await apiCall<string[]>('s3-links', 'GET', token);
        setlinks(links);
        setPolling(false);
    };

    useEffect(() => {
        pollSession()
        setInterval(() => pollSession(), POLL_INTERVAL);
    }, [POLL_INTERVAL]);

    useEffect(() => {
        if (token) {
            fetchLinks();
        }
    }, [token]);
    
    return { links, polling, counter, fetchLinks } as Poller;
};

export default useFetchLinks;
