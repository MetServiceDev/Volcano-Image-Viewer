import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { MenuList, MenuItem, ListItemText, Theme, Divider, Switch } from '@material-ui/core';

import { AppContext } from '../../AppContext';

const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.palette.background.default,
    },
    themeIcon: {
        verticalAlign: 'middle'
    },
    filters: {
        marginTop: theme.spacing(1),
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        padding: theme.spacing(1),
    },
    filterSection: {
        padding: theme.spacing(2)
    }
});

interface Props extends WithStyles<typeof styles> {}

enum NavOptionsList {
    ToggleFilters = 'Toggle Filters',
    ToggleGrid = 'Toggle Grid',
    ToggleTheme = 'Toggle Theme',
}

const NavOptions: React.FC<Props> = ({ classes }) => {

    const { navFilterState } = React.useContext(AppContext);

    return (
        <MenuList>
            <MenuItem onClick={() => navFilterState.dispatchNavOption('showNavFilter', NavOptionsList.ToggleFilters, !navFilterState.showNavFilter)}>
                <ListItemText>
                    Show Filters
                </ListItemText>
                <Switch
                    color="primary"
                    checked={navFilterState.showNavFilter}
                />
            </MenuItem>
            <Divider/>
            <MenuItem onClick={() => navFilterState.dispatchNavOption('showNavGrid', NavOptionsList.ToggleGrid, !navFilterState.showNavGrid)}>
                <ListItemText>
                    Show Grid Select
                </ListItemText>
                <Switch
                    color="primary"
                    checked={navFilterState.showNavGrid}
                />
            </MenuItem>
            <Divider/>
            <MenuItem onClick={() => navFilterState.dispatchNavOption('showThemeToggle', NavOptionsList.ToggleTheme, !navFilterState.showThemeToggle)}>
                <ListItemText>
                    Show Theme Toggle
                </ListItemText>
                <Switch
                    color="primary"
                    checked={navFilterState.showThemeToggle}
                />
            </MenuItem>
            <Divider/>
        </MenuList>
    );
};

export default withStyles(styles)(NavOptions);
