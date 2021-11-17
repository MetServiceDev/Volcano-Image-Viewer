import { SET_LINKS, LinksType } from "../types/s3LinkType";
import { User } from "../../api/User/headers";
import apiCall from "../../api/APICall";

export const s3LinksAction = async(user: User): Promise<LinksType> => {
    const images = await apiCall('s3-links', 'GET', user) as string[];
    return {
        type: SET_LINKS,
        payload: images
    };
};
