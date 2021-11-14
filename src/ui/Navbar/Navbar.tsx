import React from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { InputAdornment, Switch, Select, IconButton, Tooltip, MenuItem } from '@material-ui/core';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import FilterListIcon from '@material-ui/icons/FilterList';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch, useSelector } from 'react-redux';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import MapToggle from './MapToggle';
import { setGrid } from '../../redux/effects/gridEffect';
import { setNZFilter, setVAFilter, setCNIFilter, setWIFilter, setSATFilter } from '../../redux/effects/filterEffects';
import FilterMenu from './FilterMenu';
import { AppState } from '../../redux/store';
import { Volcano } from '../../api/volcano/headers';

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

interface Props extends WithStyles {
    logout: () => Promise<void>;
    theme: boolean;
    toggleTheme: () => void;
    search: (e:any) => any;
    volcanoes: Volcano[];
    openVolcano: (e: any, val: any) => void
}

const Navbar: React.FC<Props> = ({ classes, logout, theme, toggleTheme, search, volcanoes, openVolcano }) => {
    const dispatch = useDispatch();
    const setGridDisplay = (size:number) => dispatch(setGrid(size));

    const toggleNZ = (val:boolean) => dispatch(setNZFilter(val));
    const toggleVA = (val:boolean) => dispatch(setVAFilter(val));
    const toggleCNI = (val:boolean) => dispatch(setCNIFilter(val));
    const toggleWI = (val:boolean) => dispatch(setWIFilter(val));
    const toggleSAT = (val:boolean) => dispatch(setSATFilter(val));
    const gridDisplay = useSelector((state: AppState) => state.gridDisplay);
    const { showNZ, showVA, showCNI, showWI, showSAT } = useSelector((state: AppState) => state.filters);

    const saveGridSettings = (e: any) => {
        const size = Number(e.target.value);
        setGridDisplay(size);
        localStorage.setItem('gridSize', size.toString());
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    const volcanoLabels = volcanoes.map(volcano => volcano.name)

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
                        onChange={search}
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
                <Tooltip title='logout' arrow>
                    <IconButton>
                        <ExitToAppIcon 
                            className={classes.userIcon}
                            onClick={logout}
                        />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
};

export default withStyles(styles)(Navbar);
