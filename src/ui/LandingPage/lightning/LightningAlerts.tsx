import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/styles';
import { Typography, CircularProgress, IconButton, Tooltip, Theme } from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import MapIcon from '@mui/icons-material/Map';

import fetchLightning from '../../../api/lightning/FetchLightning';
import formatLightningData from '../../../api/lightning/formatLightningData';

import { LandingPageContext } from '../Context';
import { AppContext } from '../../../AppContext';
import LightningMapDialog from './LightningMapDialog';

const useStyles =  makeStyles((theme: Theme) => ({
    root: {
        width:'100%',
        marginLeft:'2px',
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

const LightningAlerts: React.FC = () => {
    const classes = useStyles();

    const { lightningAlerts, setAlerts } = React.useContext(LandingPageContext);
    const { user } = React.useContext(AppContext);

    const [lightningState, setLightningState] = React.useState<any>({});
    const [showMap, toggleMap] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (lightningAlerts) {
            const formattedData = formatLightningData(lightningAlerts);
            setLightningState(formattedData);
        }
    }, [lightningAlerts])

    const manualPoll = async(): Promise<void> => {
        try {
            setAlerts(null);
            const data = await fetchLightning(user?.token as string);
            const formattedData = formatLightningData(data);
            setAlerts(lightningAlerts);
            setLightningState(formattedData);
        } catch (err) {
            setLightningState({severity: 'error', msg: 'Error: Failed to fetch lightning data'});
        }   
    }

    if(!lightningAlerts){
        return (
            <div className={classes.root}>
                <CircularProgress size={24} className={classes.loader}/>
                <Typography className={classes.text}>Loading lightning data, please wait...</Typography>
            </div>
        );
    };

    const replyIcon = (
        <Tooltip
            title="refresh lightning alerts"
            key="refreshIcon"
            arrow
        >
            <IconButton
                onClick={manualPoll}
                className={classes.reload}
            >
                <ReplayIcon />
            </IconButton>
        </Tooltip>
    );

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
                    severity={lightningState.severity as any}
                    action={[lightningState.severity !== 'success' ? mapIcon : null, replyIcon].filter(Boolean)}
                >
                    {lightningState.msg}
                </Alert>
            </div>}
            <LightningMapDialog
                open={showMap}
                handleClose={() => toggleMap(false)}
                strikeLocations={lightningState.strikeLocations}
                timestamp={lightningAlerts.timestamp}
            />
       </div>
    );
};

export default LightningAlerts;