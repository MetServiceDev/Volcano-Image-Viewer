export const handleGridDisplay = grid => ({
    type:'SET_GRID_DISPLAY',
    payload: grid
});

export const handleNZFilter = bool => ({
    type: 'SET_NZ_FILTER',
    payload: bool
});

export const handleVAFilter = bool => ({
    type: 'SET_VA_FILTER',
    payload: bool
});

export const handleCNIFilter = bool => ({
    type: 'SET_CNI_FILTER',
    payload: bool
});

export const handleWIFilter = bool => ({
    type: 'SET_WI_FILTER',
    payload: bool
});

export const handleSidebar = bool => ({
    type: 'EXPAND_SIDEBAR',
    payload: bool
})

export const handleTimestamps = array => ({
    type: 'SET_TIMESTAMPS',
    payload: array
})

export const handleCurrentDisplay = string => ({
    type: 'SET_CURRENT_DISPLAY',
    payload: string
})

export const handleLightningAlerts = object => ({
    type: 'SET_LIGHTNING_DATA',
    payload:object
})

export const handleLogin = bool => ({
    type: 'SET_LOGIN',
    payload: bool
})

export const handleToken = token => ({
    type: 'SET_TOKEN',
    payload: token
})