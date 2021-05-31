import Alert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import ReplayIcon from '@material-ui/icons/Replay';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { handleLightningAlerts } from '../../redux/actions';
import { fetchLightning } from '../../modules/FetchLightning';

const styles = {
    root: {
        width:'100%',
        marginLeft:'2px',
    },
    alert: {
        boxShadow: '1px 1px 2px #404040',
        cursor: 'auto'
    },
    reload: {
        cursor: 'pointer'
    },
    loader: {
        verticalAlign:'middle',
        marginLeft:'10px',
        color: '#ffbb00'
    },
    text: {
        verticalAlign: 'middle',
        display: 'inline',
        marginLeft:'10px'
    },
};

const LightningAlerts = ({classes}) => {

    const dispatch = useDispatch();
    const [alerts, setAlerts] = useState({severity:'success', msg: ''});
    const [loaded, setLoaded] = useState(false);
    const setLightningAlerts = data => dispatch(handleLightningAlerts(data));
    const currentAlerts = useSelector(state => state.lightningAlerts);
    const token = useSelector(state => state.accessToken);

    const fetchData = async() => {
        setLoaded(false);
        try{
            const data = await fetchLightning(token);
            setAlerts(data);
            setLightningAlerts(data);
            setLoaded(true);
        } catch (err){
            console.log(err);
            setAlerts({severity: 'error', msg: 'Error: Failed to fetch lightning data'});
            setLoaded(true);
        };
    };

    useEffect(()=> { 
        setInterval(()=>{ fetchData() }, 60000*10);
    },[]);

    useEffect(() => {
        if(!currentAlerts.severity){
            fetchData();
        }else{
            setLoaded(true); 
            setAlerts(currentAlerts)
        }
    // eslint-disable-next-line
    },[]);

    if(!loaded){
        return (
            <div className={classes.root}>
                <CircularProgress size={24} className={classes.loader}/>
                <Typography className={classes.text}>Loading lightning data, please wait...</Typography>
            </div>
        );
    };

    return (
       <div>
           {loaded && 
            <div className={classes.root}>
                <Alert className={classes.alert} severity={alerts.severity} action={<ReplayIcon onClick={fetchData} className={classes.reload}/>}>{alerts.msg}</Alert>
            </div>}
       </div>
    );
};

LightningAlerts.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LightningAlerts);
