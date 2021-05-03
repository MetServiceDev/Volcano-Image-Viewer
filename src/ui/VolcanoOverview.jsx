import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import VolcanoThumbnails from './VolcanoThumbnails';
import { withStyles } from '@material-ui/styles';
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router-dom';

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
        margin:'10px'
    }
}

const VolcanoOverview = ({classes, volcanoes}) => {
    const { volcano } = useParams()
    const volcanoObject = volcanoes.find(v => v.name === volcano);
    const name = volcanoObject.name.replace(/_/g, ' ');

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
                {volcanoObject.relatedVolcanoes && volcanoObject.relatedVolcanoes.map(vol => {
                    const volcano = volcanoes.find(v => v.code === vol);
                    return (
                        <Link className={classes.link} to={volcano.name} target='_blank' key={volcano.code}><div>
                            <img src={`http://10.100.21.161:4000/${volcano.name}/${volcano.code}_PICS12.jpg`} alt={volcano.name} width='50%'/>
                            <Typography variant='h4'>{volcano.name.replace(/_/g, ' ')}</Typography>
                        </div></Link>
                    )
                })}
            </div>
        </div>
    );
};

export default withStyles(styles)(VolcanoOverview);
