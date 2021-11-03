import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    menuItem: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
    },
    switch: {
        position:'absolute',
        left:'70%'
    },
}));

// const theme = createMuiTheme({
//     overrides: {
//       MuiSwitch: {
//         switchBase: {
//           color: "white"
//         },
//         colorSecondary: {
//           "&$checked": {
//             color: "#ffbb00"
//           }
//         },
//         track: {
//           opacity: 0.2,
//           backgroundColor: "#ffbb00",
//           "$checked$checked + &": {
//             opacity: 0.7,
//             backgroundColor: "#ffbb00"
//           }
//         }
//       }
//     }
// });

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
