import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { DialogTitle, Dialog, Theme, Button, Typography, DialogContent, DialogActions } from '@material-ui/core';


const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.palette.background.default,
    },
    img: {
        width: '100%',
    },
    button: {
        border: `1px solid ${theme.palette.primary.main}`,
        textTransform: 'none',
        color: theme.palette.primary.main,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    imgGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr'  
    }
});

interface Props extends WithStyles<typeof styles> {
    handleClose: () => void;
    open: boolean;
    imgList: string[];
    confirm: () => void;
}

const DeleteConfirmationDialog: React.FC<Props> = ({ classes, handleClose, open, imgList, confirm }) => {
    return(
        <Dialog
            onClose={handleClose}
            open={open}
            classes={{ paper: classes.root }}
            fullWidth={true}
            maxWidth={'md'}
        >
            <DialogTitle>
                Are you sure you want to delete the following files
            </DialogTitle>
            <DialogContent dividers>
                {imgList.map((img) => <Typography key={img} variant="subtitle2">{img}</Typography>)}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={() => handleClose()}>
                    Cancel
                </Button>
                <Button onClick={() => {confirm(); handleClose()}}>Ok</Button>
          </DialogActions>
        </Dialog>
    );
}

export default withStyles(styles)(DeleteConfirmationDialog);

