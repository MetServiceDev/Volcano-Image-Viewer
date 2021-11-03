import { Dispatch } from 'redux';
import { sidebarAction } from '../actions/sidebarAction';
import { SidebarType } from '../types/sidebarType';

export const toggleSidebar = (bool:boolean) => {
    return async function (dispatch: Dispatch<SidebarType>) {
        dispatch(sidebarAction(bool));
    };
};
