import VolcanoMap from './VolcanoMap';
import SulfurMaps from './SulfurMaps';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import LightningAlerts from './LightningAlerts';

const styles = {
    root: {
        width:'85%',
        marginTop:'80px',
        cursor: 'pointer',
        position:'absolute',
        right: '0%'
    },
}

const LandingPage = ({classes, volcanoes, toggle, sulfurMaps}) => {
    return (
        <div className={classes.root}>
            <LightningAlerts/>
            {toggle ? <VolcanoMap volcanoes={volcanoes}/> : <SulfurMaps sulfurMaps={sulfurMaps}/>}
        </div>
    )
};

LandingPage.propTypes = {
    classes: PropTypes.object.isRequired,
    volcanoes: PropTypes.array.isRequired,
    toggle: PropTypes.bool.isRequired,
    sulfurMaps: PropTypes.array.isRequired,
};

LandingPage.defaultProps = {
    toggle: true
};

export default withStyles(styles)(LandingPage)