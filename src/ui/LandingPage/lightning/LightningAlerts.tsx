import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { Color } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { Typography, CircularProgress, IconButton, Tooltip, Theme } from '@material-ui/core';
import MapIcon from '@mui/icons-material/Map';
import { LightningResponse } from '@metservice/aviationtypes';
import LightningMapDialog from './LightningMapDialog';

const useStyles =  makeStyles((theme: Theme) => ({
    root: {
        width:'100%',
        marginLeft:'2px',
        alignItems: 'center',
    },
    alert: {
        boxShadow: '1px 1px 2px #404040',
        cursor: 'auto',
        display: 'flex',
        alignItems: 'center'
    },
    reload: {
        cursor: 'pointer'
    },
    loader: {
        verticalAlign:'middle',
        marginLeft:'10px',
        color: theme.palette.primary.main
    },
    text: {
        verticalAlign: 'middle',
        display: 'inline',
        marginLeft:'10px'
    },
}));

interface Props {
    lightningAlerts: LightningResponse;
}

const LightningAlerts: React.FC<Props> = ({ lightningAlerts }) => {
    const classes = useStyles();
    const [showMap, toggleMap] = React.useState<boolean>(false);

    if(!lightningAlerts){
        return (
            <div className={classes.root}>
                <CircularProgress size={24} className={classes.loader}/>
                <Typography className={classes.text}>Loading lightning data, please wait...</Typography>
            </div>
        );
    };

    const mapIcon = (
        <Tooltip
            title="open map overview"
            key="mapIcon"
            arrow
        >
            <IconButton
                className={classes.reload}
                onClick={() => toggleMap(true)}
            >
                <MapIcon />
            </IconButton>
        </Tooltip>
    )

    return (
       <div>
           {lightningAlerts && 
            <div className={classes.root}>
                <Alert
                    className={classes.alert}
                    severity={lightningAlerts?.formattedResponse.severity as Color}
                    action={[lightningAlerts?.formattedResponse.severity !== 'success' ? mapIcon : null].filter(Boolean)}
                >
                    {lightningAlerts?.formattedResponse.msg}
                </Alert>
            </div>}
            <LightningMapDialog
                timestamp={lightningAlerts?.timestamp}
                open={showMap}
                handleClose={() => toggleMap(false)}
                strikeLocations={lightningAlerts?.strikes.features ?? []}
            />
       </div>
    );
};

export default LightningAlerts;
