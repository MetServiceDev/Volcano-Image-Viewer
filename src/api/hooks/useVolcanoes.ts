import { useEffect, useState } from 'react';
import { Volcano } from '@metservice/aviationtypes';

import apiCall, { HTTPMethod } from '../APICall';

const useVolcanoes = (token: string | undefined) => {
    const [volcanoes, setVolcanoes] = useState<Volcano[]>([]);

    useEffect(() => {
        const fetchVolcanoes = async(token: string): Promise<void> => {
            const data = await apiCall<Volcano[]>('volcanoes', HTTPMethod.GET, token);
            setVolcanoes(data);
        }
        if (token) {
            fetchVolcanoes(token);
        }
    }, [token]);

    return volcanoes;
};

export default useVolcanoes;

