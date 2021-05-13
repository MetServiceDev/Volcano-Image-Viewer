import VolcanoMatrix from './VolcanoMatrix';
import SulfurMaps from './SulfurMaps';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import LightningAlerts from './LightningAlerts';
import { useSelector } from 'react-redux';
import VolcanoMap from './VolcanoMap';

const styles = {
    root: {
        marginTop:'70px',
        cursor: 'pointer',
        position:'absolute',
        right: '0%',
        transition: '0.5s'
    },
}

const LandingPage = ({classes, volcanoes, toggle, sulfurMaps}) => {

    const expand = useSelector((state) => state.expandSidebar)

    const style = {
        width: `${!expand ? '98':'85'}%`
    };
    return (
        <div className={classes.root} style={style}>
            <VolcanoMap volcanoes={volcanoes}/>
            
        </div>
    );
};

LandingPage.propTypes = {
    classes: PropTypes.object.isRequired,
    volcanoes: PropTypes.array.isRequired,
    toggle: PropTypes.bool.isRequired,
    sulfurMaps: PropTypes.array.isRequired,
};

LandingPage.defaultProps = {
    toggle: true,
};

export default withStyles(styles)(LandingPage)