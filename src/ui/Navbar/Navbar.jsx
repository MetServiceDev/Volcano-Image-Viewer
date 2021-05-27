import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/styles';
import { filter } from '../../modules/FilterSearch';
import MapToggle from './MapToggle';
import PropTypes from 'prop-types';
import FilterListIcon from '@material-ui/icons/FilterList';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import { useState } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useDispatch, useSelector  } from 'react-redux';
import { handleGridDisplay, handleNZFilter, handleVAFilter, handleCNIFilter, handleWIFilter, handleSATFilter } from '../../redux/actions';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Select from '@material-ui/core/Select';
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
        position:'relative',
        backgroundColor: 'white',
        left:'20%',
        verticalAlign:'middle',
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
    rightIcons: {
        left:'95%',
        top:'25%',
        position:'absolute',
        display: 'inline-block',
        marginRight:"20px",
        verticalAlign:'middle',
    },
    userIcon: {
        verticalAlign:'middle',
        fontSize:'28px',
        color:'#404040',
        marginRight:'20px',
        cursor: 'pointer'
    },
    link: {
        textDecoration:'none'
    },
};

const Navbar = ({classes, logout}) => {
    const dispatch = useDispatch();

    const [showFilter, toggleFilter] = useState(false);
    const setGridDisplay = size => dispatch(handleGridDisplay(size));
    const toggleNZ = val => dispatch(handleNZFilter(val));
    const toggleVA = val => dispatch(handleVAFilter(val));
    const toggleCNI = val => dispatch(handleCNIFilter(val));
    const toggleWI = val => dispatch(handleWIFilter(val));
    const toggleSAT = val => dispatch(handleSATFilter(val));
    const gridDisplay = useSelector(state => state.gridDisplay);
    const { showNZ, showVA, showCNI, showWI, showSAT } = useSelector(state => state);

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
                    <Filter check={showSAT} toggle={()=>{toggleSAT(!showSAT)}} text='Satellite'/>
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
            <div className={classes.rightIcons}>
                <ButtonBase><ExitToAppIcon className={classes.userIcon} onClick={logout}/></ButtonBase>
            </div>
        </div>
    );
};

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};

export default withStyles(styles)(Navbar);
