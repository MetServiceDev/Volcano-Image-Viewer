import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/styles';
import { filter } from '../FilterSearch';
import MapToggle from './MapToggle';
import PropTypes from 'prop-types';
import FilterListIcon from '@material-ui/icons/FilterList';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Switch from '@material-ui/core/Switch';
import { useState } from 'react';

const styles = {
    root: {
        backgroundColor:'white',
        width:'100%',
        position:'fixed',
        padding:'10px',
        borderBottom: '1px solid #404040',
        zIndex: '5'
    },
    searchField: {
        width:'50%',
        backgroundColor: 'white',
        left:'20%',
        position: 'relative',
    },
    toggleButton: {
        position: 'relative',
        left:'90%',
        backgroundColor: 'white'
    },
    filterButton: {
        position: 'relative',
        left:'91%',
        color: '#404040',
        display:'inline',
        verticalAlign: 'middle',
        cursor: 'pointer'
    },
    filterMenu: {
        width:'10%',
        position:'fixed',
        left:'90%',
        top:'4%',
    }
};

const Navbar = ({classes, showVAAC, showSO2, showNZ, showVA, toggleNZ, toggleVA}) => {

    const [showFilter, toggleFilter] = useState(false)

    return (
        <div className={classes.root}>
            <span className={classes.toggleButton}><MapToggle showVAAC={showVAAC} showSO2={showSO2}/></span>
            <FilterListIcon className={classes.filterButton} onClick={()=>{toggleFilter(!showFilter)}}/>
            {showFilter && <Paper className={classes.filterMenu}>
                <MenuList>
                    <MenuItem>New Zealand <Switch checked={showNZ} onChange={toggleNZ}/></MenuItem>
                    <MenuItem>Vanuatu <Switch checked={showVA} onChange={toggleVA}/></MenuItem>
                </MenuList>
            </Paper>}
            <TextField
                label="Search"
                size='small'
                variant="outlined"
                className={classes.searchField}
                onChange={(e) => {filter(e, 'volcano-item', 'volcano-text')}}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon/>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
    showVAAC: PropTypes.func.isRequired,
    showSO2: PropTypes.func.isRequired,
};

export default withStyles(styles)(Navbar);