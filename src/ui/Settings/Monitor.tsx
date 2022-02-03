import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { MenuList, MenuItem, ListItemText, Theme, Select, Divider, Switch, Tooltip, Typography, Paper } from '@material-ui/core';

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

interface Props extends WithStyles<typeof styles> {
}


const MonitorSettings: React.FC<Props> = ({ classes }) => {
    return (
        <MenuList>
            <MenuItem>
                <ListItemText>
                    Poll Interval
                </ListItemText>
                <Select
                    variant='outlined'
                    label="Poll Interval"
                >
                    {[5, 10, 15, 20].map(n =>
                        <MenuItem
                            key={`settings-poll-option-${n}`} 
                            value={n} 
                            style={{cursor:'pointer'}}
                        >
                            {`${n} minutes`}
                        </MenuItem>)}
                </Select>
            </MenuItem>
            <Divider/>
        </MenuList>
    );
};

export default withStyles(styles)(MonitorSettings);
