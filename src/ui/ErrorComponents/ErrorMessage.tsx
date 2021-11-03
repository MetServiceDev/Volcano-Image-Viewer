import React from 'react';
import Typography from '@material-ui/core/Typography';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    root: {
        textAlign: 'center',
        padding:'10px',
    },
    icon: {
        color: '#e31e10',
        fontSize:'128px'
    }
}));

interface Props {
    msg: string
}

const ErrorMessage: React.FC<Props> = ({ msg }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <ErrorOutlineIcon className={classes.icon}/>
            <Typography>{msg}</Typography>
        </div>
    );
};

export default ErrorMessage;
