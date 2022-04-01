import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { DialogTitle, Dialog, Theme, Divider, DialogContent } from '@material-ui/core';
import { SettingsOptions } from '../../api/settings/headers';
import ImageScanLog from './ImageScanLog';

const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '70vh',
        maxWidth: '780px'
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(0)
    },
    innerContent: {
        width: '100%',
        padding: theme.spacing(1)
    }
});

interface Props extends WithStyles<typeof styles> {
    handleClose: () => void;
    open: boolean;
}

const MonitorDialog: React.FC<Props> = ({ classes, handleClose, open }) => {
    const [currentDisplay, setDisplay] = React.useState<SettingsOptions>(SettingsOptions.Display);

    return(
        <Dialog
            onClose={handleClose}
            open={open}
            classes={{ paper: classes.root }}
            fullWidth={true}
            maxWidth={'md'}
        >
            <DialogTitle>
                Monitor
            </DialogTitle>
            <Divider/>
            <DialogContent className={classes.content}>
                <div className={classes.innerContent}>
                    {(() => {
                        switch(currentDisplay){
                            case SettingsOptions.Display:
                                return <ImageScanLog />
                        }
                    })()}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default withStyles(styles)(MonitorDialog);
