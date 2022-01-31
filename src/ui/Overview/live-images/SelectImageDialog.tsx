import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { DialogTitle, Dialog, Theme, Divider, Button } from '@material-ui/core';


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
    ImageGrid: JSX.Element;
}

const SelectImageDialog: React.FC<Props> = ({ classes, handleClose, open, ImageGrid }) => (
    <Dialog
        onClose={handleClose}
        open={open}
        classes={{ paper: classes.root }}
        fullWidth={true}
        maxWidth={'md'}
    >
        <DialogTitle>
            Select Images
        </DialogTitle>
        <Divider/>
        {ImageGrid}
        <Button
            onClick={handleClose}
        >
            Sumbit
        </Button>
    </Dialog>
);

export default withStyles(styles)(SelectImageDialog);
