import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/styles';
import { filter } from '../FilterSearch';
import MapToggle from './MapToggle';
import PropTypes from 'prop-types';

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
};

const Navbar = ({classes, showVAAC, showSO2}) => {
    return (
        <div className={classes.root}>
            <span className={classes.toggleButton}><MapToggle showVAAC={showVAAC} showSO2={showSO2}/></span>
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