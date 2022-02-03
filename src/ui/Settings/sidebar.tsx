import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { MenuList, MenuItem, ListItemText, Theme, Typography, Divider, Button } from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import classnames from 'classnames';
import { useOktaAuth } from '@okta/okta-react';
import { redirectUri } from '../../metadata/Endpoints';

import { AppContext } from '../../AppContext';
import { SettingsOptions } from '../../api/settings/headers';

const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '20%',
    },
    header: {
        display: 'flex',
        alignItems: 'center'
    },
    userIcon: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    listText: {
        color: theme.palette.text.secondary
    },
    selectedText: {
        color: theme.palette.primary.main
    },
    bottomSec: {
        position: 'absolute',
        bottom: '0%',
        margin: theme.spacing(1),
        color: theme.palette.text.secondary
    },
    logoutBut: {
        border: `1px solid ${theme.palette.error.main}`,
        textTransform: 'none',
        color: theme.palette.error.main,
    }
});

interface Props extends WithStyles<typeof styles> {
    currentDisplay: SettingsOptions;
    setDisplay: React.Dispatch<React.SetStateAction<SettingsOptions>>;
}

const SettingsSidebar: React.FC<Props> = ({ classes, currentDisplay, setDisplay }) => {
    const { oktaAuth } = useOktaAuth()
    const { user } = React.useContext(AppContext);
    const logout = async (): Promise<void> => await oktaAuth.signOut({postLogoutRedirectUri: redirectUri });

    return (
        <div className={classes.root}>
            <MenuList>
                <div className={classes.header}>
                    <AccountCircleIcon
                        className={classes.userIcon}
                    />
                    <Typography
                        variant="subtitle1"
                    >
                        {user?.name}
                    </Typography>
                </div>
                <Divider/>
                {Object.values(SettingsOptions).map((option) => (
                    <MenuItem
                        key={option}
                        className={classnames(classes.listText, option === currentDisplay && classes.selectedText)}
                        onClick={() => setDisplay(option)}
                    >
                        <ListItemText>
                            {option}
                        </ListItemText>
                    </MenuItem>
                ))}
            </MenuList>
            <div className={classes.bottomSec}>
                    <Typography variant="subtitle2">
                        v2.0.2
                    </Typography>
                <Button
                    className={classes.logoutBut}
                    onClick={logout}
                >
                    Sign out
                </Button>
            </div>
        </div>
    )
};

export default withStyles(styles)(SettingsSidebar);
