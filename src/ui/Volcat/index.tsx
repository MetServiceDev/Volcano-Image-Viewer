import React from 'react';
import { Dialog, Slide, AppBar, Toolbar, Typography, IconButton, Theme } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';

import SelectedVolcat from './SelectedVolcat';
import { AppContext } from '../../AppContext';
import VolcatHeader from './VolcatHeader';
import NoVolcats from './NoVolcatsMessage';

const styles = (theme:Theme) => createStyles({
    root: {},
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    volcatWrapper: {
        position: 'absolute',
        top: '10%',
        width: '100%'
    },
    toolbarHeader: {
        fontWeight: 'bold'
    }
})

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

interface Props extends WithStyles<typeof styles> {
    open: boolean;
    handleClose: () => void;
}

const VolcatWindow: React.FC<Props> = ({ classes, open, handleClose }) => {
    const { selectedVolcat, allVolcats, setVolcat } = React.useContext(AppContext);

    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar>
                    <Toolbar className={classes.toolbar}>
                        <Typography className={classes.toolbarHeader}>
                            VOLCAT Event Dashboard
                        </Typography>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={() => {
                                setVolcat(null);
                                handleClose();
                            }}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div className={classes.volcatWrapper}>
                    {allVolcats?.length === 0 && <NoVolcats />}
                    {selectedVolcat && !selectedVolcat.viewed ?
                        <SelectedVolcat
                            handleClose={handleClose}
                        /> :
                        allVolcats?.map((volcat: any) =>
                            <VolcatHeader
                                key={volcat?.id}
                                volcat={volcat}
                            />
                    )}
                </div>
            </Dialog>
        </div>
    );
};

export default withStyles(styles)(VolcatWindow);;
