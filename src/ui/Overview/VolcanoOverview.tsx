import React from 'react';
import { useLocation } from 'react-router-dom';
import { Grow, Typography, Button, CircularProgress  } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { setLogin } from '../../redux/effects/loginEffect';
import { User } from '../../api/User/headers';
import { AppState } from '../../redux/store/index';
import { poll } from '../../api/poller';

import { imageBucket } from '../../metadata/Endpoints';
import VolcanicAlert from './VolcanicAlert';
import VolcanoThumbnails from '../ReusedComponents/VolcanoThumbnails';

import { Volcano, OverviewDisplay, VolcanoLocation } from '../../api/volcano/headers';
import formatTimeStamp from '../../api/volcano/formatThumbnail';

const styles = () => createStyles({
    root: {
    },
    imgContainer: {
        width:'50%',
        position: 'absolute',
        left: '25%',
        top: '2%'
    },
    mainPanel:{
        position: 'absolute',
        width: '100%',
        height: '100vh'
    },
    sidebar: {
        width:'10%',
        backgroundColor:'white',
        boxShadow: '-2px 4px 8px #404040',
        display: 'grid',
        gridTemplateRows: '1fr 1fr 1fr',
        height: '100%',
        float:'left',
    },
    sideItem:{
        padding:'20px',
        opacity:'0.7',
        transition: '0.5s',
        cursor: 'pointer',
        textAlign: 'center',
        '&:hover': {
            opacity:'1',
        }
    },
    bottomSec: {
        width:'10%',
        backgroundColor:'white',
        display: 'grid',
        boxShadow: '2px 4px 8px #404040',
        gridTemplateRows: '1fr 1fr 1fr',
        height: '100%',
        float:'right',
    },
    link: {
        textDecoration: 'none',
        color: '#404040',
        opacity:'0.7',
        transition: '0.5s',
        cursor: 'pointer',
        textAlign: 'center',
        '&:hover': {
            opacity:'1',
        }
    },
    headerDiv: {
        padding:'20px',
        backgroundColor:'white',
        borderBottom: '1px solid #404040',
        textAlign:'center',
        width:'100%',
        overflow:'auto'
    },
    homeIcon: {
        borderRadius: '5px',
        marginRight:'10px',
        float:'left'
    },
    headerText: {
        display:'inline',
        float:'left'
    },
    relatedVolcanoes: {
        transition: '0.5s',
        '&:hover':{
            boxShadow: '4px 4px 8px #404040'
        }
    },
    alerIcon: {
        display:'inline-block',
        verticalAlign:'middle',
        float:'right',
        cursor: 'pointer'
    },
    loader: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    }
});

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

interface Props extends WithStyles<typeof styles> {}

const VolcanoOverview: React.FC<Props> = ({ classes }) => {
    const { authState } = useOktaAuth();
    const user = useSelector((state:AppState) => state.login) as User;
    const dispatch = useDispatch();

    const [hasLoaded, setLoaded] = React.useState<boolean>(false);
    const [volcanoes, setVolcanoes] = React.useState<Volcano[]>([]);

    React.useEffect(() => {
        if(authState && authState.isAuthenticated){ 
            const { email, aud, name } = authState?.idToken?.claims as any;
            const token = authState?.accessToken?.accessToken || '';
            dispatch(setLogin({ email, aud, name, token } as User));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[authState]);

    React.useEffect(() => {
        if (user) {
            poll(user).then(res => {
                setVolcanoes(res);
                setLoaded(true)
            });
        }
    }, [user])

    let query = useQuery();
    const volcano = query.get('volcano')
    const volcanoObject = volcanoes.find(v => v.name === volcano) as Volcano || {};
    const { name, volcanicAlerts, s3Link } = volcanoObject;
    const [currentDisplay, setCurrentDisplay] = React.useState<OverviewDisplay>(OverviewDisplay.THUMBNAIL)
    const landingImg = `${imageBucket}/${s3Link}/${s3Link}-12.jpg`

    const setDisplay = (currentDisplay: OverviewDisplay) => {
        switch(currentDisplay){
            case OverviewDisplay.THUMBNAIL:
                return <VolcanoThumbnails volcano={volcanoObject}/>
            case OverviewDisplay.DRUM_GRAPH:
                return <img src={volcanoObject.location === 'Vanuatu' ? volcanoObject.drumLink : `${volcanoObject.drumLink}-drum.png`} alt={name} width='100%'/>
            case OverviewDisplay.RSAM:
                return <img src={`${volcanoObject.drumLink}-combined.png`} alt={name} width='100%'/>
        }
    }

    if(!volcanoObject.name){
        return null
    }

    const fetchSrc = (code: string) => {
        const volcano = volcanoes.find(v => v.code === code) as Volcano;
        if (volcano.location === VolcanoLocation.VANUATU) {
            const s3Tag = volcano.s3Link || ''
            const src = `${imageBucket}/${s3Tag}/${s3Tag}-12.jpg`
            return src;
        } else {
            const date = moment().utc();
            date.subtract('minutes', 10).format('H:mm');
            const { src } = formatTimeStamp(code, date);
            return src;
        }
    }

    const loadingUI = (
        <div className={classes.loader}>
            <CircularProgress
                color='primary'
                size={256}
           />
        </div>      
    )

    return(
        <div className={classes.root}>
            <div className={classes.headerDiv}>
                <Link className={classes.link} to='/'><Button className={classes.homeIcon} aria-label="return home"><HomeIcon style={{fontSize:'48px'}}/></Button></Link>
                <Typography variant='h3' className={classes.headerText}>{name}</Typography>
                {volcanicAlerts && <VolcanicAlert data={volcanicAlerts}/>}
            </div>
            <div className={classes.mainPanel}>
                <div className={classes.sidebar}>
                    <Grow in={true} {...(true ? { timeout: 1000*(1) } : {})}>
                        <div className={classes.sideItem}>
                            <img src={landingImg} alt={volcano as string} width='100%' onClick={() => setCurrentDisplay(OverviewDisplay.THUMBNAIL)}/>
                            <Typography>Live Images</Typography>
                        </div>
                    </Grow>
                    {volcanoObject.drumLink &&
                        <Grow in={true} {...(true ? { timeout: 1000*(2) } : {})}>
                        <div className={classes.sideItem} >
                            <img
                                src={volcanoObject.location === 'Vanuatu' ? volcanoObject.drumLink : `${volcanoObject.drumLink}-drum.png`} 
                                alt={name} 
                                width='100%' 
                                onClick={() => setCurrentDisplay(OverviewDisplay.DRUM_GRAPH)}
                            />
                            <Typography>Drum Plot</Typography>
                        </div>
                        </Grow>}
                    {volcanoObject.location !== 'Vanuatu' && volcanoObject.drumLink &&
                        <Grow in={true} {...(true ? { timeout: 1000*(3) } : {})}>
                            <div className={classes.sideItem} >
                                <img 
                                    src={`${volcanoObject.drumLink}-combined.png`} 
                                    alt={name} width='100%' 
                                    onClick={() => setCurrentDisplay(OverviewDisplay.RSAM)}
                                />
                                <Typography>RASM & SSAM</Typography>
                            </div>
                        </Grow>}
                </div>
                <div className={classes.imgContainer}>
                    {hasLoaded ? setDisplay(currentDisplay) : loadingUI}
                </div>
                {volcanoObject.relatedVolcanoes && (
                    <div className={classes.bottomSec}>
                    {volcanoObject.relatedVolcanoes.map((code, index) => {
                        const imgSrc = fetchSrc(code);
                        const volcano = volcanoes.find(v => v.code === code) as Volcano;
                        return (
                            <Link className={classes.link} to={`overview?volcano=${volcano.name}`} key={volcano.code} target='_blank'>
                                <Grow in={true} {...(true ? { timeout: 1000*(index+1) } : {})}>
                                    <div className={classes.sideItem}>
                                        <img src={imgSrc} alt={volcano.name} width='100%'/>
                                        <Typography>{volcano.name}</Typography>
                                    </div>
                                </Grow>
                            </Link>
                        )
                    })}
                    </div>
                )}  
            </div>
        </div>
    );
};

export default withStyles(styles)(VolcanoOverview);
