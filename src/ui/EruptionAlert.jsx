import Alert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const styles = {
    root: {
        width:'20%',
        display:'inline-block',
        verticalAlign:'middle',
        marginLeft:'10px'
    },
    alert: {
        boxShadow: '1px 1px 2px #404040',
        cursor: 'auto'
    },
}

const setAlertStatus = (data) => {
    switch(data.alertLevel){
        case '0':
            return {severity: 'success', msg: data.alertMsg}
        case '1':
        case '2':
            return {severity: 'warning', msg: data.alertMsg}
        case '3':
        case '4':
        case '5':
            return {severity: 'error', msg: data.alertMsg}
        default:
            return
    };
};

const EruptionAlert = ({classes, data}) => {
    const [alert, setAlert] = useState({severity:'success', msg: ''})

    useEffect(() => {
        const alertStatus = setAlertStatus(data)
        setAlert(alertStatus);
    },[data])

    return (
        <div className={classes.root}>
            <Alert className={classes.alert} severity={alert.severity}>Alert level {data.alertLevel} - {alert.msg}</Alert>
        </div>
        
    )
};

EruptionAlert.propTypes = {
    classes: PropTypes.object,
    data: PropTypes.object.isRequired
}

export default withStyles(styles)(EruptionAlert);
