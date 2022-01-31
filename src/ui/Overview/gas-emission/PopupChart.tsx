import React from 'react';
import { DialogTitle, Dialog, Theme, Button, Typography } from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.palette.background.default,
        maxWidth: '80%'
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
    }
});

interface Props extends WithStyles<typeof styles> {
    src: string;
    handleClose: () => void;
    open: boolean;
    title: string;
    download: () => void;
}

const PopupChart: React.FC<Props> = ({ classes, src, handleClose, open, title, download }) => (
    <Dialog
        onClose={handleClose}
        open={open}
        classes={{ paper: classes.root }}
        fullWidth={true}
        maxWidth={'md'}
    >
        <DialogTitle>
            <div className={classes.header}>
                <Typography variant="h4">{title}</Typography>
                <Button className={classes.button} onClick={download}>
                    Export to CSV
                </Button>
            </div>
        </DialogTitle>
        
        <img
            src={src}
            alt={title}
            className={classes.img}
        />
    </Dialog>
);

export default withStyles(styles)(PopupChart);
