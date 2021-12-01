import React from 'react';
import { TextField, Button, IconButton, Tooltip } from '@material-ui/core';
import { Theme } from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import LockIcon from '@mui/icons-material/Lock';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';

const styles = (theme:Theme) => createStyles({
    root: {
    },
    textField: {
        width: '90%',
        backgroundColor: theme.palette.background.default
    },
    button: {
        backgroundColor: theme.palette.primary.dark,
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
        marginLeft: theme.spacing(1),
        width: '9%',
        textTransform: 'none',
    },
    icons: {
        display: 'flex'
    }
});

interface Props extends WithStyles<typeof styles> {}

const Notes: React.FC<Props> = ({ classes }) => {

    const [disabled, toggleDisabled] = React.useState<boolean>(false);

    const iconButton = (icon: JSX.Element, title: string, action: () => void) => {
        return (
            <Tooltip title={title} arrow>
                <IconButton onClick={action}>
                    {icon}
                </IconButton>
            </Tooltip>
        )
    }

    return (
        <div className={classes.root}>
            <div className={classes.icons}>
                {iconButton(<LockIcon fontSize='small'/>, 'Disable', () => toggleDisabled(!disabled))}
                {iconButton(<SpeakerNotesOffIcon fontSize='small'/>, 'Hide notes', () => null)}
            </div>
            <TextField
                disabled={disabled}
                variant='outlined'
                className={classes.textField}
                label='New Note'
                multiline={true}
            />
            <Button
                className={classes.button}
                disabled={disabled}
            >
                Post
            </Button>
        </div>
    )
};

export default withStyles(styles)(Notes);
