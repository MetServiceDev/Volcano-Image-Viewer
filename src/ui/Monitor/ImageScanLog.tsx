import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Theme, Typography, Button, CircularProgress } from '@material-ui/core';
import SyncIcon from '@mui/icons-material/Sync';

import { imageBucket } from '../../metadata/Endpoints';
import { AppContext } from '../../AppContext';
import { RecentScanStatus } from '../../api/settings/headers';
import StatusPanel from './StatusPanel';

const styles = (theme: Theme) => createStyles({
    header: {
        fontSize: '14px'
    },
    statusPanel: {
        marginTop: theme.spacing(1),
    },
    tag: {
        fontSize: '12px',
        marginBottom: theme.spacing(0.5)
    },
    bottomSec: {
        position: 'absolute',
        bottom: '0%',
        margin: theme.spacing(1),
    },
    syncButton: {
        textTransform: 'none',
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main 
    },
    loader: {
        verticalAlign:'middle',
        marginLeft:'10px',
        color: theme.palette.primary.main
    },
    text: {
        verticalAlign: 'middle',
        display: 'inline',
        marginLeft:'10px'
    },
    panels: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr'
    }
});

interface Props extends WithStyles<typeof styles> {}

const ImageScanLog: React.FC<Props> = ({ classes }) => {
    const { fetchLinks, polling } = React.useContext(AppContext);

    const [gnsStatus, setStatus] = React.useState<RecentScanStatus | null>(null);
    const [vanuatuStatus, setVanuStatus] = React.useState<RecentScanStatus | null>(null);

    React.useEffect(() => {
        fetch(`${imageBucket}/status.json`)
            .then((res) => res.json())
            .then((data) => setStatus(data));
        fetch(`${imageBucket}/vanu-status.json`)
            .then((res) => res.json())
            .then((data) => setVanuStatus(data));
    }, []);

    if (gnsStatus && vanuatuStatus) {
        return (
            <div>
                <div className={classes.panels}>
                    <StatusPanel
                        title="GNS Image Poller"
                        status={gnsStatus as RecentScanStatus}
                    />
                    <StatusPanel
                        title="Vanuatu Image Poller"
                        status={vanuatuStatus as RecentScanStatus}
                    />
                </div>
                <div className={classes.bottomSec}>
                    {!polling ? <Button
                        className={classes.syncButton}
                        onClick={() => fetchLinks()}
                    >
                        Sync
                        <SyncIcon/>
                    </Button>:
                    <>
                        <CircularProgress size={24} className={classes.loader}/>
                        <Typography className={classes.text}>synchronizing</Typography>
                    </>}
                </div>
            </div>
        )
    };

    return (
        <Typography variant="body1">
            Loading status
        </Typography>
    )
    
};

export default withStyles(styles)(ImageScanLog);
