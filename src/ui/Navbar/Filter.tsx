import React from 'react';
import { FormControlLabel , Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    menuItem: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '70%'
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
        <FormControlLabel
            control={
                <Switch
                    className={classes.switch}
                    checked={check}
                    onChange={toggle}
                    color="primary"
                />}
            label={text}
        />
    );
};

export default Filter;
