import VolcanoMatrix from './VolcanoMatrix';
import SulfurMaps from './SulfurMaps';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import LightningAlerts from './LightningAlerts';
import { useSelector } from 'react-redux';
import VolcanoMap from './VolcanoMap';
import LoaderUI from './LoadingUI';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { useState } from 'react';

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
    refreshWarning: {
        marginLeft:'10px',
        fontSize:'12px',
        boxShadow: '1px 1px 2px #404040',
    },
    minimize: {
        position: 'relative',
        cursor: 'pointer'
    },
    headerTags: {
        display:'grid',
        gridTemplateColumns: '0.75fr 0.25fr'
    }
};

const WithLoadingMatrix = WithLoading(VolcanoMatrix);



const LandingPage = ({classes, sulfurMaps, volcanoes}) => {

    const expand = useSelector(state => state.expandSidebar);
    const currentDisplay = useSelector(state => state.currentDisplay);
    const [showRefreshWarning, toggleRefreshWarning] = useState(true);

    const style = {
        width: `${!expand ? '98':'85'}%`
    };

    const marginTop = currentDisplay !== 'ALERT_MAP' ? '70px' : '0px'

    return (
        <div className={classes.root} style={style}>
            <div className={classes.headerTags} style={{marginBottom:'10px',marginTop:marginTop}}>
                {currentDisplay !== 'ALERT_MAP' && <div ><LightningAlerts/></div>}
                {currentDisplay !== 'ALERT_MAP' &&  showRefreshWarning && <Alert severity='warning' className={classes.refreshWarning} 
                    action={<CloseIcon className={classes.minimize} onClick={()=>{toggleRefreshWarning(false)}}/>}>
                    This page refreshes every 10 minutes
                </Alert>}
            </div>
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