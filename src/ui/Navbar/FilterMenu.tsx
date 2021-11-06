import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';

import Filter from './Filter';

interface Props {
    anchorEl: null | HTMLElement,
    open: boolean,
    handleClose: () => void,

    showVA: boolean,
    showNZ: boolean,
    showCNI: boolean,
    showWI: boolean,
    showSAT: boolean,

    toggleVA: any,
    toggleNZ: any,
    toggleCNI: any,
    toggleWI: any,
    toggleSAT: any
}

const FilterMenu: React.FC<Props> = ({
    anchorEl,
    open,
    handleClose,
    showVA,
    showNZ,
    showCNI,
    showWI,
    showSAT,
    toggleVA,
    toggleNZ,
    toggleCNI,
    toggleWI,
    toggleSAT, 
}) => {
    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem>
                <Filter check={showVA} toggle={() => toggleVA(!showVA)} text='Vanuatu' />
            </MenuItem>
            <MenuItem>
                <Filter check={showNZ} toggle={() => toggleNZ(!showNZ)} text='New Zealand' />
            </MenuItem>
            <MenuItem>
                <Filter check={showCNI} toggle={() => toggleCNI(!showCNI)} text='Central NI' />
            </MenuItem>
            <MenuItem>
                <Filter check={showWI} toggle={() => toggleWI(!showWI)} text='White Island' />
            </MenuItem>
            <MenuItem>
                <Filter check={showSAT} toggle={() => toggleSAT(!showSAT)} text='Satellite' />
            </MenuItem>
        </Menu>
    )
};

export default FilterMenu;
