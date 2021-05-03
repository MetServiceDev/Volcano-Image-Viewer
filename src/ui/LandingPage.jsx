import VolcanoMap from './VolcanoMap';
import SulfurMaps from './SulfurMaps';
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        width:'85%',
        marginTop:'80px',
        cursor: 'pointer',
        position:'absolute',
        right: '0%'
    },
}

const LandingPage = ({classes, volcanoes, toggle}) => {
    return (
        <div className={classes.root}>
            {toggle ? <VolcanoMap volcanoes={volcanoes}/> : <SulfurMaps/>}
        </div>
    )
};

export default withStyles(styles)(LandingPage)