import Alert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import ReplayIcon from '@material-ui/icons/Replay';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    root: {
        width:'100%',
        marginLeft:'2px',
        marginBottom: '10px'
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
        marginLeft:'10px'
    },
    text: {
        verticalAlign: 'middle',
        display: 'inline',
        marginLeft:'10px'
    }
};

const LightningAlerts = ({classes}) => {

    const [alerts, setAlerts] = useState({severity:'success', msg: ''})
    const [loaded, setLoaded] = useState(false)

    const fetchData = () => {
        setLoaded(false);
        fetch(`https://io8flgqkmk.execute-api.ap-southeast-2.amazonaws.com/dev/lightning-data`, {
            headers: {
                'x-api-key': 'lKbptndQxl2AO4liuRVvi53IQZFLNMQI4tv3RrFq'
            }
        })
            .then(res => res.json())
            .then(data => {
                const res = JSON.parse(data.responseBody)
                const { alertCheck, innerCheck, alertNames, innerNames, areas, twentyKStrikes, hundredKStrikes } = res;
                if(alertCheck === 0 && innerCheck === 0){
                    setAlerts({severity: 'success', msg: 'No current lightning alerts for possible eruptions'});
                } else if(alertCheck > 0 && innerCheck > 0){
                    setAlerts({severity: 'error', msg: `${areas}: Possible eruption at ${alertNames.map(name => {return `${name}`})} --- ${twentyKStrikes} lightning strikes also reported within 20km of ${innerNames.map(name => {return `${name}`})}`});
                } else if(alertCheck > 0 && innerCheck === 0){
                    setAlerts({severity: 'warning', msg: `${areas}: Lightning data indicates possible eruption happening at ${alertNames.map(name => {return `${name}`})}  --- Please check latest imagery!`});
                } else if(alertCheck === 0 && innerCheck > 0){
                    setAlerts({severity: 'warning', msg: `${areas}: Lightning data shows ${twentyKStrikes} strikes within 20km and ${hundredKStrikes} strikes within 100km of ${innerNames.map(name => {return `${name}`})}  Please check latest imagery.`});
                };
                setLoaded(true);
            }).catch(() => { setAlerts({severity: 'error', msg: 'Error: Failed to fetch lightning data'}); setLoaded(true); })  
    }

    useEffect(() => { fetchData() },[]);

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
