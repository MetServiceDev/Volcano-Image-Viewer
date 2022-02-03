import React from 'react';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    menuItem: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '50%'
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
        <div className={classes.menuItem}>
            <Typography>{text}</Typography>
            <Switch
              className={classes.switch}
              checked={check}
              onChange={toggle}
              color="primary"
            />
        </div>
    );
};

export default Filter;
