import React from 'react';
import { Menu, MenuItem, Typography, Divider } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GridViewIcon from '@mui/icons-material/GridView';
import SettingsIcon from '@mui/icons-material/Settings';

import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { Theme } from '@material-ui/core/styles';

import { AppContext } from '../../AppContext';

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
    openSettings: () => void;
}

const UserMenu: React.FC<Props> = ({ anchorEl, open, handleClose, logout, openSettings }) => {
    const classes = useStyles();
    const { user } = React.useContext(AppContext);

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
                <Typography className={classes.header}>Signed in as {user?.name}</Typography>
            </MenuItem>
            <Divider/>
            <Link to={`/user/${user?.aud}`} className={classes.link}>
                <MenuItem className={classes.menuItem}>
                    <Typography>Dashboard</Typography>
                    <GridViewIcon/>
                </MenuItem>
            </Link>
            <MenuItem className={classes.menuItem} onClick={openSettings}>
                <Typography>Settings</Typography>
                <SettingsIcon/>
            </MenuItem>
            <Divider/>
            <MenuItem className={classes.menuItem} onClick={logout}>
                <Typography>Logout</Typography>
                <ExitToAppIcon/>
            </MenuItem>
        </Menu>
    )
};

export default UserMenu;
