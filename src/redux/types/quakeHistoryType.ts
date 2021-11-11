import { QuakeWithLocation } from "../../api/quakes/headers";
export const SET_QUAKES = 'SET_QUAKES';

interface GetQuake {
    type: typeof SET_QUAKES,
    payload: QuakeWithLocation[]
};

export type QuakeType = GetQuake;
