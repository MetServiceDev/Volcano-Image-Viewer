import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { MenuList, MenuItem, ListItemText, Theme, Typography, Divider } from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import classnames from 'classnames';

import { AppContext } from '../../AppContext';
import { MonitorOptions } from '../../api/monitor/headers';

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
    currentDisplay: MonitorOptions;
    setDisplay: React.Dispatch<React.SetStateAction<MonitorOptions>>;
}

const MonitorSidebar: React.FC<Props> = ({ classes, currentDisplay, setDisplay }) => {
    const { user } = React.useContext(AppContext);

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
                {Object.values(MonitorOptions).map((option) => (
                    <MenuItem
                        key={option}
                        className={classnames(classes.listText, option === currentDisplay && classes.selectedText)}
                        onClick={() => setDisplay(option)}
                        selected={currentDisplay === option}
                    >
                        <ListItemText>
                            {option}
                        </ListItemText>
                    </MenuItem>
                ))}
            </MenuList>
        </div>
    )
};

export default withStyles(styles)(MonitorSidebar);
