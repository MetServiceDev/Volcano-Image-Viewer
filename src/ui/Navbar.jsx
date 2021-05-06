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
import { useDispatch, useSelector  } from 'react-redux';
import { handleGridDisplay, handleNZFilter, handleVAFilter } from '../redux/actions';
import Select from '@material-ui/core/Select';

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
        left:'2%',
        backgroundColor: 'white'
    },
    filterButton: {
        position: 'relative',
        left:'72%',
        color: '#404040',
        display:'inline',
        verticalAlign: 'middle',
        cursor: 'pointer',
        borderRadius: '100%'
    },
    filterMenu: {
        width:'10%',
        position:'fixed',
        left:'72%',
        top:'4%',
        zIndex: 5,
    },
    menuItem: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
    },
    switch: {
        position:'absolute',
        left:'70%'
    },
    selectRows: {
        height: '4vh',
        padding:'0px',
        position:'absolute',
        left:'10%',
        fontSize: '16px',
        outline: 'white',
        backgroundColor: 'white'
    },
};

const Navbar = ({classes, showVAAC, showSO2}) => {
    const dispatch = useDispatch();

    const [showFilter, toggleFilter] = useState(false);
    const setGridDisplay = size => dispatch(handleGridDisplay(size));
    const toggleNZ = val => dispatch(handleNZFilter(val));
    const toggleVA = val => dispatch(handleVAFilter(val));
    const gridDisplay = useSelector(state => state.gridDisplay);
    const showNZ = useSelector(state => state.showNZ);
    const showVA = useSelector(state => state.showVA);

    return (
        <div className={classes.root}>
            <span className={classes.toggleButton}><MapToggle showVAAC={showVAAC} showSO2={showSO2}/></span>
            <ButtonBase className={classes.filterButton}><FilterListIcon onClick={()=>{toggleFilter(!showFilter)}}/></ButtonBase>
            {showFilter && <Paper className={classes.filterMenu}>
                <MenuList>
                    <MenuItem className={classes.menuItem}><Typography>New Zealand</Typography><Switch className={classes.switch} checked={showNZ} onChange={()=>{toggleNZ(!showNZ)}} color="primary"/></MenuItem>
                    <MenuItem className={classes.menuItem}><Typography>Vanuatu</Typography><Switch className={classes.switch} checked={showVA} onChange={()=>{toggleVA(!showVA)}} color="primary"/></MenuItem>
                </MenuList>
            </Paper>}
            <Select variant="outlined" value={gridDisplay} onChange={(e)=>{setGridDisplay(Number(e.target.value))}} className={classes.selectRows}>
                {[2, 4, 6].map(n => { return <option key={n} value={n} style={{cursor:'pointer'}}>{`View ${n} per row`}</option>})}
            </Select>
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
