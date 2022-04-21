import React from 'react';
import { useQuery } from '@apollo/client';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Theme, Typography } from '@material-ui/core';
import { LightningResponse } from '@metservice/aviationtypes';
import moment from 'moment';

import { lightningQuery } from '../../graphQL/queries';
import LightningAlerts from '../LandingPage/lightning/LightningAlerts';

const styles = (theme: Theme) => createStyles({
    root: {
        height: '60vh',
        overflow: 'auto'
    },
    eachStrike: {
        margin: theme.spacing(1)
    }
});

interface Props extends WithStyles<typeof styles> {}

const LightningLog: React.FC<Props> = ({ classes }) => {
    const lightningQL = useQuery(lightningQuery);

    const [lightning, setLightning] = React.useState<LightningResponse[]>([]);

    React.useEffect(() => {
        if (lightningQL?.data?.fetchLightning) {
            setLightning(lightningQL?.data?.fetchLightning);
        }
    }, [lightningQL])

    return (
        <div className={classes.root}>
            {lightning?.map((strikeData, index) => (
                <div className={classes.eachStrike}>
                    <Typography variant='body2'>{moment(strikeData.timestamp).utc().format('MMMM Do YYYY, h:mm:ss a')} UTC</Typography>
                    <LightningAlerts lightningAlerts={strikeData} key={`${index + 1}`}/>
                </div>
                
            ))}
        </div>
    );
};

export default withStyles(styles)(LightningLog);
