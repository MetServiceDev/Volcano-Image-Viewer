import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { Theme } from '@material-ui/core';
import { useSelector } from 'react-redux';

import VolcanoMatrix from './VolcanoMatrix';
import SulfurMaps from './SulfurMaps';
import LightningAlerts from './LightningAlerts';
import VolcanoMap from './VolcanoMap';
import LoaderUI from '../ReusedComponents/LoadingUI';
import { CurrentDisplay } from '../../api/display/headers';
import { AppState } from '../../redux/store';
import { Volcano } from '../../api/volcano/headers';
import { AppContext } from '../../AppContext';
import { LandingPageContext } from './Context';
import useLightningFetch from '../../api/hooks/useLightningFetch';

interface WithLoadingProps {
    polling: boolean;
}

const loadingComponent = (
    <div style={{position: 'fixed', top:'20%', left:'40%'}}>
        <LoaderUI/>
    </div>
)
  
const withLoading = <P extends object>(Component: React.ComponentType<P>) =>
    class WithLoading extends React.Component<P & WithLoadingProps> {
      render() {
        const { polling, ...props } = this.props;
        return !polling ? <Component {...props as P} /> : loadingComponent;
      }
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        cursor: 'pointer',
        position:'absolute',
        right: '0%',
        transition: '0.5s',
        marginTop: theme.spacing(1)
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
        gridTemplateColumns: '0.75fr 0.25fr',
        margin: theme.spacing(0.5)
    }
}));

interface SulfurMap {
    link: string,
    name: string,
    img: string
}

const WithLoadingMatrix = withLoading(VolcanoMatrix);

interface Props {
    sulfurMaps: SulfurMap[],
    volcanoes: Volcano[],
}

const LandingPage: React.FC<Props> = ({ sulfurMaps, volcanoes }) => {
    const classes = useStyles();
    const expand = useSelector((state: AppState) => state.expandSidebar);
    const currentDisplay = useSelector((state: AppState) => state.currentDisplay);
    const [showRefreshWarning, toggleRefreshWarning] = React.useState(true);

    const { lightningAlerts, setAlerts } = useLightningFetch();

    const { polling } = React.useContext(AppContext);

    const style = { width: `${!expand ? '98':'85'}%` };

    const marginTop = currentDisplay !== CurrentDisplay.ALERT_MAP ? '70px' : '0px';

    return (
        <LandingPageContext.Provider value={{ lightningAlerts, setAlerts }}>
            <div className={classes.root} style={style}>
                <div className={classes.headerTags} style={{ marginTop }}>
                    {currentDisplay !== CurrentDisplay.ALERT_MAP && <LightningAlerts/>}
                    {currentDisplay !== CurrentDisplay.ALERT_MAP &&  showRefreshWarning && <Alert severity='warning' className={classes.refreshWarning} 
                        action={<CloseIcon className={classes.minimize} onClick={() => toggleRefreshWarning(false)} />}>
                        This page will poll for new images every 10 minutes
                    </Alert>}
                </div>
                <>
                    {(() => {
                        switch(currentDisplay){
                            case CurrentDisplay.VOLCANO_MATRIX:
                                return <WithLoadingMatrix polling={polling}/>
                            case CurrentDisplay.SULFUR_MAPS:
                                return <SulfurMaps sulfurMaps={sulfurMaps}/>
                            case CurrentDisplay.ALERT_MAP:
                                return <VolcanoMap />
                            default:
                                return
                        }
                    })()}
            </>
            </div>
        </LandingPageContext.Provider>
    );
};

export default LandingPage;
