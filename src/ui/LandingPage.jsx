import VolcanoMatrix from './VolcanoMatrix';
import SulfurMaps from './SulfurMaps';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import LightningAlerts from './LightningAlerts';
import { useSelector } from 'react-redux';
import VolcanoMap from './VolcanoMap';
import LoaderUI from './LoadingUI';

function WithLoading(Component) {
    return function WihLoadingComponent({ isLoading, ...props }) {
      if (isLoading) return (<Component {...props} />);
      return (
        <div style={{position: 'fixed', top:'20%', left:'40%'}}>
            <LoaderUI/>
        </div>
      );
    }
};

const styles = {
    root: {
        cursor: 'pointer',
        position:'absolute',
        right: '0%',
        transition: '0.5s'
    },
};

const WithLoadingMatrix = withStyles(styles)(WithLoading(VolcanoMatrix))



const LandingPage = ({classes, sulfurMaps, volcanoes}) => {

    const expand = useSelector(state => state.expandSidebar)
    const currentDisplay = useSelector(state => state.currentDisplay)

    const style = {
        width: `${!expand ? '98':'85'}%`
    };

    return (
        <div className={classes.root} style={style}>
            {currentDisplay !== 'ALERT_MAP' && <div style={{marginTop:'70px'}}><LightningAlerts/></div>}
            {(() => {
                switch(currentDisplay){
                    case 'VOLCANO_MATRIX':
                        return <WithLoadingMatrix volcanoes={volcanoes} isLoading={volcanoes.length > 0 ? true : false}/>
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
    sulfurMaps: PropTypes.array.isRequired,
    volcanoes: PropTypes.array.isRequired,
};

export default withStyles(styles)(LandingPage)