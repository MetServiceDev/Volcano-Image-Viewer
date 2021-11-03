import { CurrentDisplay } from '../../api/display/headers';
import { SET_CURRENT_DISPLAY, DisplayType } from '../types/currentDisplayType';

export const displayAction = (display: CurrentDisplay): DisplayType => {
    return {
        type: SET_CURRENT_DISPLAY,
        payload: display
      };
}
