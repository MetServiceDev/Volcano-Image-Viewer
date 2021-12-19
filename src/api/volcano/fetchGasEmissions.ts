import React from 'react';
import apiCall from "../APICall";
import { EmissionData } from "./headers";
import authClient from '../auth/Auth';

const fetchGasEmissions = async(token: string): Promise<EmissionData[]> => {
    const data = await apiCall<EmissionData[]>('volcanoes/emissions', 'GET', token);
    return data;
};

export const useEmissionsEffect = (fitID: string) => {
    const token = authClient.getAccessToken() as string;
    const [data, setData] = React.useState<EmissionData>();

    React.useEffect(() => {
        fetchGasEmissions(token)
            .then(res => {
                const emissionData = res.find(i => i.volcano === fitID);
                setData(emissionData)
            });
    }, [token, fitID]);

    return [data];
};

export default fetchGasEmissions;
