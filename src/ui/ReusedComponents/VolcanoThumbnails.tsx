import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Typography, LinearProgress, Zoom, Theme } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import ErrorMessage from '../ErrorComponents/ErrorMessage';
import { imageBucket } from '../../metadata/Endpoints';
import { setRefresh } from '../../redux/effects/refreshEffect';
import { Volcano, VolcanoLocation } from '../../api/volcano/headers';
import formatThumbnail from '../../api/volcano/formatThumbnail';


const styles = (theme: Theme) => createStyles({
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
        fontSize: '22px',
        color: '#202020'
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
    thumbnailWrapper: {
        backgroundColor: theme.palette.background.default,
        width:'100%'
    }
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
    size?: number
}

const VolcanoThumbnail: React.FC<Props> = ({ classes, volcano }) => {
    const date = moment().utc();
    date.format('H:mm')

    const s3Tag = volcano.s3Link;

    const [isLoaded, setLoading] = React.useState<boolean>(false);

    async function downloadImages<T>(timestampKeys: T[]): Promise<void> {
        const images = await Promise.all(timestampKeys.map(async(time): Promise<Thumbnail> => {
            const downloadLink = `${imageBucket}/${s3Tag}/${s3Tag}-${time}.jpg`
            const call = await fetch(downloadLink);
            const size = Number(call.headers.get('Content-Length'));
            const blob = await call.blob();
            const src = URL.createObjectURL(blob);
            return { src, size } as Thumbnail;
        }));
        setThumbnails(images);
        setCurrent(images[images.length-1]);
    };

    React.useEffect(() => {
        if (volcano.location !== VolcanoLocation.VANUATU && volcano.code !== 'ERB') {
            const times = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
            const images = times.map(time => {
                const indexedTime = date.subtract('minutes', time);
                return formatThumbnail(volcano.code, indexedTime)
            }).reverse();
            setThumbnails(images);
            setCurrent(images[images.length-1]);
        } else {
            const indexList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
            downloadImages<string>(indexList);
        }
        setLoading(true)
    },[volcano]);

    const [allThumbnails, setThumbnails] = React.useState<Thumbnail[]>([]);
    const [currentImg, setCurrent] = React.useState(allThumbnails[allThumbnails.length-1]);

    const dispatch = useDispatch();

    const [expand, toggleExpand] = React.useState<boolean>(false);
    const [isError, setError] = React.useState({val: false, msg: ''});

    const enableRefresh = (bool: boolean) => dispatch(setRefresh(bool));

    // React.useEffect(() => {
    //     const compareImages = async () => {
    //         const response = await Promise.all(allThumbnails.map(async(item) => {
    //             const call = await fetch(item.src);
    //             const size = call.headers.get('Content-Length');
    //             return size as string;
    //         }));
    //         // response.forEach((imgSize, index) => {
    //         //     if(imgSize === response[index-1]) {
    //         //         allThumbnails.splice(index-1, 0, {
    //         //            ...allThumbnails[index-1],
    //         //            hasntUpdated: true 
    //         //         })
    //         //         setThumbnails([...allThumbnails])
    //         //     }
    //         // })
    //     };
    //     if (volcano.location === VolcanoLocation.VANUATU || volcano.code === 'ERB') {
    //         compareImages();
    //     }
        
    // },[allThumbnails]);

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
                <div className={classes.thumbnailWrapper}>
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
            onMouseOver={() => toggleExpand(true)}
        />
    )

    const currentIndex = allThumbnails.indexOf(currentImg);
    return (
        <div className={classes.root} onMouseLeave={()=>{ toggleExpand(false); setCurrent(allThumbnails[11]) }}>
            {expand && currentImg?.timestamp && <Typography className={classes.indexDisplay}>{currentImg?.timestamp}</Typography>}
            {currentImg?.size && currentImg?.size === allThumbnails[currentIndex-1]?.size &&
                <Alert severity={'error'} className={classes.updatedDisplay}>
                    Warning, image did not update!
                </Alert>}
            {isError.val ? <ErrorMessage msg={isError.msg}/> : primaryImg}
            <div className={classes.thumbnailGrid}>
                {!isError.val && expand && returnThumnails()}
            </div>
        </div>
    );
};

export default withStyles(styles)(VolcanoThumbnail);
