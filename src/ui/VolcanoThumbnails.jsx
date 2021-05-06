import { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import Zoom from '@material-ui/core/Zoom';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import ErrorMessage from './ErrorMessage';
import endpoint from '../ServerEndpoint';

const styles = {
    root: {
        position:'relative',
    },
    indexDisplay: {
        position:'absolute',
        top:'5%',
        right: '5%',
        backgroundColor: 'rgba(219, 219, 219, 0.5)',
        borderRadius: '5px',
        padding: '10px',
        fontSize: '22px'
    },
    thumbnailGrid: {
        display:'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'
    },
    thumbnailImg: {
        position:'relative',
        opacity: '0.5',
        '&:hover': {
            opacity: '1'
        },
    },
    loader: {
        width: '100%',
        bottom:'0%',
        position: 'absolute'
    },
    loadingDiv: {
        height:'24vh',
        textAlign:'center'
    },
};

const VolcanoThumbnail = ({classes, volcano}) => {
    const [thumbnail, setThumbnail] = useState('12');
    const imgList = ['', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const [expand, toggleExpand] = useState(false);
    const [isError, setError] = useState({val: false, msg: ''});
    const [isLoaded, setLoading] = useState(false);

    useEffect(() => {
       fetch(`${endpoint}/Volcano/${volcano.name}/${volcano.code}_PICS${thumbnail}.jpg`)
            .then(() => { setLoading(true); return; })
            .catch((e) => { setError({val: true, msg:e.toString()}); setLoading(true); return; })
    },[thumbnail, volcano.code, volcano.name]);

    if(!isLoaded){
        return (
            <div className={classes.loadingDiv}>
                <LinearProgress className={classes.loader}/>
            </div>
        );
    };

    return(
        <div className={classes.root} onMouseLeave={()=>{toggleExpand(false)}}>
            {expand && <Typography className={classes.indexDisplay}>{`${!!thumbnail ? thumbnail : '1'}/12`}</Typography>}
            {isError.val ? <ErrorMessage msg={isError.msg}/> : <img width='100%' src={`${endpoint}/Volcano/${volcano.name}/${volcano.code}_PICS${thumbnail}.jpg`} alt={volcano.name} onMouseOver={()=>{toggleExpand(true)}}/>}
            <div className={classes.thumbnailGrid}>
                {!isError.val && expand && imgList.map((val, index) => {
                    return(
                        <Zoom in={expand} key={index}>
                            <img          
                                src={`${endpoint}/Volcano/${volcano.name}/${volcano.code}_PICS${val}.jpg`} 
                                alt={volcano.name} 
                                width='100%'
                                onMouseOver={()=>{setThumbnail(val)}}
                                className={classes.thumbnailImg}
                            />
                        </Zoom>         
                    );
                })}
            </div>
        </div>
    );
};

VolcanoThumbnail.propTypes = {
    classes: PropTypes.object,
    volcano: PropTypes.object.isRequired,
};

export default withStyles(styles)(VolcanoThumbnail);
