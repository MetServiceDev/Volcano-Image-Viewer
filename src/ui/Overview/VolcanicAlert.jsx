import Alert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

const styles = {
    root: {
        width:'25%',
        float:'right',
        marginRight:'60px'
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
    switch(data.level){
        case '0':
        case '1':
            return {severity: 'success', msg: data.msg, icon:<ReportProblemOutlinedIcon/> }
        case '2':
        case '3':
            return {severity: 'warning', msg: data.msg}
        case '4':
        case '5':
            return {severity: 'error', msg: data.msg}
        default:
            return
    };
};

const VolcanicAlert = ({classes, data}) => {
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
            <Alert className={classes.alert} icon={alert.icon} severity={alert.severity}>
                Alert level {data.level} - {alert.msg}
            </Alert>       
        </div> 
    );
};

VolcanicAlert.propTypes = {
    classes: PropTypes.object,
    data: PropTypes.object.isRequired
}

export default withStyles(styles)(VolcanicAlert);
