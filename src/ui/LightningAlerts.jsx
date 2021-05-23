import Alert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import ReplayIcon from '@material-ui/icons/Replay';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import apiCall from '../modules/APICall';
import { useDispatch, useSelector } from 'react-redux';
import { handleLightningAlerts } from '../redux/actions';

const styles = {
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
};

const LightningAlerts = ({classes}) => {

    const dispatch = useDispatch()
    const [alerts, setAlerts] = useState({severity:'success', msg: ''});
    const [loaded, setLoaded] = useState(false);
    const setLightningAlerts = data => dispatch(handleLightningAlerts(data));
    const currentAlerts = useSelector(state => state.lightningAlerts);
    const token = localStorage.getItem('token');

    const fetchData = () => {
        setLoaded(false);
        apiCall('lightning-data', 'GET', token).then(data => {
            const res = JSON.parse(data.responseBody)
                const { alertCheck, innerCheck, alertNames, innerNames, areas, twentyKStrikes, hundredKStrikes } = res;
                if(alertCheck === 0 && innerCheck === 0){
                    setAlerts({severity: 'success', msg: 'No current lightning alerts for possible eruptions'});
                    setLightningAlerts({severity: 'success', msg: 'No current lightning alerts for possible eruptions'})
                } else if(alertCheck > 0 && innerCheck > 0){
                    setAlerts({severity: 'error', msg: `${areas}: Possible eruption at ${alertNames.map(name => {return `${name}`})} --- ${twentyKStrikes} lightning strikes also reported within 20km of ${innerNames.map(name => {return `${name}`})}`});
                    setLightningAlerts({severity: 'error', msg: `${areas}: Possible eruption at ${alertNames.map(name => {return `${name}`})} --- ${twentyKStrikes} lightning strikes also reported within 20km of ${innerNames.map(name => {return `${name}`})}`});
                } else if(alertCheck > 0 && innerCheck === 0){
                    setAlerts({severity: 'warning', msg: `${areas}: Lightning data indicates possible eruption happening at ${alertNames.map(name => {return `${name}`})}  --- Please check latest imagery!`});
                    setLightningAlerts({severity: 'warning', msg: `${areas}: Lightning data indicates possible eruption happening at ${alertNames.map(name => {return `${name}`})}  --- Please check latest imagery!`});
                } else if(alertCheck === 0 && innerCheck > 0){
                    setAlerts({severity: 'warning', msg: `${areas}: Lightning data shows ${twentyKStrikes} strikes within 20km and ${hundredKStrikes} strikes within 100km of ${innerNames.map(name => {return `${name}`})}  Please check latest imagery.`});
                    setLightningAlerts({severity: 'warning', msg: `${areas}: Lightning data shows ${twentyKStrikes} strikes within 20km and ${hundredKStrikes} strikes within 100km of ${innerNames.map(name => {return `${name}`})}  Please check latest imagery.`});
                };
                setLoaded(true);
        }).catch(() => { setAlerts({severity: 'error', msg: 'Error: Failed to fetch lightning data'}); setLoaded(true); })  
    };

    useEffect(() => {
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
                <Alert className={classes.alert} severity={alerts.severity} action={<ReplayIcon onClick={fetchData} className={classes.reload}/>}>{alerts.msg}</Alert>
            </div>}
       </div>
    );
};

LightningAlerts.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LightningAlerts);
