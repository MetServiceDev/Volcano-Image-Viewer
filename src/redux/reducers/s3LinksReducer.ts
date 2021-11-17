import { SET_LINKS, LinksType } from "../types/s3LinkType";

const initialState: string[] = []

export const LinksReducer = (
    state = initialState,
    action: LinksType
):string[]  => {
    switch (action.type) {
        case SET_LINKS:
            return  action.payload;
        default:
            return state;
    }
};
