import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Typography, LinearProgress, Zoom, Theme } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import ErrorMessage from '../ErrorComponents/ErrorMessage';
import { Volcano, VolcanoLocation, Thumbnail } from '../../api/volcano/headers';
import { AppState } from '../../redux/store';
import { fetchImages } from '../../api/images/fetchImages';

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

interface Props extends WithStyles<typeof styles> {
    volcano: Volcano
};

type ErrorType = boolean | string;

const VolcanoThumbnail: React.FC<Props> = ({ classes, volcano }) => {
    const date = moment().utc();
    date.format('H:mm');

    const [allThumbnails, setThumbnails] = React.useState<Thumbnail[]>([]);
    const [currentImg, setCurrent] = React.useState(allThumbnails[allThumbnails.length-1]);
    const [expand, toggleExpand] = React.useState<boolean>(false);

    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<ErrorType>(false);

    const user = useSelector((state:AppState) => state.login);

    const fetchThumbnails = async(): Promise<void> => {
        setLoading(true);
        try {
            const images = await fetchImages(volcano, user);
            setThumbnails(images);
            setCurrent(images[images.length -1 ])
            setError(false);
        } catch(err) {
            setError(true);
        }
        setLoading(false);
    };

    React.useEffect(() => {
        if (user) {
            fetchThumbnails()
        };
    }, [volcano]);

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
        ));; 
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
        return (
            <div className={classes.root} onMouseLeave={() => { toggleExpand(false); setCurrent(allThumbnails[11]) }}>
                {!error && expand && currentImg?.timestamp && <Typography className={classes.indexDisplay}>{currentImg?.timestamp}</Typography>}
                {!error && notUpdated &&
                    <Alert severity={'error'} className={classes.updatedDisplay}>
                        Warning, image did not update!
                    </Alert>}
                {error ? <ErrorMessage
                            volcanoName={volcano.name}
                            refresh={() => fetchThumbnails()}
                        /> : primaryImg}
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
