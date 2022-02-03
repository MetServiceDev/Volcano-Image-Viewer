import React from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { InputAdornment, IconButton, Typography } from '@material-ui/core';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import MapToggle from './MapToggle';
import { Volcano } from '../../api/volcano/headers';
import UserMenu from './UserMenu';
import SettingsDialog from '../Settings';
import { AppContext } from '../../AppContext';

const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor:theme.palette.background.default,
        width:'100%',
        position:'fixed',
        padding: theme.spacing(1),
        borderBottom: `1px solid ${theme.palette.primary.dark}`,
        zIndex: 5,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchFilter: {
        width: '40%',
        display: 'flex',
    },
    searchField: {
        width:'100%',
        margin: 'auto',
        backgroundColor: theme.palette.background.paper,
    },
    rightSide: {
        marginRight: theme.spacing(2),
        display: 'flex',
        alignItems: 'center'
    }
});

interface Props extends WithStyles<typeof styles> {
    logout: () => Promise<void>;
    theme: boolean;
    toggleTheme: () => void;
    volcanoes: Volcano[];
    openVolcano: (e: any, val: any) => void
}

const Navbar: React.FC<Props> = ({ classes, logout, theme, toggleTheme, volcanoes, openVolcano }) => {
    const volcanoLabels = volcanoes.map(volcano => volcano.name);
    const { user } = React.useContext(AppContext);

    const [userAnchorEl, setUserAnchorEl] = React.useState<null | HTMLElement>(null);
    const openUser = Boolean(userAnchorEl);
    const handleUserClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setUserAnchorEl(event.currentTarget);
    };

    const handleUserClose = () => setUserAnchorEl(null);

    const [openSettings, toggleSettings] = React.useState<boolean>(false);

    return (
        <div className={classes.root}>
            <MapToggle/>
            <div className={classes.searchFilter}>
                <Autocomplete
                    className={classes.searchField}
                    id="navbar-search"
                    options={volcanoLabels}
                    onChange={openVolcano}
                    renderInput={(params) => <TextField
                        {...params}
                        label="Search"
                        size='small'
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            ),
                        }}
                    />}
                />
            </div>
            <div>
                <div className={classes.rightSide}>
                    <Typography variant="subtitle2">{user?.name}</Typography>
                    <AccountCircleIcon/>
                    <IconButton
                        onClick={handleUserClick}
                        size='small'
                    >
                        <ArrowDropDownIcon/>
                    </IconButton>
                </div>
                <UserMenu
                    anchorEl={userAnchorEl}
                    open={openUser}
                    handleClose={handleUserClose}
                    logout={logout}
                    openSettings={() => toggleSettings(true)}
                />
            </div>
            <SettingsDialog
                open={openSettings}
                theme={theme}
                toggleTheme={toggleTheme}
                handleClose={() => toggleSettings(false)}
            />
        </div>
    );
};

export default withStyles(styles)(Navbar);
