import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/styles';
import { Typography, CircularProgress } from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import fetchLightning from '../../api/lightning/FetchLightning';

import { LandingPageContext } from './Context';
import { AppContext } from '../../AppContext';

const useStyles =  makeStyles(() => ({
    root: {
        width:'100%',
        marginLeft:'2px',
    },
    alert: {
        boxShadow: '1px 1px 2px #404040',
        cursor: 'auto'
    },
    reload: {
        cursor: 'pointer'
    },
    loader: {
        verticalAlign:'middle',
        marginLeft:'10px',
        color: '#ffbb00'
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

    const manualPoll = async(): Promise<void> => {
        try {
            setAlerts(null);
            const data = await fetchLightning(user?.token as string);
            setAlerts(data);
        } catch (err) {
            setAlerts({severity: 'error', msg: 'Error: Failed to fetch lightning data'});
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

    return (
       <div>
           {lightningAlerts && 
            <div className={classes.root}>
                <Alert
                    className={classes.alert}
                    severity={lightningAlerts.severity as any}
                    action={<ReplayIcon onClick={manualPoll}
                    className={classes.reload}/>}
                >
                    {lightningAlerts.msg}
                </Alert>
            </div>}
       </div>
    );
};

export default LightningAlerts;
