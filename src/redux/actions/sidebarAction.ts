import { SET_SIDEBAR, SidebarType } from '../types/sidebarType';

export const sidebarAction = (toggle: boolean): SidebarType => {
    return {
      type: SET_SIDEBAR,
      payload: toggle
    };
};
