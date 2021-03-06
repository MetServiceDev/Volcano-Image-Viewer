import React from 'react';
import moment from 'moment';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Typography, LinearProgress, Zoom, Theme, IconButton, Tooltip } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { Volcano } from '@metservice/aviationtypes';

import ErrorMessage from '../ErrorComponents/ErrorMessage';
import { Thumbnail } from '../../api/volcano/headers';
import { fetchImages } from '../../api/images/fetchImages';
import apiCall, { HTTPMethod } from '../../api/APICall';
import authClient from '../../api/auth/Auth';
import { AppContext } from '../../AppContext';

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
    imgCapture: {
        position:'absolute',
        top:'5%',
        left: '5%',
        backgroundColor: 'rgba(219, 219, 219, 0.5)',
        color: '#202020',
    },
    savedText: {
        position:'absolute',
        top:'5%',
        left: '12%',
        borderRadius: '5px',
        padding: '10px',
        fontSize: '16px',
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
        backgroundColor: theme.palette.primary.dark,
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

interface Props extends WithStyles<typeof styles> {
    volcano: Volcano,
    s3Tags: string[],
    captureImage?: boolean,
};

type ErrorType = boolean | string;

const VolcanoThumbnail: React.FC<Props> = ({ classes, volcano, s3Tags, captureImage }) => {
    const date = moment().utc();
    date.format('H:mm');

    const [allThumbnails, setThumbnails] = React.useState<Thumbnail[]>([]);
    const [currentImg, setCurrent] = React.useState(allThumbnails[allThumbnails.length-1]);
    const [expand, toggleExpand] = React.useState<boolean>(false);

    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<ErrorType>(false);

    const { user, currentImages: { imageLog, setImageLog } } = React.useContext(AppContext);

    const [imgSaved, setImgSaved] = React.useState<boolean>(false);

    const fetchThumbnails = async(): Promise<void> => {
        setLoading(true);
        try {
            const images = await fetchImages(s3Tags);
            setThumbnails(images);
            setCurrent(images[images.length -1 ]);
            setError(false);
        } catch(err) {
            setError(true);
        }
        setLoading(false);
    };

    React.useEffect(() => {
        if (!imageLog || !imageLog[volcano.name]) {
            setImageLog({
                ...imageLog,
                [volcano.name]: { allThumbnails, s3Tags }
            })
        }
    }, [allThumbnails]);

    React.useEffect(() => {
        if (s3Tags.length > 0) {
            fetchThumbnails();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [s3Tags]);

    const loadingUI = (
        <div className={classes.loadingDiv}>
            <LinearProgress className={classes.loader} color='primary'/>
        </div>
    );

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
        ));
    };

    const window = () => {
        let primaryImg = (
            <img 
                width='100%'
                src={currentImg?.src || allThumbnails[11]?.src || ''}
                alt={volcano.name}
                onMouseOver={() => toggleExpand(true)}
            />
        )

        const currentIndex = allThumbnails.indexOf(currentImg);
        const notUpdated = (currentImg?.size && currentImg?.size === allThumbnails[currentIndex-1]?.size) || currentImg?.hasntUpdated;

        const reset = () => { toggleExpand(false); setCurrent(allThumbnails[11]); };

        const saveImage = async(): Promise<void> => {
            const token = authClient.getAccessToken() as string;
            const fileKey = s3Tags[currentIndex];
            await apiCall('user/images', HTTPMethod.POST, token, { userId: user?.aud as string, fileKey });
            setImgSaved(true);
            setTimeout(() => setImgSaved(false), 2000);
        };

        return (
            <div className={classes.root} onMouseLeave={() => reset()}>
                {!error && expand && currentImg?.timestamp && <Typography className={classes.indexDisplay}>{currentImg?.timestamp}</Typography>}
                {!error && notUpdated &&
                    <Alert severity='error' className={classes.updatedDisplay}>
                        Warning, image did not update!
                    </Alert>}
                {error ? <ErrorMessage
                            volcanoName={volcano.name}
                            refresh={() => fetchThumbnails()}
                        /> : primaryImg}
                {captureImage && expand &&
                    <Tooltip title='Save Image' arrow>
                        <IconButton
                            className={classes.imgCapture}
                            onClick={() => saveImage()}
                        >
                            <PhotoCameraIcon fontSize='large'/>
                        </IconButton>
                    </Tooltip>}
                {imgSaved && <Alert severity='success' className={classes.savedText}>Image successfully saved</Alert>}
                <div className={classes.thumbnailGrid}>
                    {!error && expand && returnThumnails()}
                </div>
            </div>
        );
    }

    return (
        <>
            {isLoading ? loadingUI : window()}
        </>
    )   
};

export default withStyles(styles)(VolcanoThumbnail);
