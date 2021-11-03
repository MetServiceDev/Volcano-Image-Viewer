import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/styles';
import { Typography, CircularProgress } from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import { useDispatch, useSelector } from 'react-redux';

import { setLightningAlerts } from '../../redux/effects/lightningEffect';
import fetchLightning from '../../api/lightning/FetchLightning';
import { AppState } from '../../redux/store';
import { User } from '../../api/User/headers';

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
    const dispatch = useDispatch();
    const [alerts, setAlerts] = React.useState({severity:'success', msg: ''});
    const [loaded, setLoaded] = React.useState(false);
    const currentAlerts = useSelector((state: AppState) => state.lightningAlerts);
    const login = useSelector((state: AppState) => state.login) as User;

    const fetchData = async() => {
        setLoaded(false);
        try{
            const data = await fetchLightning(login.token);
            setAlerts(data);
            dispatch(setLightningAlerts(data))
            setLoaded(true);
        } catch (err){
            console.log(err);
            setAlerts({severity: 'error', msg: 'Error: Failed to fetch lightning data'});
            setLoaded(true);
        };
    };

    React.useEffect(()=> { 
        setInterval(()=>{ fetchData() }, 60000*10);
    // eslint-disable-next-line
    },[]);

    React.useEffect(() => {
        if(!currentAlerts.severity){
            fetchData();
        }else{
            setLoaded(true); 
            setAlerts(currentAlerts)
        }
    // eslint-disable-next-line
    },[]);

    if(!loaded){
        return (
            <div className={classes.root}>
                <CircularProgress size={24} className={classes.loader}/>
                <Typography className={classes.text}>Loading lightning data, please wait...</Typography>
            </div>
        );
    };

    return (
       <div>
           {loaded && 
            <div className={classes.root}>
                <Alert
                    className={classes.alert}
                    severity={alerts.severity as any}
                    action={<ReplayIcon onClick={fetchData}
                    className={classes.reload}/>}
                >
                    {alerts.msg}
                </Alert>
            </div>}
       </div>
    );
};

export default LightningAlerts;
