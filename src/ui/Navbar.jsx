import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/styles';
import { filter } from '../FilterSearch';
import MapToggle from './MapToggle';
import PropTypes from 'prop-types';
import FilterListIcon from '@material-ui/icons/FilterList';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import { useState } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useDispatch, useSelector  } from 'react-redux';
import { handleGridDisplay, handleNZFilter, handleVAFilter, handleCNIFilter, handleWIFilter } from '../redux/actions';
import Select from '@material-ui/core/Select';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import Filter from './Filter';

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
        width:'40%',
        backgroundColor: 'white',
        left:'20%',
        position: 'relative',
        '& label.Mui-focused': {
            color: '#121212',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#ffbb00',
          },
          '& .MuiOutlinedInput-root': {
          
            '&.Mui-focused fieldset': {
              borderColor: '#ffbb00',
            },
        }
    },
    toggleButton: {
        position: 'relative',
        left:'2%',
        backgroundColor: 'white'
    },
    filterButton: {
        position: 'relative',
        left:'62%',
        color: '#404040',
        display:'inline',
        verticalAlign: 'middle',
        cursor: 'pointer',
        borderRadius: '100%'
    },
    filterMenu: {
        width:'15%',
        position:'fixed',
        left:'62%',
        top:'4%',
        zIndex: 5,  
    },
    selectRows: {
        height: '4vh',
        padding:'0px',
        position:'absolute',
        left:'15%',
        fontSize: '16px',
        outline: 'white',
        backgroundColor: 'white',
        "& .MuiSelect-select": {
            background: 'none',
        },
    },
    refreshWarning: {
        width: '20%',
        float:'right',
        marginRight:'40px',
        padding:'0px 10px 0px 5px',
        fontSize:'12px'
    },
    minimize: {
        position: 'relative',
        cursor: 'pointer'
    }
};

const Navbar = ({classes}) => {
    const dispatch = useDispatch();

    const [showFilter, toggleFilter] = useState(false);
    const setGridDisplay = size => dispatch(handleGridDisplay(size));
    const toggleNZ = val => dispatch(handleNZFilter(val));
    const toggleVA = val => dispatch(handleVAFilter(val));
    const toggleCNI = val => dispatch(handleCNIFilter(val));
    const toggleWI = val => dispatch(handleWIFilter(val));
    const gridDisplay = useSelector(state => state.gridDisplay);
    const { showNZ, showVA, showCNI, showWI } = useSelector(state => state);
    const [showRefreshWarning, toggleRefreshWarning] = useState(true)

    const setGrid = (e) => {
        const size = Number(e.target.value);
        setGridDisplay(size);
        localStorage.setItem('gridSize', size);
    }

    return (
        <div className={classes.root}>
            <span className={classes.toggleButton}><MapToggle/></span>
            <ButtonBase className={classes.filterButton}><FilterListIcon onClick={()=>{toggleFilter(!showFilter)}}/></ButtonBase>
            {showFilter && <Paper className={classes.filterMenu}>
                <MenuList>
                    <Filter check={showVA} toggle={()=>{toggleVA(!showVA)}} text='Vanuatu'/>
                    <Filter check={showNZ} toggle={()=>{toggleNZ(!showNZ)}} text='New Zealand'/>
                    <Filter check={showCNI} toggle={()=>{toggleCNI(!showCNI)}} text='Central NI'/>
                    <Filter check={showWI} toggle={()=>{toggleWI(!showWI)}} text='White Island'/>
                </MenuList>
            </Paper>}
            <Select variant="outlined" value={gridDisplay} onChange={(e)=>{setGrid(e)}} className={classes.selectRows}>
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
            {showRefreshWarning && <Alert severity='warning' className={classes.refreshWarning} 
                action={<CloseIcon className={classes.minimize} onClick={()=>{toggleRefreshWarning(false)}}/>}>
                This page refreshes every 10 minutes
            </Alert>}
        </div>
    );
};

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);
