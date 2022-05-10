import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme, Typography } from '@material-ui/core';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const useStyles =  makeStyles((theme: Theme) => ({
    root: {
        width: 'auto',
        textAlign: 'center'
    }
}));

const NoVolcats: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h3">No Current Volcat Alerts!</Typography>
            <CheckCircleOutlineIcon color="success"  sx={{ fontSize: 512 }}/>
        </div>
    );
};

export default NoVolcats;
