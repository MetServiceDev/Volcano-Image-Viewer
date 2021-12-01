import React from 'react';
import { Menu, MenuItem, Typography, Divider } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GridViewIcon from '@mui/icons-material/GridView';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Theme } from '@material-ui/core/styles';

import { User } from '../../api/User/headers';
import { AppState } from '../../redux/store';

const useStyles = makeStyles((theme: Theme) => ({
    menuItem: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        color: theme.palette.text.secondary
    },
    header: {
        fontWeight: 'bold',
        color: theme.palette.text.primary
    },
    link: {
        color: theme.palette.text.secondary,
        textDecoration: 'none'
    }
}));

interface Props {
    anchorEl: null | HTMLElement,
    open: boolean,
    handleClose: () => void,
    logout: () => Promise<void>;
}

const UserMenu: React.FC<Props> = ({ anchorEl, open, handleClose, logout }) => {
    const classes = useStyles();
    const login = useSelector((state:AppState) => state.login) as User || {};

    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem className={classes.menuItem}>
                <Typography className={classes.header}>Signed in as {login.name}</Typography>
            </MenuItem>
            <Divider/>
            <Link to={`/user/${login.aud}`} className={classes.link}>
                <MenuItem className={classes.menuItem}>
                    <Typography>Dashboard</Typography>
                    <GridViewIcon/>
                </MenuItem>
            </Link>
            <MenuItem className={classes.menuItem} onClick={logout}>
                <Typography>Logout</Typography>
                <ExitToAppIcon/>
            </MenuItem>
        </Menu>
    )
};

export default UserMenu;
