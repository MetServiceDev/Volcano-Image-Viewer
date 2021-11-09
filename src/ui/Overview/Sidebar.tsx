import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Theme, IconButton, Tooltip } from '@material-ui/core';

import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import TimelineIcon from '@material-ui/icons/Timeline'; 

import { OverviewDisplay } from '../../api/volcano/headers';

const styles = (theme: Theme) => createStyles({
    root: {
        height: '100vh',
        position: 'fixed',
        backgroundColor: theme.palette.background.default,
        width: theme.spacing(5),
    },
    icon: {
        borderRadius: '0%',
        width: '100%',
        marginBottom: theme.spacing(4),
        '&:hover': {
            color: theme.palette.primary.dark
        },
    },
    innerWrapper: {
        marginTop: theme.spacing(8)
    }
});

interface Props extends WithStyles<typeof styles> {
    openLiveView: () => void,
    openGraphs: () => void,
    openQuakes: () => void,
    currentDisplay: OverviewDisplay
}

const Sidebar: React.FC<Props> = ({ classes, openLiveView, openGraphs, openQuakes, currentDisplay }) => {

    const sbIcon = (icon: JSX.Element, click: () => void, msg: string, option: OverviewDisplay) => {
        const color = currentDisplay === option ? '#ffbb00' : '';
        return (
            <Tooltip title={msg} arrow className={classes.icon}>
                <IconButton onClick={click} style={{ color }}>
                    {icon}
                </IconButton>
            </Tooltip>
        )
    }

    return (
        <div className={classes.root}>
            <div className={classes.innerWrapper}>
                {sbIcon(<PhotoCameraIcon/>, openLiveView, 'Live Images', OverviewDisplay.THUMBNAIL)}
                {sbIcon(<InsertChartIcon/>, openGraphs, 'DRUM, RASM & SSAM', OverviewDisplay.DRUM_GRAPH)}
                {sbIcon(<TimelineIcon/>, openQuakes, 'Earthquake Stats', OverviewDisplay.QUAKES)}
            </div>
        </div>
    )
};

export default withStyles(styles)(Sidebar);
