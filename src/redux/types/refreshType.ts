export const REQUIRE_REFRESH = 'REQUIRE_REFRESH';

interface GetRefresh {
    type: typeof REQUIRE_REFRESH,
    payload: boolean
};

export type RefreshType = GetRefresh;
