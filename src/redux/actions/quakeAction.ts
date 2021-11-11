import { SET_QUAKES, QuakeType } from "../types/quakeHistoryType";
import { QuakeWithLocation } from "../../api/quakes/headers";

export const quakeAction = (quakes:QuakeWithLocation[]): QuakeType => {
    return {
        type: SET_QUAKES,
        payload: quakes
    };
};
