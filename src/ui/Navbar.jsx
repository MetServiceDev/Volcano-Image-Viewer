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
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';

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
        left:'85%',
        backgroundColor: 'white'
    },
    filterButton: {
        position: 'relative',
        left:'86%',
        color: '#404040',
        display:'inline',
        verticalAlign: 'middle',
        cursor: 'pointer',
        borderRadius: '100%'
    },
    filterMenu: {
        width:'10%',
        position:'fixed',
        left:'87%',
        top:'4%',
    },
    menuItem: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
    },
    switch: {
        position:'absolute',
        left:'70%'
    }
};

const Navbar = ({classes, showVAAC, showSO2, showNZ, showVA, toggleNZ, toggleVA}) => {

    const [showFilter, toggleFilter] = useState(false)

    return (
        <div className={classes.root}>
            <span className={classes.toggleButton}><MapToggle showVAAC={showVAAC} showSO2={showSO2}/></span>
            <ButtonBase className={classes.filterButton}><FilterListIcon onClick={()=>{toggleFilter(!showFilter)}}/></ButtonBase>
            {showFilter && <Paper className={classes.filterMenu}>
                <MenuList>
                    <MenuItem className={classes.menuItem}><Typography>New Zealand</Typography><Switch className={classes.switch} checked={showNZ} onChange={toggleNZ} color="primary"/></MenuItem>
                    <MenuItem className={classes.menuItem}><Typography>Vanuatu</Typography><Switch className={classes.switch} checked={showVA} onChange={toggleVA} color="primary"/></MenuItem>
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
    showNZ: PropTypes.bool.isRequired,
    showVA: PropTypes.bool.isRequired,
    toggleNZ: PropTypes.func.isRequired,
    toggleVA: PropTypes.func.isRequired,
};

export default withStyles(styles)(Navbar);