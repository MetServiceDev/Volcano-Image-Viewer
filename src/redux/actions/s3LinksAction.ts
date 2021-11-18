import { SET_LINKS, LinksType } from "../types/s3LinkType";
import apiCall from "../../api/APICall";

export const s3LinksAction = async(token: string): Promise<LinksType> => {
    const images = await apiCall('s3-links', 'GET', token) as string[];
    return {
        type: SET_LINKS,
        payload: images
    };
};
