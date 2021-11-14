import apiCall from "../APICall";
import { User } from "../User/headers";
import { EmissionData } from "./headers";

const fetchGasEmissions = async(user: User): Promise<EmissionData[]> => {
    const data = await apiCall<EmissionData[]>('emissions', 'GET', user);
    return data;
};

export default fetchGasEmissions;
