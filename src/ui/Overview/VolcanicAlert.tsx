import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/styles';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

const useStyles = makeStyles(() => ({
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
}));

const setAlertStatus = (data: any) => {
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
    };
};

interface Props {
    data: any
}

const VolcanicAlert: React.FC<Props> = ({ data }) => {
    const classes = useStyles();
    const alert = setAlertStatus(data);

    if(!data){
        return null;
    }
    return (
        <div className={classes.root}>
            <Alert className={classes.alert} icon={alert?.icon} severity={alert?.severity as any}>
                Alert level {data.level} - {alert?.msg}
            </Alert>       
        </div> 
    );
};

export default VolcanicAlert;
