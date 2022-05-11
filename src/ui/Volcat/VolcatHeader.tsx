import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { Theme, Typography, IconButton, Button } from '@material-ui/core';
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
    },
    openButton: {
        textTransform: 'none',
        backgroundColor: theme.palette.background.default,
        border: `1px solid ${theme.palette.grey[600]}`,
        padding: theme.spacing(1),
        '&:hover': {
            backgroundColor: theme.palette.background.paper,
        }
    },
    iconDiv: {
        display: 'flex'
    },
    timeText: {
        color: theme.palette.text.secondary,
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
                <div className={classes.iconDiv}>
                    <IconButton disabled={true}>
                        <ReportGmailerrorredIcon
                            sx={{ display: 'inline', marginRight: '4px' }}
                            color="error"
                        />
                    </IconButton>
                <div>
                <Typography variant="subtitle1"> 
                    {volcat?.header}
                </Typography>
                <Typography variant="subtitle2" className={classes.timeText}>
                    {volcat?.startDate}
                </Typography>
            </div>
        </div>              
        <div>
            <Button className={classes.openButton} onClick={() => setVolcat(volcat)}>
                View Alert <LaunchIcon sx={{ marginLeft: '4px' }}/>
            </Button>
        </div>
        </div>
        </div>
    );
};

export default Volcat;
