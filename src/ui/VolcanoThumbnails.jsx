import { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import Zoom  from '@material-ui/core/Zoom';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorMessage from './ErrorMessage';

const styles = {
    root: {
        position:'relative',
    },
    overlay: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'black',
        backgroundColor: 'white'
    },
    indexDisplay: {
        position:'absolute',
        top:'5%',
        right: '10%',
        backgroundColor: 'rgba(219, 219, 219, 0.5)',
        borderRadius: '5px',
        padding: '10px',
        fontSize: '22px'
    },
    loader: {
        padding:'10px',
        position: 'relative',
        left:'40%',
        top:'5%'
    }
}

const VolcanoThumbnail = ({classes, volcano}) => {
    const [thumbnail, setThumbnail] = useState('12')
    const imgList = ['', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    const [expand, toggleExpand] = useState(false)
    const [isError, setError] = useState({val: false, msg: ''})
    const [isLoaded, setLoading] = useState(false)

    useEffect(() => {
        fetch(`http://10.100.21.161:4000/${volcano.name}/${volcano.code}_PICS${thumbnail}.jpg`)
            .then(() => { setLoading(true); return; })
            .catch((e) => { setError({val: true, msg:e.toString()}); setLoading(true); return; })
    },[thumbnail, volcano.code, volcano.name]);

    if(!isLoaded){
        return <CircularProgress className={classes.loader} size={96}/>
    }

    return(
        <div className={classes.root} onMouseLeave={()=>{toggleExpand(false)}}>
            {expand && <Typography className={classes.indexDisplay}>{`${thumbnail === '' ? '1' : thumbnail}/12`}</Typography>}
                {isError.val ? <ErrorMessage msg={isError.msg}/> : <img width='100%' src={`http://10.100.21.161:4000/${volcano.name}/${volcano.code}_PICS${thumbnail}.jpg`} alt={volcano.name} onMouseOver={()=>{toggleExpand(true)}}/>}
                <br/>
                {!isError.val && expand && imgList.map((val, index) => {
                    return(
                        <Zoom in={expand} key={index}>
                            <img          
                                src={`http://10.100.21.161:4000/${volcano.name}/${volcano.code}_PICS${val}.jpg`} 
                                alt={volcano.name} 
                                width='8.3%'
                                onMouseOver={()=>{setThumbnail(val)}}
                                className={classes.root}
                            />
                        </Zoom>                  
                    );
                })}
        </div>    
    );
};

VolcanoThumbnail.propTypes = {
    classes: PropTypes.object,
    volcano: PropTypes.object.isRequired,
};

export default withStyles(styles)(VolcanoThumbnail);
