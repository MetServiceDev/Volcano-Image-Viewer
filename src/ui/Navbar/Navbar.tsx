import React from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { InputAdornment, Switch, Select, IconButton, Tooltip, MenuItem } from '@material-ui/core';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
// import { Autocomplete } from '@material-ui/lab';
import FilterListIcon from '@material-ui/icons/FilterList';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch, useSelector  } from 'react-redux';

import { filter } from '../../api/filterSearch';
import MapToggle from './MapToggle';
import { setGrid } from '../../redux/effects/gridEffect';
import { setNZFilter, setVAFilter, setCNIFilter, setWIFilter, setSATFilter } from '../../redux/effects/filterEffects';
import FilterMenu from './FilterMenu';
import { AppState } from '../../redux/store';

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
    rightIcons: {
        // left:'90%',
        // top:'25%',
        // position:'absolute',
        // display: 'inline-block',
        // marginRight:"20px",
        // verticalAlign:'middle',
    },
    userIcon: {
    },
    link: {
        textDecoration:'none'
    }
});

interface Props extends WithStyles {
    logout: () => Promise<void>,
    theme: boolean,
    toggleTheme: () => void,
    search: (e:any) => any
}

const Navbar: React.FC<Props> = ({ classes, logout, theme, toggleTheme, search }) => {
    const dispatch = useDispatch();
    const [showFilter, toggleFilter] = React.useState<boolean>(false);
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
                <TextField
                    label="Search"
                    size='small'
                    variant="outlined"
                    className={classes.searchField}
                    onChange={search}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                    }}
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
            <div className={classes.rightIcons}>
                <Tooltip title={`${!theme ? 'Dark' : 'Light'} theme`} arrow>
                    <Switch
                        checked={theme}
                        onChange={toggleTheme}
                        color="primary"
                    />
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
