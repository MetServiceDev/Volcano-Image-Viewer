import { useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import VolcanoThumbnails from './VolcanoThumbnails';
import { withStyles } from '@material-ui/styles';
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router-dom';
import Grow from '@material-ui/core/Grow';
import PropTypes from 'prop-types';
import { imageBucket } from '../Endpoints';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import VolcanicAlert from './VolcanicAlert';
import AlertIcon from './AlertIcon';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const styles = {
    root: {
    },
    imgContainer: {
        width:'50%',
        position: 'absolute',
        left: '30%',
        top: '2%'
    },
    mainPanel:{
        position: 'absolute',
        width: '100%',
        height: '80vh',
        borderBottom: '1px solid #404040',
    },
    sidebar: {
        width:'10%',
        backgroundColor:'white',
        boxShadow: '-2px 0px 8px #404040',
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
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        margin:'auto',
        padding: '20px',
        textAlign: 'center',
        position: 'absolute',
        bottom: '-25%',
    },
    link: {
        textDecoration: 'none',
        color: '#404040'
    },
    headerDiv: {
        padding:'20px',
        backgroundColor:'white',
        borderBottom: '1px solid #404040',
    },
    homeIcon: {
        borderRadius: '5px',
        marginRight:'10px'
    },
    headerText: {
        display:'inline',
        verticalAlign:'middle',
        textAlign:'center'
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
        marginLeft:'20px',
        cursor: 'pointer'
    }
};

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const VolcanoOverview = ({classes, volcanoes}) => {
    let query = useQuery();
    const volcano = query.get('volcano')
    const volcanoObject = volcanoes.find(v => v.name === volcano);
    const name = volcanoObject.name
    const volcanicAlerts = useSelector(state => state.volcanicAlerts) || {};
    const volcanoAlert = volcanicAlerts.find(v => v.volcano === volcanoObject.mountain);
    const [showAlert, toggleAlert] = useState(true)
    const [currentDisplay, setCurrentDisplay] = useState('THUMBNAIL')
    const landingImg = `${imageBucket}/${volcanoObject.s3Link}/${volcanoObject.s3Link}-12.jpg`

    const setDisplay = (currentDisplay) => {
        switch(currentDisplay){
            case 'THUMBNAIL':
                return <div><VolcanoThumbnails volcano={volcanoObject}/></div>;
            case 'DRUM_GRAPH':
                return <img src={volcanoObject.location === 'Vanuatu' ? volcanoObject.drumLink : `${volcanoObject.drumLink}-drum.png`} alt={volcanoObject.name} width='100%'/>
            case 'RSAM':
                return <img src={`${volcanoObject.drumLink}-combined.png`} alt={volcanoObject.name} width='100%'/>
            default:
                return
        }
    }

    return(
        <div className={classes.root}>
            <MetaTags>
                <title>{name}</title>
            </MetaTags>
            <div className={classes.headerDiv}>
                <Link className={classes.link} to='/'><Button className={classes.homeIcon} aria-label="return home"><HomeIcon style={{fontSize:'36px'}}/></Button></Link>
                <Typography variant='h3' className={classes.headerText}>{name}</Typography>
                {volcanoAlert && showAlert ? 
                    <VolcanicAlert data={volcanoAlert} toggle={()=>{toggleAlert(!showAlert)}}/> : volcanoAlert && 
                    <span className={classes.alerIcon}><AlertIcon data={volcanoAlert} toggle={()=>{toggleAlert(!showAlert)}}/></span>
                }
            </div>
            <div className={classes.mainPanel}>
                <div className={classes.sidebar}>
                    <div className={classes.sideItem}>
                        <img src={landingImg} alt={volcano.name} width='100%' onClick={() => {setCurrentDisplay('THUMBNAIL')}}/>
                        <Typography>Live Images</Typography>
                    </div>
                    {volcanoObject.drumLink &&
                        <div className={classes.sideItem} >
                            <img 
                                src={volcanoObject.location === 'Vanuatu' ? volcanoObject.drumLink : `${volcanoObject.drumLink}-drum.png`} 
                                alt={volcanoObject.name} 
                                width='100%' 
                                onClick={() => {setCurrentDisplay('DRUM_GRAPH')}}
                            />
                            <Typography>Drum Plot</Typography>
                        </div>}
                    {volcanoObject.location !== 'Vanuatu' && volcanoObject.drumLink && 
                        <div className={classes.sideItem} >
                            <img 
                                src={`${volcanoObject.drumLink}-combined.png`} 
                                alt={volcanoObject.name} width='100%' 
                                onClick={() => {setCurrentDisplay('RSAM')}}
                            />
                            <Typography>RASM & SSAM</Typography>
                        </div>}
                </div>
                <div className={classes.imgContainer}>
                    {setDisplay(currentDisplay)}
                </div>
            </div>
            <div className={classes.bottomSec}>
                {volcanoObject.relatedVolcanoes && volcanoObject.relatedVolcanoes.map((vol, index) => {
                    const volcano = volcanoes.find(v => v.code === vol);
                    const s3Tag = volcano.s3Link || ''
                    const src = `${imageBucket}/${s3Tag}/${s3Tag}-12.jpg`
                    return (
                        <Link className={classes.link} to={volcano.name} target='_blank' key={volcano.code}>
                            <Grow in={true} {...(true ? { timeout: 1000*(index+1) } : {})}>
                                <div>
                                    <img src={src} alt={volcano.name} width='40%' className={classes.relatedVolcanoes}/>
                                    <Typography variant='h5'>{volcano.name}</Typography>
                                </div>
                            </Grow>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
};

VolcanoOverview.propTypes = {
    classes: PropTypes.object.isRequired,
    volcanoes: PropTypes.array.isRequired
};

export default withStyles(styles)(VolcanoOverview);
