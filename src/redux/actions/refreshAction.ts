import { REQUIRE_REFRESH, RefreshType } from '../types/refreshType';

export const refreshAction = (bool: boolean): RefreshType => {
    return {
      type: REQUIRE_REFRESH,
      payload: bool
    };
};
