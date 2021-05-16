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
        width:'100%'
    },
    topSec:{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        margin:'20px',
    },
    bottomSec: {
        width: '100%',
        borderTop: '1px solid #404040',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        margin:'auto',
        padding: '20px',
        textAlign: 'center'
    },
    link: {
        textDecoration: 'none',
        color: '#404040'
    },
    headerDiv: {
        margin:'20px',
    },
    homeIcon: {
        borderRadius: '5px',
        marginRight:'10px'
    },
    headerText: {
        display:'inline',
        verticalAlign:'middle'
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
            <div className={classes.topSec}>
                <div className={classes.imgContainer}>
                    <VolcanoThumbnails volcano={volcanoObject}/>
                </div>
                {volcanoObject.drumLink && <img src={volcanoObject.drumLink} alt={volcanoObject.name} width='100%'/>}
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
                                    <img src={src} alt={volcano.name} width='50%' className={classes.relatedVolcanoes}/>
                                    <Typography variant='h4'>{volcano.name}</Typography>
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
