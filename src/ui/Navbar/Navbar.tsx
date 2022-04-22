import React from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { InputAdornment, IconButton, Typography, Select, MenuItem, Tooltip, Switch } from '@material-ui/core';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Volcano } from '@metservice/aviationtypes';

import MapToggle from './MapToggle';
import UserMenu from './UserMenu';
import SettingsDialog from '../Settings';
import MonitorDialog from '../Monitor';
import FilterMenu from './FilterMenu';
import { AppContext } from '../../AppContext';

const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor:theme.palette.background.default,
        width:'100%',
        position:'fixed',
        padding: theme.spacing(1),
        borderBottom: `1px solid ${theme.palette.primary.dark}`,
        zIndex: 5,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchFilter: {
        width: '40%',
        display: 'flex',
    },
    searchField: {
        width:'100%',
        margin: 'auto',
        backgroundColor: theme.palette.background.paper,
    },
    rightSide: {
        marginRight: theme.spacing(2),
        display: 'flex',
        alignItems: 'center'
    },
    usernameDisplay: {
        marginRight: theme.spacing(1)
    },
    selectRows: {
        zIndex: 5,
        position: 'absolute',
        height: '4vh',
        padding:'0px',
        left:'15%',
        fontSize: '16px',
        outline: 'white',
        backgroundColor: theme.palette.background.default,
        "& .MuiSelect-select": {
            background: 'none',
        },
    },
    themeIcon: {
        verticalAlign: 'middle',
    }
});

interface Props extends WithStyles<typeof styles> {
    logout: () => Promise<void>;
    theme: boolean;
    toggleTheme: () => void;
    volcanoes: Volcano[];
    openVolcano: (e: any, val: any) => void
}

const Navbar: React.FC<Props> = ({ classes, logout, theme, toggleTheme, volcanoes, openVolcano }) => {
    const volcanoLabels = volcanoes?.map(volcano => volcano.name);
    const { user, navFilterState, gridDisplay, setGrid } = React.useContext(AppContext);

    const [userAnchorEl, setUserAnchorEl] = React.useState<null | HTMLElement>(null);
    const openUser = Boolean(userAnchorEl);
    const handleUserClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setUserAnchorEl(event.currentTarget);
    };

    const handleUserClose = () => setUserAnchorEl(null);

    const [openSettings, toggleSettings] = React.useState<boolean>(false);
    const [openMonitor, toggleMonitor] = React.useState<boolean>(false);

    const [filterAnchorEl, setFilterAnchorEl] = React.useState<null | HTMLElement>(null);
    const openFilters = Boolean(filterAnchorEl);
    const handleFilterClick= (event: React.MouseEvent<HTMLButtonElement>) => {
        setFilterAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => setFilterAnchorEl(null);

    return (
        <div className={classes.root}>
            <MapToggle/>
            {navFilterState.showNavGrid && <Select
                value={gridDisplay}
                onChange={(e: any) => setGrid(Number(e.target.value))}
                className={classes.selectRows}
                variant='outlined'
            >
                {[2, 4, 6].map(n =>
                    <MenuItem
                        key={n} 
                        value={n} 
                        style={{cursor:'pointer'}}
                    >
                        {`View ${n} per row`}
                    </MenuItem>)}
            </Select>}
            <div className={classes.searchFilter}>
                <Autocomplete
                    className={classes.searchField}
                    id="navbar-search"
                    options={volcanoLabels}
                    onChange={openVolcano}
                    renderInput={(params) => <TextField
                        {...params}
                        label="Search"
                        size='small'
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            ),
                        }}
                    />}
                />
                {navFilterState.showNavFilter && <IconButton onClick={handleFilterClick}>
                    <FilterListIcon/>
                </IconButton>}
                <FilterMenu
                    anchorEl={filterAnchorEl}
                    open={openFilters}
                    handleClose={handleFilterClose}
                />
            </div>
            <div>
                <div className={classes.rightSide}>
                    {navFilterState.showThemeToggle && <Tooltip title={`${!theme ? 'Dark' : 'Light'} theme`} arrow>
                        <>
                            {theme ? <DarkModeIcon className={classes.themeIcon}/> : <LightModeIcon className={classes.themeIcon}/>}
                            <Switch
                                checked={theme}
                                onChange={toggleTheme}
                                color="primary"
                            />
                        </>
                    </Tooltip>}
                    <Typography
                        variant="subtitle2"
                        className={classes.usernameDisplay}
                    >
                        {user?.name}
                    </Typography>
                    <AccountCircleIcon/>
                    <IconButton
                        onClick={handleUserClick}
                        size='small'
                    >
                        <ArrowDropDownIcon/>
                    </IconButton>
                </div>
                <UserMenu
                    anchorEl={userAnchorEl}
                    open={openUser}
                    handleClose={handleUserClose}
                    logout={logout}
                    openSettings={() => toggleSettings(true)}
                    openMonitor={() => toggleMonitor(true)}
                />
            </div>
            <SettingsDialog
                open={openSettings}
                theme={theme}
                toggleTheme={toggleTheme}
                handleClose={() => toggleSettings(false)}
            />
            <MonitorDialog
                open={openMonitor}
                handleClose={() => toggleMonitor(false)}
            />
        </div>
    );
};

export default withStyles(styles)(Navbar);
