import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { Theme, Typography, IconButton } from '@material-ui/core';
import LaunchIcon from '@mui/icons-material/Launch';

import { AppContext } from '../../AppContext';

const useStyles =  makeStyles((theme: Theme) => ({
    root: {
        margin: theme.spacing(2),
        backgroundColor: 'rgba(207, 6, 6, 0.25)',
        border: `1px solid ${theme.palette.error.main}`,
        borderRadius: theme.spacing(1),
        padding: theme.spacing(1),
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: theme.spacing(4),
        width: '100%'
    }
}));

interface Props {
    volcat: any;
}

const Volcat: React.FC<Props> = ({ volcat }) => {
    const classes = useStyles();
    const { setVolcat } = React.useContext(AppContext);
    const [duration, setDuration] = React.useState<any>();

    React.useEffect(() => {
        const utcNow = moment().utc();
        const startDate = moment(volcat?.startDate);
        const duration = moment.duration(utcNow.diff(startDate));
        if (duration.asDays() < 1) {
            setDuration(`${duration.asHours()} hours ago`)
        } else {
            setDuration(`${duration.asDays().toFixed()} days ago`)
        }
        
    }, [volcat?.startDate])

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Typography variant="body1">
                    <ReportGmailerrorredIcon
                        sx={{ display: 'inline', marginRight: '4px' }}
                        color="error"
                    />
                    {volcat?.header}
                </Typography>
                <Typography variant="body1">
                    VAAC Region: {volcat?.vaacRegion}
                </Typography>
                <Typography variant="body1">
                    Start Time: {volcat?.startDate}
                </Typography>
                <div>
                    <IconButton onClick={() => setVolcat(volcat)}>
                        <LaunchIcon/>
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default Volcat;
