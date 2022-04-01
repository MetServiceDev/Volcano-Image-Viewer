import React from 'react';
import moment from 'moment';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Theme, Typography, IconButton, Divider } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { RecentScanStatus } from '../../api/settings/headers';
import { AppContext } from '../../AppContext';

const styles = (theme: Theme) => createStyles({
    root: {
        margin: theme.spacing(1),
    },
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
});

interface Props extends WithStyles<typeof styles> {
    status: RecentScanStatus;
    title: string;
}

const StatusPanel: React.FC<Props> = ({ classes, status, title }) => {
    const { volcanoes } = React.useContext(AppContext);
    const [showImages, toggleImages] = React.useState<boolean>(false);

    const formatImageString = (imageTag: string) => {
        const imgSplit = imageTag.split('.')
        const code = `${imgSplit[4]}.${imgSplit[5]}`;
        const volcano = volcanoes.find((v) => v.code === code);
        if (volcano) {
            return `${volcano?.name} - ${imgSplit[2]} `;
        }
        return imageTag;
    }

    const toggleIcon = (
        <IconButton
            onClick={() => toggleImages(!showImages)}
            size='small'
        >
            {showImages ? <ArrowDropDownIcon/> : <ArrowLeftIcon/>}
        </IconButton>
    )

    return (
        <div className={classes.root}>
            <Typography variant="body1">{title}</Typography>
            <Divider />
            <Alert severity={status.status} className={classes.statusPanel}>
                <AlertTitle>
                    <strong>{status?.status}</strong>: Last scan@<strong>{moment(status?.timestamp).format('HH:mm DD/MM')}</strong>
                </AlertTitle>
                {status?.newImages ?
                    <>
                        <Typography
                            variant="body1"
                            className={classes.header}
                        >
                            Fetched {status?.newImages?.length} new images {toggleIcon}
                        </Typography>
                        <div>
                            {showImages && status?.newImages?.map((image: string) =>
                                <Typography
                                    key={image}
                                    variant="body2"
                                    className={classes.tag}
                                >
                                    {formatImageString(image)}
                                </Typography>
                            )}
                        </div>
                    </> :
                    <Typography variant="body1" className={classes.header}>
                        {status?.msg}
                    </Typography>}
            </Alert>
        </div>
    )
};

export default withStyles(styles)(StatusPanel);
