import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { Snackbar, Theme, IconButton } from '@material-ui/core';
import { withStyles, createStyles, WithStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import { Volcano } from '@metservice/aviationtypes';

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        alignItems: 'center'
    },
    link: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1),
    },
});

interface Props extends WithStyles<typeof styles> {
    volcano: Volcano;
    intensity: string;
}

const EruptionPopup: React.FC<Props> = ({ classes, volcano, intensity }) => {
    const [open, setOpen] = React.useState<boolean>(true);

    return (
        <Snackbar open={open} autoHideDuration={6000} className={classes.root}>
            <Alert severity="warning">
                A {intensity} earthquake occured near {volcano.name} today
                <Link
                    className={classes.link}
                    to={`overview?volcano=${volcano.name}`}
                    target='_blank'
                > Check latest imagery</Link>
                <IconButton onClick={() => setOpen(false)} size="small">
                    <CloseIcon/>
                </IconButton>
            </Alert>
        </Snackbar>
    )
};

export default withStyles(styles)(EruptionPopup);
