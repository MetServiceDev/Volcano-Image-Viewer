import Alert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { useState, useEffect, Fragment } from 'react';

const styles = {
    root: {
        width:'99%',
        marginLeft:'10px'
    },
    alert: {
        boxShadow: '1px 1px 2px #404040',
        cursor: 'auto'
    },
};

const LightningAlerts = ({classes}) => {

    const [alerts, setAlerts] = useState({severity:'success', msg: ''})
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        fetch('http://10.100.21.161:4000/lightning-data')
            .then(res => res.json())
            .then(data => {
                const { alertCheck, innerCheck, alertNames, innerNames } = data;
                if(alertCheck === 0 && innerCheck === 0){
                    setAlerts({severity: 'success', msg: 'No current lightning alerts for possible eruptions'});
                } else if(alertCheck > 0 && innerCheck > 0){
                    setAlerts({severity: 'error', msg: `Possible eruption at ${alertNames.map(name => {return `${name}, `})} --- Lightning also reported within 20km of ${innerNames.map(name => {return `${name}, `})}`});
                } else if(alertCheck > 0 && innerCheck === 0){
                    setAlerts({severity: 'warning', msg: `Lightning data indicates possible eruption happening at ${alertNames.map(name => {return `${name}, `})}  --- Please check latest imagery!`});
                } else if(alertCheck === 0 && innerCheck > 0){
                    setAlerts({severity: 'warning', msg: `Lightning data shows strikes within 20km of ${innerNames.map(name => {return `${name}, `})}  Please check latest imagery.`});
                };
                setLoaded(true);
            });     
    },[])

    return (
       <Fragment>
           {loaded && 
            <div className={classes.root}>
                <Alert className={classes.alert} severity={alerts.severity}>{alerts.msg}</Alert>
            </div>}
       </Fragment>
    );
};

LightningAlerts.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LightningAlerts);
