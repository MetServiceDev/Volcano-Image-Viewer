import React from 'react';
import { makeStyles } from '@material-ui/styles';
import WindowIcon from '@mui/icons-material/Window';
import MapIcon from '@material-ui/icons/Map';
import { Theme, Paper } from '@material-ui/core';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import { styled } from '@mui/material/styles';

import { useDispatch  } from 'react-redux';
import { setDisplay } from '../../redux/effects/displayEffect';
import { CurrentDisplay } from '../../api/display/headers';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
      margin: theme.spacing(0.5),
      border: 0,
      '&.Mui-disabled': {
        border: 0,
      },
      '&:not(:first-of-type)': {
        borderRadius: theme.shape.borderRadius,
      },
      '&:first-of-type': {
        borderRadius: theme.shape.borderRadius,
      },
    },
  }));

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
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
            onClick={() => setCurrentDisplay(display)}
            aria-label="left aligned"
            value={value}
            size='small'
        >
            {icon}
        </ToggleButton>
    )

    return (
        <Paper className={classes.root}>
            <StyledToggleButtonGroup
                size="small"
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
            >
                {toggleButton(CurrentDisplay.VOLCANO_MATRIX, <WindowIcon/>, 'left')}
                {toggleButton(CurrentDisplay.SULFUR_MAPS, <ScatterPlotIcon/>, 'center')}
                {toggleButton(CurrentDisplay.ALERT_MAP, <MapIcon/>, 'right')}
            </StyledToggleButtonGroup>
        </Paper>
    );
};

export default MapToggle;
