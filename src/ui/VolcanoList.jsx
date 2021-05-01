import { Volcanoes } from '../Volcanoes';
import { Link } from 'react-router-dom';
import VolcanoThumbnails from './VolcanoThumbnails';
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    div: {
        margin:'20px'
    }
}

const VolcanoList = ({classes}) => {
    return (
        <div className={classes.root}>
            {Volcanoes.map((volcano, index) => { return <Link to={volcano.name} target='_blank' key={index}><div className={classes.div}><VolcanoThumbnails volcano={volcano}/></div></Link> })}
        </div>
    )
}

export default withStyles(styles)(VolcanoList);
