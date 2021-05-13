import { withStyles } from '@material-ui/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MapIcon from '@material-ui/icons/Map';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch  } from 'react-redux';
import { handleCurrentDisplay } from '../redux/actions';

const styles = {
    root: {
        backgroundColor: '#f0f0f0',
        verticalAlign: 'middle',
    },
    button:{
        height:'4vh'
    },
};

const MapToggle = ({classes}) => {
    const dispatch = useDispatch()
    const [alignment, setAlignment] = useState('left');
    const setCurrentDisplay = string => dispatch(handleCurrentDisplay(string))
    
    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <ToggleButtonGroup className={classes.root} value={alignment} exclusive onChange={handleAlignment}>
            <ToggleButton onClick={()=>{setCurrentDisplay('VOLCANO_MATRIX')}} value="left" aria-label="left aligned" className={classes.button}><DashboardIcon/></ToggleButton>
            <ToggleButton onClick={()=>{setCurrentDisplay('SULFUR_MAPS')}} value="center" aria-label="center aligned" className={classes.button}>So2</ToggleButton>
            <ToggleButton onClick={()=>{setCurrentDisplay('ALERT_MAP')}} value="right" aria-label="right aligned" className={classes.button}><MapIcon/></ToggleButton>
        </ToggleButtonGroup>
    );
};

MapToggle.propTypes = {
    classes: PropTypes.object
}

export default withStyles(styles)(MapToggle);
