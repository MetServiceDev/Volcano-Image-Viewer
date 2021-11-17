export const SET_LINKS = 'SET_LINKS';

interface GetLinks {
    type: typeof SET_LINKS,
    payload: string[]
};

export type LinksType = GetLinks;
