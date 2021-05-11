import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import VolcanoThumbnails from './VolcanoThumbnails';
import { withStyles } from '@material-ui/styles';
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router-dom';
import Grow from '@material-ui/core/Grow';
import PropTypes from 'prop-types';
import { endpoint, s3Endpoint } from '../ServerEndpoint';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';

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
        border: '1px solid #404040',
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
};

const VolcanoOverview = ({classes, volcanoes}) => {
    const { volcano } = useParams();
    const volcanoObject = volcanoes.find(v => v.name === volcano);
    const name = volcanoObject.displayName || volcanoObject.name
    return(
        <div className={classes.root}>
            <MetaTags>
                <title>{name}</title>
            </MetaTags>
            <div className={classes.headerDiv}>
                <Link className={classes.link} to='/'><Button className={classes.homeIcon} aria-label="return home"><HomeIcon style={{fontSize:'36px'}}/></Button></Link>
                <Typography variant='h3' className={classes.headerText}>{name}</Typography>
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
                    const src = volcano.location === 'Vanuatu' || volcano.code === 'ERB' ? `${endpoint}/Volcano/${volcano.name}/${volcano.code}_PICS12.jpg` : `${s3Endpoint}/${s3Tag}/${s3Tag}-12.jpg`
                    return (
                        <Link className={classes.link} to={volcano.name} target='_blank' key={volcano.code}>
                            <Grow in={true} {...(true ? { timeout: 1000*(index+1) } : {})}>
                                <div>
                                    <img src={src} alt={volcano.name} width='50%' className={classes.relatedVolcanoes}/>
                                    <Typography variant='h4'>{volcano.displayName || volcano.name}</Typography>
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
