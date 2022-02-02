import { useState, useEffect } from 'react';
import { LightningStrikes } from '../../api/lightning/headers';
import fetchLightning from '../../api/lightning/FetchLightning';
import authClient from '../auth/Auth';

const useLightningFetch = () => {
    const [lightningAlerts, setAlerts] = useState<LightningStrikes | null>();
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
        async function fetchData() {
            try {
                setAlerts(null)
                const data = await fetchLightning(token);
                setAlerts(data);
            } catch (err) {
                setAlerts(null);
            }   
        }
        if (token) {
            fetchData();
        }
    }, [token]);

    return { lightningAlerts, setAlerts };
};

export default useLightningFetch;