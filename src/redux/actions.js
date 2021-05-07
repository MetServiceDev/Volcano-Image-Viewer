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