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

const LandingPage = ({classes, volcanoes, sulfurMaps}) => {

    const expand = useSelector(state => state.expandSidebar)
    const currentDisplay = useSelector(state => state.currentDisplay)

    const style = {
        width: `${!expand ? '98':'85'}%`
    };
    return (
        <div className={classes.root} style={style}>
            <LightningAlerts/>
            {(() => {
                switch(currentDisplay){
                    case 'VOLCANO_MATRIX':
                        return <VolcanoMatrix volcanoes={volcanoes}/>
                    case 'SULFUR_MAPS':
                        return <SulfurMaps sulfurMaps={sulfurMaps}/>
                    case 'ALERT_MAP':
                        return <VolcanoMap volcanoes={volcanoes}/>
                    default:
                        return
                }
            })()}            
        </div>
    );
};

LandingPage.propTypes = {
    classes: PropTypes.object.isRequired,
    volcanoes: PropTypes.array.isRequired,
    sulfurMaps: PropTypes.array.isRequired,
};

export default withStyles(styles)(LandingPage)