import React from 'react';
import { Typography } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    root: {
        textAlign: 'center',
        padding:'10px',
    },
    icon: {
        color: '#e31e10',
        fontSize:'64px'
    },
    button: {
        textTransform: 'none',
    }
}));

interface Props {
    volcanoName: string,
    refresh: () => void,
}

const ErrorMessage: React.FC<Props> = ({ volcanoName, refresh }) => {
    const classes = useStyles();
    const [countdown, setCountdown] = React.useState<number>(3);

    React.useEffect(() => {
        if(countdown === 0) {
            refresh();
            setCountdown(3)
        } else {
            setTimeout(() => {
                setCountdown(countdown - 1)
            }, 1000)
        }
    }, [countdown]);

    return (
        <div className={classes.root}>
            <ErrorOutlineIcon className={classes.icon}/>
            <Typography>Failed to fetch latest images for {volcanoName}</Typography>
            <Typography>Retrying in {countdown}</Typography>
        </div>
    );
};

export default ErrorMessage;
