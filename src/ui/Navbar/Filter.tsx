import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    menuItem: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },
    switch: {
    },
}));

interface Props {
  check: boolean,
  toggle: () => void,
  text: string
}

const Filter: React.FC<Props> = ({ check, toggle, text }) => {
    const classes = useStyles();
    return (
        <MenuItem className={classes.menuItem}>
            <Typography>{text}</Typography>
            <Switch
              className={classes.switch}
              checked={check}
              onChange={toggle}
              color="primary"
            />
        </MenuItem>
    );
};

export default Filter;
