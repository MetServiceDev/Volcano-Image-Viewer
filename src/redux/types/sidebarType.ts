export const SET_SIDEBAR = 'SET_SIDEBAR';

interface GetSidebar {
    type: typeof SET_SIDEBAR,
    payload: boolean
};

export type SidebarType = GetSidebar;