import React from 'react';
import { Theme, Typography, IconButton, Divider, Button } from '@material-ui/core';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MapIcon from '@mui/icons-material/Map';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import Alert from '@material-ui/lab/Alert';
import { AppContext } from '../../AppContext';
import VolcatDialogMap from './VolcatDialogMap';

const styles = (theme:Theme) => createStyles({
    root: {},
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
    secondaryHeader: {
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(2)
    },
    content: {
        margin: theme.spacing(2),
        height: '70vh',
        overflow: 'auto'
    },
    acceptButton: {
        backgroundColor: theme.palette.success.main,
        '&:hover': {
            backgroundColor: theme.palette.success.dark,
        }
    },
    bottomMenu: {
       margin: theme.spacing(2),
       display: 'flex',
       justifyContent: 'flex-end'
    },
    headerTag: {
        display: 'flex',
        alignItems: 'center'
    }
});

interface Props extends WithStyles<typeof styles> {
    handleClose: () => void;
};

const SelectedVolcat: React.FC<Props> = ({ classes, handleClose }) => {
    const { selectedVolcat, setVolcat } = React.useContext(AppContext);

    const [showMap, toggleMap] = React.useState<boolean>(false);

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classes.headerTag}>
                    <IconButton onClick={() => setVolcat(null)}>
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Typography variant="h5">
                        {selectedVolcat?.header}
                    </Typography>
                </div>
                <IconButton
                    onClick={() => toggleMap(true)}
                    title="Show Coordinates"
                >
                    <MapIcon />
                </IconButton>
            </div>
            <Divider/>
            <Alert severity="warning" className={classes.content}>
                {selectedVolcat?.content?.split('\n').map((string: string) => (
                    <>
                        <Typography variant="body2">
                            {string}
                        </Typography>
                        <br/>
                    </>
                ))}
            </Alert>
            <div className={classes.bottomMenu}>
                <Button
                    className={classes.acceptButton}
                    onClick={() => {
                        setVolcat(null);
                        handleClose();
                    }}
                >
                    Acknowledge
                </Button>
            </div>
            <VolcatDialogMap
                open={showMap}
                header={selectedVolcat?.header}
                coordinates={selectedVolcat?.coordinates}
                handleClose={() => toggleMap(false)}
            />
        </div>
    )
};

export default withStyles(styles)(SelectedVolcat);
