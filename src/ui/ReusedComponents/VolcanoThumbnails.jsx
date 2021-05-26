import { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import Zoom from '@material-ui/core/Zoom';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import ErrorMessage from '../ErrorComponents/ErrorMessage';
import { imageBucket } from '../../metadata/Endpoints';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import apiCall from '../../modules/APICall';
import { useSelector, useDispatch } from 'react-redux';
import { handleRefresh } from '../../redux/actions';
import Alert from '@material-ui/lab/Alert';

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
    updatedDisplay:{
        position:'absolute',
        top:'5%',
        left: '5%',
        width:'50%',
        opacity: 0.7
    },
    thumbnailGrid: {
        display:'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        position:'absolute',
        bottom:'0%'
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
        position: 'absolute',
        backgroundColor:'rgba(255, 187, 0, 0.5)',
    },
    loadingDiv: {
        height:'24vh',
        textAlign:'center'
    },
};

const theme = createMuiTheme({
    palette: {
       secondary: {
           main: '#ffbb00'
       }
    }
});

const VolcanoThumbnail = ({classes, volcano}) => {
    const dispatch = useDispatch();

    const [thumbnail, setThumbnail] = useState('12');
    const indexList = [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const [expand, toggleExpand] = useState(false);
    const [isError, setError] = useState({val: false, msg: ''});
    const [isLoaded, setLoading] = useState(false);
    const token = useSelector(state => state.accessToken);

    const [metadata, setMetadata] = useState([])

    const setRefresh = bool => dispatch(handleRefresh(bool));

    const s3Tag = volcano.s3Link;
    const [src, setSrc] = useState(`${imageBucket}/${s3Tag}/${s3Tag}-${thumbnail}.jpg`);

    const setImage = index => { setSrc(`${imageBucket}/${s3Tag}/${s3Tag}-${index}.jpg`); };

    useEffect(() => {
        const origin = `${imageBucket}/${s3Tag}/${s3Tag}`;
        Promise.all(indexList.map((item, index) => {
            const url = `${origin}-${item}.jpg`;
            return new Promise(async(res, rej) => {
                try{
                    const call = await fetch(url);
                    const blob = await call.blob();
                    const timestamp = call.headers.get('x-amz-meta-timestamp').slice(0,8);
                    res({ timestamp: timestamp, size: blob.size });
                }catch(err) {
                    setLoading(true); 
                    apiCall('metadata', 'GET', token).then(timestamps => {
                        res({ timestamp:timestamps.body[index].slice(0,8),updated:true });
                    });
                };
            });
        })).then(metadata => {
            const data = metadata.reverse();
            var array = [];
            data.map((meta, index) => {
                try{
                    if(meta.size && meta.size === data[index+1].size){
                        array.push({
                            timestamp:data[index+1].timestamp,
                            updated:false,
                        });
                    } else {
                        array.push({
                            timestamp:meta.timestamp,
                            updated:true
                        });
                    };
                } catch(err){
                    array.push({
                        timestamp:meta.timestamp,
                        updated:true
                    });
                };          
            });
            setMetadata(array.reverse());
            setLoading(true); 
            return;
        }).catch(() => { setRefresh(true); })
    },[s3Tag, volcano.code, volcano.name]);

    if(!isLoaded){
        return (
            <div className={classes.loadingDiv}>
                <MuiThemeProvider theme={theme}><LinearProgress className={classes.loader} color='secondary'/></MuiThemeProvider>
            </div>
        );
    };

    const returnThumnails = () => {
        return indexList.map((val, index) => (
            <Zoom in={expand} key={index}>
                <div style={{backgroundColor:'white', width:'100%'}}>
                    <img          
                        src={`${imageBucket}/${s3Tag}/${s3Tag}-${val}.jpg`} 
                        alt={volcano.name} 
                        width='100%'
                        onMouseOver={()=>{setImage(val); setThumbnail(val)}}
                        className={classes.thumbnailImg}
                    />
                </div>
            </Zoom>
        ));; 
    };

    return(
        <div className={classes.root} onMouseLeave={()=>{toggleExpand(false); setImage('12'); setThumbnail('12')}}>
            {expand && volcano.location !== 'Vanuatu' && metadata.length > 0 && <Typography className={classes.indexDisplay}>{metadata[thumbnail === '' ? 0 : (thumbnail-1)].timestamp}</Typography>}
            {metadata.length > 0 && metadata[thumbnail === '' ? 0 : (thumbnail-1)].updated === false  &&
                <Alert severity={'error'} className={classes.updatedDisplay}>
                    Warning, image did not update!
                </Alert>}
            {isError.val ? <ErrorMessage msg={isError.msg}/> : <img width='100%' src={src} alt={volcano.name} onMouseOver={()=>{toggleExpand(true)}}/>}
            <div className={classes.thumbnailGrid}>
                {!isError.val && expand && returnThumnails()}
            </div>
        </div>
    );
};

VolcanoThumbnail.propTypes = {
    classes: PropTypes.object,
    volcano: PropTypes.object.isRequired,
};

export default withStyles(styles)(VolcanoThumbnail);
