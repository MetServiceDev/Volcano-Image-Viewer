import React from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { InputAdornment, Switch, Select, IconButton, Tooltip, MenuItem } from '@material-ui/core';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useDispatch, useSelector } from 'react-redux';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 

import MapToggle from './MapToggle';
import { setNZFilter, setVAFilter, setCNIFilter, setWIFilter, setSATFilter } from '../../redux/effects/filterEffects';
import FilterMenu from './FilterMenu';
import { AppState } from '../../redux/store';
import { Volcano } from '../../api/volcano/headers';
import UserMenu from './UserMenu';
import { AppContext } from '../../AppContext';

const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor:theme.palette.background.default,
        width:'100%',
        position:'fixed',
        padding:'10px',
        borderBottom: `1px solid ${theme.palette.primary.dark}`,
        zIndex: 5,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    searchFilter: {
        width: '40%',
        display: 'flex',
    },
    searchField: {
        width:'100%',
        display: 'flex',
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(1)
    },
    toggleButton: {
    },
    filterButton: {
        display:'inline',
        verticalAlign: 'middle',
        cursor: 'pointer',
        borderRadius: '100%'
    },
    filterMenu: {
        zIndex: 5,  
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
    userIcon: {
    },
    link: {
        textDecoration:'none'
    },
    themeIcon: {
        verticalAlign: 'middle'
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
    const dispatch = useDispatch();

    const { gridDisplay, setGrid } = React.useContext(AppContext);

    const toggleNZ = (val:boolean) => dispatch(setNZFilter(val));
    const toggleVA = (val:boolean) => dispatch(setVAFilter(val));
    const toggleCNI = (val:boolean) => dispatch(setCNIFilter(val));
    const toggleWI = (val:boolean) => dispatch(setWIFilter(val));
    const toggleSAT = (val:boolean) => dispatch(setSATFilter(val));
    const { showNZ, showVA, showCNI, showWI, showSAT } = useSelector((state: AppState) => state.filters);

    const saveGridSettings = (e: any) => {
        const size = Number(e.target.value);
        setGrid(size);
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    const volcanoLabels = volcanoes.map(volcano => volcano.name);

    const [userAnchorEl, setUserAnchorEl] = React.useState<null | HTMLElement>(null);
    const openUser = Boolean(userAnchorEl);
    const handleUserClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setUserAnchorEl(event.currentTarget);
    };

    const handleUserClose = () => setUserAnchorEl(null);

    return (
        <div className={classes.root}>
            <span className={classes.toggleButton}><MapToggle/></span>
            <Select
                value={gridDisplay}
                onChange={(e) => saveGridSettings(e)}
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
            </Select>
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
                
                <Tooltip title='filters' arrow>
                    <IconButton
                        className={classes.filterButton}
                        onClick={handleClick}
                    >
                        <FilterListIcon/>
                    </IconButton>
                </Tooltip>
                <FilterMenu
                    anchorEl={anchorEl}
                    open={open}
                    handleClose={handleClose}
                    showVA={showVA}
                    showNZ={showNZ}
                    showCNI={showCNI}
                    showWI={showWI}
                    showSAT={showSAT}
                    toggleVA={() => toggleVA(!showVA)}
                    toggleNZ={() => toggleNZ(!showNZ)}
                    toggleWI={() => toggleWI(!showWI)}
                    toggleCNI={() => toggleCNI(!showCNI)}
                    toggleSAT={() => toggleSAT(!showSAT)}
                />
            </div>
            <div>
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
                <Tooltip title='user menu' arrow>
                    <IconButton onClick={handleUserClick}>
                        <AccountCircleIcon 
                            className={classes.userIcon}
                        />
                    </IconButton>
                </Tooltip>
                <UserMenu
                    anchorEl={userAnchorEl}
                    open={openUser}
                    handleClose={handleUserClose}
                    logout={logout}
                />
            </div>
        </div>
    );
};

export default withStyles(styles)(Navbar);
