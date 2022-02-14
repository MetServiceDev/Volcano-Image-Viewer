import React from 'react';
import moment from 'moment';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Theme, Typography, IconButton, Button, CircularProgress } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SyncIcon from '@mui/icons-material/Sync';

import { imageBucket } from '../../metadata/Endpoints';
import { AppContext } from '../../AppContext';
import { RecentScanStatus } from '../../api/settings/headers';

const styles = (theme: Theme) => createStyles({
    header: {
        fontSize: '14px'
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
});

interface Props extends WithStyles<typeof styles> {}

const ImageScanLog: React.FC<Props> = ({ classes }) => {
    const { volcanoes, fetchLinks, polling } = React.useContext(AppContext);

    const [recentStatus, setStatus] = React.useState<RecentScanStatus | null>(null);

    const [showImages, toggleImages] = React.useState<boolean>(false);

    React.useEffect(() => {
        fetch(`${imageBucket}/status.json`)
            .then((res) => res.json())
            .then((data) => setStatus(data));
    }, []);

    const formatImageString = (imageTag: string) => {
        const imgSplit = imageTag.split('.')
        const code = `${imgSplit[4]}.${imgSplit[5]}`;
        const volcano = volcanoes.find((v) => v.code === code);
        return `${volcano?.name} - ${imgSplit[2]} `;
    }

    const toggleIcon = (
        <IconButton
            onClick={() => toggleImages(!showImages)}
            size='small'
        >
            {showImages ? <ArrowDropDownIcon/> : <ArrowLeftIcon/>}
        </IconButton>
    );

    const successComponent = (
        <>
            <Typography
                variant="body1"
                className={classes.header}
            >
                Fetched {recentStatus?.newImages?.length} new images {toggleIcon}
            </Typography>
            <div>
                {showImages && recentStatus?.newImages?.map((image: string) =>
                    <Typography
                        key={image}
                        variant="body2"
                        className={classes.tag}
                    >
                        {formatImageString(image)}
                    </Typography>
                )}
            </div>
        </>
    )

    if (recentStatus) {
        return (
            <div>
                <Alert severity={recentStatus.status}>
                    <AlertTitle>
                        <strong>{recentStatus.status}</strong>: Last scan@<strong>{moment(recentStatus.timestamp).format('HH:mm DD/MM')}</strong>
                    </AlertTitle>
                    {recentStatus.newImages ? successComponent :
                        <Typography variant="body1" className={classes.header}>
                            {recentStatus.msg}
                        </Typography>}
                </Alert>
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
