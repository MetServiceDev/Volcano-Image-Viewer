import React from 'react';
import { makeStyles } from '@material-ui/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MapIcon from '@material-ui/icons/Map';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';

import { useDispatch  } from 'react-redux';
import { setDisplay } from '../../redux/effects/displayEffect';
import { CurrentDisplay } from '../../api/display/headers';

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: '#f0f0f0',
        verticalAlign: 'middle',
    },
    button:{
        height:'4vh'
    },
}));

const MapToggle = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [alignment, setAlignment] = React.useState('left');
    const setCurrentDisplay = (string: CurrentDisplay) => dispatch(setDisplay(string))
    
    const handleAlignment = (event: React.MouseEvent, newAlignment: any) => {
        setAlignment(newAlignment);
    };

    const toggleButton = (display: CurrentDisplay, icon: JSX.Element | string, value: string) => (
        <ToggleButton
            onClick={()=>{setCurrentDisplay(display)}}
            value={value}
            aria-label="left aligned"
            className={classes.button}
        >
            {icon}
        </ToggleButton>
    )

    return (
        <ToggleButtonGroup className={classes.root} value={alignment} exclusive onChange={handleAlignment}>
            {toggleButton(CurrentDisplay.VOLCANO_MATRIX, <DashboardIcon/>, 'left')}
            {toggleButton(CurrentDisplay.SULFUR_MAPS, 'So2', 'center')}
            {toggleButton(CurrentDisplay.ALERT_MAP, <MapIcon/>, 'right')}
        </ToggleButtonGroup>
    );
};

export default MapToggle;
