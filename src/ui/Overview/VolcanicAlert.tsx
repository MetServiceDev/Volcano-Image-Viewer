import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

import { VAL } from '../../api/volcano/headers';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width:'30%',
        marginRight: theme.spacing(4)
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

const setAlertStatus = (data: VAL) => {
    const { activity, msg, level } = data;
    const activityMessage = activity ? activity : msg;
    switch(Number(level)){
        case 0:
        case 1:
            return { severity: 'success', msg: activityMessage, icon:<ReportProblemOutlinedIcon/> }
        case 2:
        case 3:
            return { severity: 'warning', msg: activityMessage }
        case 4:
        case 5:
            return { severity: 'error', msg: activityMessage }
        default:
            return { severity: 'success', msg: activityMessage, icon:<ReportProblemOutlinedIcon/> }
    };
};

interface Props {
    data: VAL;
};

const VolcanicAlert: React.FC<Props> = ({ data }) => {
    const classes = useStyles();
    const alert = setAlertStatus(data);

    if(!data){
        return null;
    }
    return (
        <div className={classes.root}>
            <Alert className={classes.alert} icon={alert?.icon} severity={alert.severity as any}>
                Alert level {data.level} - {alert.msg}
            </Alert>       
        </div> 
    );
};

export default VolcanicAlert;
