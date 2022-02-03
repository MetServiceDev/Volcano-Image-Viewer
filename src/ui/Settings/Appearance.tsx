import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { MenuList, MenuItem, ListItemText, Theme, Select, Divider, Switch, Tooltip, Typography, Paper } from '@material-ui/core';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import { AppContext } from '../../AppContext';
import Filter from '../Navbar/Filter';
import { FilterActionType } from '../../api/volcano/headers';

const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.palette.background.default,
    },
    themeIcon: {
        verticalAlign: 'middle'
    },
    filters: {
        marginTop: theme.spacing(1),
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        padding: theme.spacing(1),
    },
    filterSection: {
        padding: theme.spacing(2)
    }
});

interface Props extends WithStyles<typeof styles> {
    theme: boolean;
    toggleTheme: () => void;
}

enum RowCount {
    TWO = 2,
    FOUR = 4,
    SIX = 6,
};

const Appearance: React.FC<Props> = ({ classes, theme, toggleTheme }) => {
    const { gridDisplay, setGrid, filters, dispatchFilter } = React.useContext(AppContext);

    return(
        <MenuList>
            <MenuItem onClick={toggleTheme}>
                <ListItemText>
                    Theme
                </ListItemText>
                <Tooltip title={`${!theme ? 'Dark' : 'Light'} theme`} arrow>
                    <>
                        {theme ? <DarkModeIcon className={classes.themeIcon}/> : <LightModeIcon className={classes.themeIcon}/>}
                        <Switch
                            checked={theme}
                            onChange={toggleTheme}
                            color="primary"
                        />
                    </>
                </Tooltip>
            </MenuItem>
            <Divider/>
            <MenuItem>
                <ListItemText>
                    Volcano Grid
                </ListItemText>
                <Select
                    value={gridDisplay}
                    onChange={(e) => setGrid(Number(e.target.value))}
                    variant='outlined'
                >
                    {Object.values(RowCount).map(n =>
                        <MenuItem
                            key={n} 
                            value={n} 
                            style={{cursor:'pointer'}}
                        >
                            {`${n} per row`}
                        </MenuItem>)}
                </Select>
            </MenuItem>
            <Divider/>
            <div className={classes.filterSection}>
                <Typography variant="subtitle1">
                    Filters
                </Typography>
                <Paper className={classes.filters}>
                    <Filter
                        check={filters.showVA}
                        toggle={() => dispatchFilter({
                            type: FilterActionType.VA,
                            payload: !filters.showVA
                        })}
                        text='Vanuatu'
                    />
                    <Filter
                        check={filters.showNZ}
                        toggle={() => dispatchFilter({
                            type: FilterActionType.NZ,
                            payload: !filters.showNZ
                        })}
                        text='New Zealand'
                    />
                    <Filter
                        check={filters.showCNI}
                        toggle={() => dispatchFilter({
                            type: FilterActionType.CNI,
                            payload: !filters.showCNI
                        })}
                        text='Central NI'
                    />
                    <Filter
                        check={filters.showWI}
                        toggle={() => dispatchFilter({
                            type: FilterActionType.WI,
                            payload: !filters.showWI
                        })}
                        text='White Island'
                    />
                    <Filter
                        check={filters.showARC}
                        toggle={() => dispatchFilter({
                            type: FilterActionType.ARC,
                            payload: !filters.showARC
                        })}
                        text='Erebus'
                    />
                    <Filter
                        check={filters.showSAT}
                        toggle={() => dispatchFilter({
                            type: FilterActionType.SAT,
                            payload: !filters.showSAT
                        })}
                        text='Satellite'
                    />
                </Paper>
            </div>
            <Divider/>
        </MenuList>
    );
}

export default withStyles(styles)(Appearance);
