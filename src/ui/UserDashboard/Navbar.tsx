import React from 'react';
import { WithStyles, withStyles, createStyles } from '@material-ui/core/styles';
import { Typography, Tooltip, Theme, IconButton } from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor:theme.palette.background.default,
        width:'100%',
        position:'fixed',
        padding:theme.spacing(1),
        borderBottom: `1px solid ${theme.palette.primary.dark}`,
        zIndex: 5,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    homeIcon: {
        marginRight: theme.spacing(1),
        float:'left'
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
        opacity:'0.7',
        transition: '0.5s',
        cursor: 'pointer',
        textAlign: 'center',
        '&:hover': {
            opacity:'1',
        }
    },
    userText: {
        display: 'flex',
        marginRight: theme.spacing(4),
    },
})

interface Props extends WithStyles<typeof styles> {
    username: string;
}

const Navbar: React.FC<Props> = ({ classes, username }) => {
    return (
        <div className={classes.root}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Link className={classes.link} to='/'>
                    <Tooltip title="Return to overview" arrow>
                        <IconButton className={classes.homeIcon} aria-label="return home">
                            <HomeIcon/>
                        </IconButton>
                    </Tooltip>
                </Link>
                <Typography variant='h5'>
                    Saved Images
                </Typography>
            </div>
            <Typography className={classes.userText}>
                <AccountCircleIcon style={{marginRight: '5px' }}/> {username}
            </Typography>
        </div>
    )
};

export default withStyles(styles)(Navbar);
