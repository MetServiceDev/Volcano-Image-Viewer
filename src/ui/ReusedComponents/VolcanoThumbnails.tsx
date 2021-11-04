import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Typography, LinearProgress, Zoom } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import apiCall from '../../api/APICall';
import ErrorMessage from '../ErrorComponents/ErrorMessage';
import { imageBucket, gnsEndpont } from '../../metadata/Endpoints';
import { setRefresh } from '../../redux/effects/refreshEffect';
import { Volcano } from '../../api/volcano/headers';
import { AppState } from '../../redux/store';


const styles = () => createStyles({
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
});

// const theme = createMuiTheme({
//     palette: {
//        secondary: {
//            main: '#ffbb00'
//        }
//     }
// });

interface Props extends WithStyles<typeof styles> {
    volcano: Volcano
}

const VolcanoThumbnail: React.FC<Props> = ({ classes, volcano }) => {
    const date = moment().utc();
    const year = moment().format('YYYY');

    const dayOfYear = date.dayOfYear()
    date.format('H:mm')

    const imgTag = (time: string) => `${year}.${dayOfYear}.${time}.00.${volcano.code}.jpg`;
    const times = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]

    const formatTimeStamp = (indexedTime: any) => {
        const dayOfYear = indexedTime.dayOfYear();
        const startMinute = indexedTime.format('mm').split('')[0];
        const timeSigniture = indexedTime.format(`HH${startMinute}0`);
        const timestamp = `${moment(indexedTime.toDate().toString()).format(`HH:${startMinute}0`)}`
        return {
            src: `${gnsEndpont}/${year}/${volcano.code.split('.')[0]}/${volcano.code}/${year}.${dayOfYear}/${imgTag(timeSigniture)}`,
            timestamp
        };
    }

    const timestamps = times.map(time => {
        const indexedTime = date.subtract('minutes', time);
        return formatTimeStamp(indexedTime)
    }).reverse();

    const [currentImg, setCurrent] = React.useState(timestamps[timestamps.length-1]);

    const dispatch = useDispatch();

    const [thumbnail, setThumbnail] = React.useState<any>('12');
    const indexList = [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const [expand, toggleExpand] = React.useState<boolean>(false);
    const [isError, setError] = React.useState({val: false, msg: ''});
    const [isLoaded, setLoading] = React.useState<boolean>(true);
    const { token } = useSelector((state: AppState) => state.login);

    const [metadata, setMetadata] = React.useState<any>([])

    const enableRefresh = (bool: boolean) => dispatch(setRefresh(bool));

    const s3Tag = volcano.s3Link;


    // React.useEffect(() => {
    //     const origin = `${imageBucket}/${s3Tag}/${s3Tag}`;
    //     Promise.all(indexList.map((item, index) => {
    //         const url = `${origin}-${item}.jpg`;
    //         return new Promise(async(res, rej) => {
    //             try{
    //                 const call = await fetch(url);
    //                 const size = call.headers.get('Content-Length');
    //                 if(volcano.location !== 'Vanuatu'){
    //                     const timestamp = call?.headers?.get('x-amz-meta-timestamp')?.slice(0,8);
    //                     res({ timestamp: timestamp, size: size });
    //                 }else {
    //                     res({size: size})
    //                 };      
    //             }catch(err) {
    //                 setLoading(true); 
    //                 apiCall('metadata', 'GET', token).then(timestamps => {
    //                     timestamps.body.reverse()
    //                     res({ timestamp:timestamps.body[index].slice(0,8),updated:true });
    //                 });
    //             };
    //         });
    //     })).then(metadata => {
    //         const data = metadata.reverse() as any;
    //         var array: any = [];
    //         data.map((meta: any, index: number) => {
    //             try{
    //                 if(meta.size && meta.size === data[index+1].size){
    //                     array.push({
    //                         timestamp:meta.timestamp,
    //                         updated:false,
    //                     });
    //                 } else {
    //                     array.push({
    //                         timestamp:meta.timestamp,
    //                         updated:true
    //                     });
    //                 };
    //             } catch(err){
    //                 array.push({
    //                     timestamp:meta.timestamp,
    //                     updated:true
    //                 });
    //             };          
    //         });
    //         setMetadata(array.reverse());
    //         setLoading(true); 
    //         return;
    //     }).catch(() => { enableRefresh(true); })
    // },[s3Tag, volcano.code, volcano.name]);

    if(!isLoaded){
        return (
            <div className={classes.loadingDiv}>
                <LinearProgress className={classes.loader} color='primary'/>
            </div>
        );
    };

    const returnThumnails = () => {
        return timestamps.map((val, index) => (
            <Zoom in={expand} key={index}>
                <div style={{backgroundColor:'white', width:'100%'}}>
                    <img          
                        src={val.src}
                        alt={volcano.name} 
                        width='100%'
                        onMouseOver={()=>{setCurrent(val); setThumbnail(val); }}
                        className={classes.thumbnailImg}
                    />
                </div>
            </Zoom>
        ));; 
    };

    return(
        <div className={classes.root} onMouseLeave={()=>{toggleExpand(false); setCurrent(timestamps[11]); setThumbnail('12')}}>
            {expand && volcano.location !== 'Vanuatu' && <Typography className={classes.indexDisplay}>{currentImg.timestamp}</Typography>}
            {metadata.length > 0 && metadata[thumbnail === '' ? 0 : (thumbnail-1)].updated === false  &&
                <Alert severity={'error'} className={classes.updatedDisplay}>
                    Warning, image did not update!
                </Alert>}
            {isError.val ? <ErrorMessage msg={isError.msg}/> : <img width='100%' src={currentImg.src} alt={volcano.name} onMouseOver={()=>{toggleExpand(true)}}/>}
            <div className={classes.thumbnailGrid}>
                {!isError.val && expand && returnThumnails()}
            </div>
        </div>
    );
};

export default withStyles(styles)(VolcanoThumbnail);
