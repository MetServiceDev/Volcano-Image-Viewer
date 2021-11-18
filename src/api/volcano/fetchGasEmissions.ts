import apiCall from "../APICall";
import { EmissionData } from "./headers";

const fetchGasEmissions = async(token: string): Promise<EmissionData[]> => {
    const data = await apiCall<EmissionData[]>('emissions', 'GET', token);
    return data;
};

export default fetchGasEmissions;
