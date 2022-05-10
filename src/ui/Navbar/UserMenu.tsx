import React from 'react';
import { Menu, MenuItem, Typography, Divider, ListItemText, ListItemIcon, Badge } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CollectionsIcon from '@mui/icons-material/Collections';
import VolcanoIcon from '@mui/icons-material/Volcano';
import SettingsIcon from '@mui/icons-material/Settings';
import MonitorIcon from '@mui/icons-material/Monitor';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { Theme } from '@material-ui/core/styles';

import { AppContext } from '../../AppContext';

const useStyles = makeStyles((theme: Theme) => ({
    menuItem: {
        color: theme.palette.text.secondary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    openMonitor: () => void;
}

const UserMenu: React.FC<Props> = ({ anchorEl, open, handleClose, logout, openSettings, openMonitor }) => {
    const classes = useStyles();
    const { user, toggleVolcat, allVolcats } = React.useContext(AppContext);

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
                <Typography className={classes.header}>{user?.name}</Typography>
            </MenuItem>
            <Divider/>
            <Link to={`/user/${user?.aud}`} className={classes.link}>
                <MenuItem className={classes.menuItem}>
                    <ListItemText>
                        Images
                    </ListItemText>
                    <ListItemIcon>
                        <CollectionsIcon/>
                    </ListItemIcon>
                </MenuItem>
            </Link>
            <MenuItem className={classes.menuItem} onClick={openMonitor}>
                <ListItemText>
                    Monitor
                </ListItemText>
                <ListItemIcon>
                    <MonitorIcon/>
                </ListItemIcon>
            </MenuItem>
            <MenuItem className={classes.menuItem} onClick={() => toggleVolcat(true)}>
                <ListItemText>
                    Volcat
                </ListItemText>
                <ListItemIcon>
                    <Badge badgeContent={allVolcats?.length} color="primary">
                        <VolcanoIcon/>
                    </Badge>
                </ListItemIcon>
            </MenuItem>
            <Divider/>
            <MenuItem className={classes.menuItem} onClick={openSettings}>
                <ListItemText>
                    Settings
                </ListItemText>
                <ListItemIcon>
                    <SettingsIcon/>
                </ListItemIcon>
            </MenuItem>
            <Divider/>
            <MenuItem className={classes.menuItem} onClick={logout}>
                <ListItemText>
                    Logout
                </ListItemText>
                <ListItemIcon>
                        <ExitToAppIcon/>
                </ListItemIcon>
            </MenuItem>
        </Menu>
    )
};

export default UserMenu;
