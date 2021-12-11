import React from 'react';
import { TextField, Button, IconButton, Tooltip, Paper, Typography, Chip, Theme } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import LockIcon from '@mui/icons-material/Lock';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
import ImageIcon from '@mui/icons-material/Image';
import moment from 'moment';

import { Note } from '../../../api/volcano/headers';

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
        height: 54
    },
    icons: {
        display: 'flex'
    },
    disabled: {
        marginLeft: theme.spacing(1),
        width: '9%',
        textTransform: 'none',
        height: 54 
    },
    notesMenu: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    notesPanel: {
        marginTop: theme.spacing(2),
        backgroundColor: theme.palette.background.default,
        height: '60vh'
    }
});

interface Props extends WithStyles<typeof styles> {
    notes: Note[];
    openDialog: () => void;
    selectedImages: string[];
}

const Notes: React.FC<Props> = ({ classes, notes, openDialog, selectedImages }) => {

    const [disabled, toggleDisabled] = React.useState<boolean>(false);

    const iconButton = (icon: JSX.Element, title: string, action: () => void) => {
        return (
            <Tooltip title={title} arrow>
                <IconButton onClick={action}>
                    {icon}
                </IconButton>
            </Tooltip>
        )
    };

    let currentStyleClass = disabled ? classes.disabled : classes.button;

    const renderNote = (note: Note) => {
        const localTime = moment(note.postedTime).toLocaleString()
        return (
            <div>
                <Typography>{moment(localTime).format('Do MMM HH:MM')}</Typography>
                <Typography>{note.content}</Typography>
                <Typography>{note.postedBy}</Typography>
            </div>
        )
    }

    return (
        <div className={classes.root}>
            <div className={classes.notesMenu}>
                <Stack direction="row" spacing={1}>
                    {selectedImages.map(image => <Chip label={image}/>)}
                </Stack>
                <div className={classes.icons}>
                    {iconButton(<ImageIcon fontSize='small'/>, 'Attach image', openDialog)}        
                    {iconButton(<SpeakerNotesOffIcon fontSize='small'/>, 'Hide notes', () => null)}
                    {iconButton(<LockIcon fontSize='small'/>, disabled ? 'Enable' : 'Disable', () => toggleDisabled(!disabled))}   
                </div>
            </div>
            <TextField
                disabled={disabled}
                variant='outlined'
                className={classes.textField}
                label='New Note'
                multiline={true}
            />
            <Button
                className={currentStyleClass}
                disabled={disabled}
            >
                Post
            </Button>
            <Paper className={classes.notesPanel}>
                {notes.map(note => renderNote(note))}
            </Paper>
        </div>
    )
};

export default withStyles(styles)(Notes);
