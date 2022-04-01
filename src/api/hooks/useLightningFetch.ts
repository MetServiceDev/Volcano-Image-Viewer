import { useState, useEffect } from 'react';
import { API } from 'aws-amplify'

import { GeoJSON } from '../../api/lightning/headers';
import authClient from '../auth/Auth';

const useLightningFetch = () => {
    const [lightningAlerts, setAlerts] = useState<GeoJSON | null>();
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
                const lightningStrikes: GeoJSON = await API.get('volcanoamplifyapi', '/lightning', {});
                setAlerts(lightningStrikes);
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
