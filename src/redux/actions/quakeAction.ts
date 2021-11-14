import { SET_QUAKES, QuakeType } from "../types/quakeHistoryType";
import fetchQuakeHistory from "../../api/quakes/fetchQuakeHistory";

export const quakeAction = async(gnsIDs:string[]): Promise<QuakeType> => {
    const allQuakes = await fetchQuakeHistory(gnsIDs);
    return {
        type: SET_QUAKES,
        payload: allQuakes
    };
};
