import { SET_QUAKES, QuakeType } from "../types/quakeHistoryType";
import { QuakeWithLocation } from "../../api/quakes/headers";

const initialState: QuakeWithLocation[] = []

export const quakeReducer = (
    state = initialState,
    action: QuakeType
): QuakeWithLocation[] => {
    switch (action.type) {
        case SET_QUAKES:
            return  action.payload;
        default:
            return state;
    }
};
