import React from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { InputAdornment, Paper, Switch, MenuList, Select, IconButton, Tooltip, Menu, MenuItem } from '@material-ui/core';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { filter } from '../../api/filterSearch';
import MapToggle from './MapToggle';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { setGrid } from '../../redux/effects/gridEffect';
import { setNZFilter, setVAFilter, setCNIFilter, setWIFilter, setSATFilter } from '../../redux/effects/filterEffects';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Filter from './Filter';
import { AppState } from '../../redux/store';

const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor:theme.palette.background.default,
        width:'100%',
        position:'fixed',
        padding:'10px',
        borderBottom: '1px solid #404040',
        zIndex: 5,
        display: 'flex',
        justifyContent: 'space-between'
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
        // height: '4vh',
        // padding:'0px',
        // position:'absolute',
        // left:'15%',
        // fontSize: '16px',
        // outline: 'white',
        // backgroundColor: theme.palette.background.default,
        // "& .MuiSelect-select": {
        //     background: 'none',
        // },
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
}

const Navbar: React.FC<Props> = ({ classes, logout, theme, toggleTheme }) => {
    const dispatch = useDispatch();
    const [showFilter, toggleFilter] = useState(false);
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

    return (
        <div className={classes.root}>
            <span className={classes.toggleButton}><MapToggle/></span>
            <Menu open={open} anchorEl={anchorEl} onChange={(e) => saveGridSettings(e)} className={classes.selectRows}>
                {[2, 4, 6].map(n => <MenuItem
                                        key={n} 
                                        value={n} 
                                        style={{cursor:'pointer'}}
                                    >
                                        {`View ${n} per row`}
                                    </MenuItem> )}
            </Menu>
            <div className={classes.searchFilter}>
                <TextField
                    label="Search"
                    size='small'
                    variant="outlined"
                    className={classes.searchField}
                    onChange={(e) => filter(e, 'volcano-item', 'volcano-text')}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
                <IconButton className={classes.filterButton}>
                    <FilterListIcon onClick={() => toggleFilter(!showFilter)}/>
                </IconButton>
                {showFilter && <Paper className={classes.filterMenu}>
                    <MenuList>
                        <Filter check={showVA} toggle={() => toggleVA(!showVA)} text='Vanuatu' />
                        <Filter check={showNZ} toggle={() => toggleNZ(!showNZ)} text='New Zealand' />
                        <Filter check={showCNI} toggle={() => toggleCNI(!showCNI)} text='Central NI' />
                        <Filter check={showWI} toggle={() => toggleWI(!showWI)} text='White Island' />
                        <Filter check={showSAT} toggle={() => toggleSAT(!showSAT)} text='Satellite' />
                    </MenuList>
                </Paper>}
            </div>
            <div className={classes.rightIcons}>
                <Tooltip title={`${!theme ? 'Dark' : 'Light'} theme`} arrow>
                    <Switch
                        checked={theme}
                        onChange={toggleTheme}
                        color="primary"
                    />
                </Tooltip>
                <IconButton>
                    <ExitToAppIcon 
                        className={classes.userIcon}
                        onClick={logout}
                    />
                </IconButton>
            </div>
        </div>
    );
};

export default withStyles(styles)(Navbar);
