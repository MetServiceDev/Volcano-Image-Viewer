import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import VolcanoThumbnails from './VolcanoThumbnails';
import { withStyles } from '@material-ui/styles';
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router-dom';
import Grow from '@material-ui/core/Grow';
import PropTypes from 'prop-types';

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
    headerText: {
        margin:'20px'
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
            <Typography variant='h3' className={classes.headerText}>{name}</Typography>
            <div className={classes.topSec}>
                <div className={classes.imgContainer}>
                    <VolcanoThumbnails volcano={volcanoObject}/>
                </div>
                {volcanoObject.drumLink && <img src={volcanoObject.drumLink} alt={volcanoObject.name} width='100%'/>}
            </div>
            <div className={classes.bottomSec}>
                {volcanoObject.relatedVolcanoes && volcanoObject.relatedVolcanoes.map((vol, index) => {
                    const volcano = volcanoes.find(v => v.code === vol);
                    return (
                        <Link className={classes.link} to={volcano.name} target='_blank' key={volcano.code}>
                            <Grow in={true} {...(true ? { timeout: 1000*(index+1) } : {})}>
                                <div>
                                    <img src={`http://10.100.21.161:4000/Volcano/${volcano.name}/${volcano.code}_PICS12.jpg`} alt={volcano.name} width='50%' className={classes.relatedVolcanoes}/>
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
