import { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import Zoom from '@material-ui/core/Zoom';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import ErrorMessage from './ErrorMessage';
import { imageBucket } from '../Endpoints';
import { useSelector } from 'react-redux';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';

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
    const timestamps = useSelector(state => state.timestamps);
    const [thumbnail, setThumbnail] = useState('12');
    const indexList = [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const [expand, toggleExpand] = useState(false);
    const [isError, setError] = useState({val: false, msg: ''});
    const [isLoaded, setLoading] = useState(false);

    const s3Tag = volcano.s3Link;
    const src = `${imageBucket}/${s3Tag}/${s3Tag}-${thumbnail}.jpg`

    useEffect(() => {
       fetch(src, { mode: 'no-cors' }).then(() => { setLoading(true); return; }).catch(e => { setError({val: true, msg:e.toString()}); setLoading(true); return; })
    },[thumbnail, volcano.code, volcano.name, src]);

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
                    onMouseOver={()=>{setThumbnail(val)}}
                    className={classes.thumbnailImg}
                />
                </div>
            </Zoom>
        ));
    };

    return(
        <div className={classes.root} onMouseLeave={()=>{toggleExpand(false); setThumbnail('12')}}>
            {expand && <Typography className={classes.indexDisplay}>{timestamps[thumbnail === '' ? 0 : (thumbnail-1)]}</Typography>}
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
