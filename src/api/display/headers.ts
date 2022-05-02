export enum CurrentDisplay {
    VOLCANO_MATRIX = 'VOLCANO_MATRIX',
    SULFUR_MAPS = 'SULFUR_MAPS',
    ALERT_MAP = 'ALERT_MAP',
};

enum NavOptions {
    ToggleFilters = 'Toggle Filters',
    ToggleGrid = 'Toggle Grid',
    ToggleTheme = 'Toggle Theme',
}

export interface NavOptionsState {
    showNavFilter: boolean;
    showNavGrid: boolean;
    showThemeToggle: boolean;
}

export interface NavOptionsAction {
    type: NavOptions;
    payload: boolean;
}


export const navOptionsReducer = (state: NavOptionsState, action: NavOptionsAction) => {
    switch (action.type) {
        case NavOptions.ToggleFilters:
            return { ...state, showNavFilter: action.payload };
        case NavOptions.ToggleGrid:
            return { ...state, showNavGrid: action.payload };
        case NavOptions.ToggleTheme:
            return { ...state, showThemeToggle: action.payload };
    }
};
