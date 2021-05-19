import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/styles';

const styles = {
    menuItem: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
    },
    switch: {
        position:'absolute',
        left:'70%'
    },
}

const theme = createMuiTheme({
    overrides: {
      MuiSwitch: {
        switchBase: {
          color: "white"
        },
        colorSecondary: {
          "&$checked": {
            color: "#ffbb00"
          }
        },
        track: {
          opacity: 0.2,
          backgroundColor: "#ffbb00",
          "$checked$checked + &": {
            opacity: 0.7,
            backgroundColor: "#ffbb00"
          }
        }
      }
    }
});

const Filter = ({classes, check, toggle, text}) => {
    return (
        <MenuItem className={classes.menuItem}><Typography>{text}</Typography>
            <ThemeProvider theme={theme}><Switch className={classes.switch} checked={check} onChange={toggle}/></ThemeProvider>
        </MenuItem>
    );
};

Filter.propTypes = {
    classes:PropTypes.object,
    check:PropTypes.bool.isRequired,
    toggle:PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
};

export default withStyles(styles)(Filter);
