import apiCall from "../APICall";
import { EmissionData } from "./headers";

const fetchGasEmissions = async(token: string): Promise<EmissionData[]> => {
    const data = await apiCall<EmissionData[]>('volcanoes/emissions', 'GET', token);
    console.log(data)
    return data;
};

export default fetchGasEmissions;
