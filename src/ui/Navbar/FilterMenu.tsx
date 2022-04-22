import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';

import { AppContext } from '../../AppContext';
import Filter from './Filter';
import { FilterActionType } from '../../api/volcano/headers';

interface Props {
    anchorEl: null | HTMLElement,
    open: boolean,
    handleClose: (arg: any) => void,
}

const FilterMenu: React.FC<Props> = ({ anchorEl, open, handleClose }) => {
    const { filters, dispatchFilter } = React.useContext(AppContext);
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
                <Filter check={filters.showVA} toggle={() => dispatchFilter({ type: FilterActionType.VA, payload: !filters.showVA })} text='Vanuatu' />
            </MenuItem>
            <MenuItem>
                <Filter check={filters.showNZ} toggle={() => dispatchFilter({ type: FilterActionType.NZ, payload: !filters.showNZ })} text='New Zealand' />
            </MenuItem>
            <MenuItem>
                <Filter check={filters.showCNI} toggle={() => dispatchFilter({ type: FilterActionType.CNI, payload: !filters.showCNI })} text='Central NI' />
            </MenuItem>
            <MenuItem>
                <Filter check={filters.showWI} toggle={() => dispatchFilter({ type: FilterActionType.WI, payload: !filters.showWI })} text='White Island' />
            </MenuItem>
            <MenuItem>
                <Filter check={filters.showSAT} toggle={() => dispatchFilter({ type: FilterActionType.SAT, payload: !filters.showSAT })} text='Satellite' />
            </MenuItem>
            <MenuItem>
                <Filter check={filters.showARC} toggle={() => dispatchFilter({ type: FilterActionType.ARC, payload: !filters.showARC })} text='Erebus' />
            </MenuItem>
        </Menu>
    )
};

export default FilterMenu;