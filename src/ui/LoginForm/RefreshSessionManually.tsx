import React from 'react';
import { DialogTitle, DialogContent, Dialog, Theme, Button, Typography, Divider } from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

const styles = (theme: Theme) => createStyles({
    root: {
        padding: theme.spacing(2),
        textAlign: 'center',
        maxWidth: '480px'
    },
    button: {
        color: theme.palette.error.main,
        border: `1px solid ${theme.palette.error.main}`,
        width: '50%',
        margin: 'auto',
        marginTop: theme.spacing(2)
    },
    icon: {
       margin: 'auto'
    }
});

interface Props extends WithStyles<typeof styles> {
    handleClose: () => void;
    open: boolean;
    refresh: () => void;
};

const RefreshSession: React.FC<Props> = ({ classes, handleClose, open, refresh }) => {
    return (
        <Dialog
            onClose={handleClose}
            open={open}
            classes={{ paper: classes.root }}
            fullWidth={true}
        >
            <DialogTitle>Existing Session!</DialogTitle>
            <Divider />
            <DialogContent>
                <ReportGmailerrorredIcon className={classes.icon} sx={{ fontSize: '64px' }}/>
                <Typography>
                    Old session detected, please refresh
                </Typography>
                <Button
                    className={classes.button}
                    onClick={refresh}
                >
                    Refresh Session
                </Button>
            </DialogContent>
        </Dialog>
    )
};

export default withStyles(styles)(RefreshSession);
