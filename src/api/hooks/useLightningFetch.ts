import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { LightningResponse } from '@metservice/aviationtypes';

import { lightningQuery } from '../../graphQL/queries';
import authClient from '../auth/Auth';

const useLightningFetch = () => {
    const [lightningAlerts, setAlerts] = useState<LightningResponse[]>([]);
    const [token, setToken] = useState('');
    const lightningDataQuery = useQuery(lightningQuery);
    useEffect(() => {
        setAlerts(lightningDataQuery?.data?.fetchLightning);
    }, [lightningDataQuery]);

    // const testQ = useQuery(lightningQuery);
    // console.log(testQ.data.fetchLightning);

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

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             setAlerts(null)
    //             const lightningStrikes = await API.get('volcanoamplifyapi', '/lightning', {});
    //             setAlerts(lightningStrikes);
    //             throw new Error('Testing new graphql');
    //         } catch (err) {
    //             setAlerts(null);
    //         }   
    //     }
    //     if (token) {
    //         fetchData();
    //     }
    // }, [token]);

    return { lightningAlerts, setAlerts };
};

export default useLightningFetch;
