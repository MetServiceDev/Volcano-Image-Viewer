import React from 'react';
import apiCall, { HTTPMethod } from "../APICall";
import { EmissionData } from "./headers";
import useAPICall from '../hooks/useAPICall';

const fetchGasEmissions = async(token: string): Promise<EmissionData[]> => {
    const data = await apiCall<EmissionData[]>('volcanoes/emissions', HTTPMethod.GET, token);
    return data;
};

export const useEmissionsEffect = (fitID: string, token: string | undefined) => {
    const allEmissions = useAPICall<EmissionData[]>({
        route: 'volcanoes/emissions',
        method: HTTPMethod.GET,
        token
    });

    const emissionData = React.useMemo(() => {
        return allEmissions?.find(i => i.volcano === fitID);
    }, [allEmissions, fitID]);

    return emissionData as EmissionData;
};

export default fetchGasEmissions;
