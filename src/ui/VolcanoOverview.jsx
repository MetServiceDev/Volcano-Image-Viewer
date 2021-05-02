import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import VolcanoThumbnails from './VolcanoThumbnails';
import { Volcanoes } from '../Volcanoes';
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        margin:'20px'
    },
    imgContainer: {
        width:'50%'
    }
}

const VolcanoOverview = ({classes}) => {
    const { volcano } = useParams()
    const volcanoObject = Volcanoes.find(v => v.name === volcano);
    const name = volcanoObject.name.replace(/_/g, ' ');

    return(
        <div className={classes.root}>
            <Typography variant='h3'>{name}</Typography>
            <div className={classes.imgContainer}>
                <VolcanoThumbnails volcano={volcanoObject}/>
            </div> 
        </div>
    );
};

export default withStyles(styles)(VolcanoOverview);
