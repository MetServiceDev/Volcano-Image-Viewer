import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { DialogTitle, Dialog, Theme, Divider, DialogContent } from '@material-ui/core';
import SettingsSidebar from './sidebar';
import { SettingsOptions } from '../../api/settings/headers';
import Appearance from './Appearance';

const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '70vh'
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(0)
    },
    innerContent: {
        width: '100%',
        padding: theme.spacing(2)
    }
});

interface Props extends WithStyles<typeof styles> {
    handleClose: () => void;
    open: boolean;
    theme: boolean;
    toggleTheme: () => void;
}

const SettingsDialog: React.FC<Props> = ({ classes, handleClose, open, theme, toggleTheme }) => {
    const [currentDisplay, setDisplay] = React.useState<SettingsOptions>(SettingsOptions.Appearance);

    return(
        <Dialog
            onClose={handleClose}
            open={open}
            classes={{ paper: classes.root }}
            fullWidth={true}
            maxWidth={'md'}
        >
            <DialogTitle>
                Settings
            </DialogTitle>
            <Divider/>
            <DialogContent className={classes.content}>
                <SettingsSidebar
                    currentDisplay={currentDisplay}
                    setDisplay={setDisplay}
                />
                <div className={classes.innerContent}>
                    {(() => {
                        switch(currentDisplay){
                            case SettingsOptions.Appearance:
                                return <Appearance
                                            theme={theme}
                                            toggleTheme={toggleTheme}
                                        />
                        }
                    })()}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default withStyles(styles)(SettingsDialog);
