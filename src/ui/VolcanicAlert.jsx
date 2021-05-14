import Alert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import MinimizeIcon from '@material-ui/icons/Minimize';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

const styles = {
    root: {
        width:'25%',
        display:'inline-block',
        verticalAlign:'middle',
        marginLeft:'20px'
    },
    alert: {
        boxShadow: '1px 1px 2px #404040',
        cursor: 'auto'
    },
    minimize: {
        position: 'relative',
        top: '-25%',
        cursor: 'pointer'
    }
}

const setAlertStatus = (data) => {
    switch(data.alertLevel){
        case '0':
        case '1':
            return {severity: 'success', msg: data.alertMsg, icon:<ReportProblemOutlinedIcon/> }
        case '2':
        case '3':
            return {severity: 'warning', msg: data.alertMsg}
        case '4':
        case '5':
            return {severity: 'error', msg: data.alertMsg}
        default:
            return
    };
};

const VolcanicAlert = ({classes, data, toggle}) => {
    const [alert, setAlert] = useState({severity:'success', msg: ''})

    useEffect(() => {
        const alertStatus = setAlertStatus(data)
        setAlert(alertStatus);
    },[data]);

    if(!data){
        return null;
    }
    return (
        <div className={classes.root}>
            <Alert className={classes.alert} icon={alert.icon} severity={alert.severity} action={<MinimizeIcon onClick={toggle} className={classes.minimize}/>}>
                Alert level {data.alertLevel} - {alert.msg}
            </Alert>       
        </div> 
    );
};

VolcanicAlert.propTypes = {
    classes: PropTypes.object,
    data: PropTypes.object.isRequired,
    toggle: PropTypes.func.isRequired
}

export default withStyles(styles)(VolcanicAlert);
