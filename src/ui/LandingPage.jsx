import VolcanoMap from './VolcanoMap';
import SulfurMaps from './SulfurMaps';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import LightningAlerts from './LightningAlerts';

const styles = {
    root: {
        marginTop:'80px',
        cursor: 'pointer',
        position:'absolute',
        right: '0%',
        transition: '0.5s'
    },
}

const LandingPage = ({classes, volcanoes, toggle, sulfurMaps, expand}) => {
    const style = {
        width: `${expand ? '98':'85'}%`
    }
    return (
        <div className={classes.root} style={style}>
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
    expand: PropTypes.bool.isRequired,
};

LandingPage.defaultProps = {
    toggle: true,
    expand: false
};

export default withStyles(styles)(LandingPage)