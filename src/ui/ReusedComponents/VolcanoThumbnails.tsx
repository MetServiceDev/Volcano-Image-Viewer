import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Typography, LinearProgress, Zoom } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import ErrorMessage from '../ErrorComponents/ErrorMessage';
import { imageBucket } from '../../metadata/Endpoints';
import { setRefresh } from '../../redux/effects/refreshEffect';
import { Volcano, VolcanoLocation } from '../../api/volcano/headers';
import formatTimeStamp from '../../api/volcano/formatTimeStamp';


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

interface Thumbnail {
    src: string,
    timestamp?: string,
    hasntUpdated?: boolean
}

const VolcanoThumbnail: React.FC<Props> = ({ classes, volcano }) => {
    const date = moment().utc();
    date.format('H:mm')

    const s3Tag = volcano.s3Link;

    const [isLoaded, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (volcano.location !== VolcanoLocation.VANUATU && volcano.code !== 'ERB') {
            const times = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
            const images = times.map(time => {
                const indexedTime = date.subtract('minutes', time);
                return formatTimeStamp(volcano.code, indexedTime)
            }).reverse();
            setThumbnails(images);
        } else {
            const indexList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
            const images: Thumbnail[] = indexList.map(time => {
                return {
                    src: `${imageBucket}/${s3Tag}/${s3Tag}-${time}.jpg`,
                }
            })
            setThumbnails(images)
        }
        setLoading(true)
    },[volcano]);

    // const timestamps = times.map(time => {
    //     const indexedTime = date.subtract('minutes', time);
    //     return formatTimeStamp(indexedTime)
    // }).reverse();

    const [allThumbnails, setThumbnails] = React.useState<Thumbnail[]>([]);
    const [currentImg, setCurrent] = React.useState(allThumbnails[allThumbnails.length-1]);

    const dispatch = useDispatch();

    const [expand, toggleExpand] = React.useState<boolean>(false);
    const [isError, setError] = React.useState({val: false, msg: ''});

    const enableRefresh = (bool: boolean) => dispatch(setRefresh(bool));

    React.useEffect(() => {
        if (volcano.location === VolcanoLocation.VANUATU || volcano.code === 'ERB') {
            Promise.all(allThumbnails.map((item) => {
                return new Promise(async(res, rej) => {
                    const call = await fetch(item.src);
                    const size = call.headers.get('Content-Length');
                    res(size)
                });
            })).then((response) => {
                console.log(volcano.name, response)
                response.forEach((imgSize, index) => {
                    if(imgSize === response[index-1]) {
                        allThumbnails.splice(index-1, 0, {
                           ...allThumbnails[index-1],
                           hasntUpdated: true 
                        })
                        setThumbnails([...allThumbnails])
                    }
                })
            })
        }
        
    },[s3Tag, volcano.code, volcano.name]);

    if(!isLoaded){
        return (
            <div className={classes.loadingDiv}>
                <LinearProgress className={classes.loader} color='primary'/>
            </div>
        );
    };

    const returnThumnails = () => {
        return allThumbnails.map((val, index) => (
            <Zoom in={expand} key={index}>
                <div style={{backgroundColor:'white', width:'100%'}}>
                    <img          
                        src={val.src}
                        alt={volcano.name} 
                        width='100%'
                        onMouseOver={() => setCurrent(val)}
                        className={classes.thumbnailImg}
                    />
                </div>
            </Zoom>
        ));; 
    };

    let primaryImg = (
        <img 
            width='100%'
            src={currentImg?.src || allThumbnails[11]?.src || ''}
            alt={volcano.name}
            onMouseOver={()=> toggleExpand(true)}
        />
    )

    return(
        <div className={classes.root} onMouseLeave={()=>{toggleExpand(false); setCurrent(allThumbnails[11]);}}>
            {expand && currentImg?.timestamp && <Typography className={classes.indexDisplay}>{currentImg?.timestamp}</Typography>}
            {/* {metadata.length > 0 && metadata[thumbnail === '' ? 0 : (thumbnail-1)].updated === false  &&
                <Alert severity={'error'} className={classes.updatedDisplay}>
                    Warning, image did not update!
                </Alert>} */}
            {isError.val ? <ErrorMessage msg={isError.msg}/> : primaryImg}
            <div className={classes.thumbnailGrid}>
                {!isError.val && expand && returnThumnails()}
            </div>
        </div>
    );
};

export default withStyles(styles)(VolcanoThumbnail);
