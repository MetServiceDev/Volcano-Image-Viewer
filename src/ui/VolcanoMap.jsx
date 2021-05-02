import { Volcanoes } from '../Volcanoes';
import { Link } from 'react-router-dom';
import VolcanoThumbnails from './VolcanoThumbnails';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const styles = {
    root: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        width:'100%'
    },
    div: {
        margin:'10px',
        position:'relative',
        '&:hover':{
            boxShadow:'4px 4px 8px #404040'
        }
    },
    link: {
        textDecoration:'none'
    },
    header: {
        borderBottom: '1px solid #404040',
        color:'#404040'
    },
    nameText: {
        display:'inline',
        verticalAlign: 'middle',
        padding:'10px'
    },
    icon: {
        color:'#404040',
        fontSize:'28px',
        position:'absolute',
        right:'1%',
        top:'1%'
    }
}

const VolcanoMap = ({classes}) => {
    return (
        <div className={classes.root}>
            {Volcanoes.map((volcano, index) => {
                const name = volcano.name.replace(/_/g, ' ') 
                return <Link className={classes.link} to={volcano.name} target='_blank' key={index}>
                            <Paper className={classes.div} elevation={3}>
                                <div className={classes.header}>
                                    <Typography variant='h4' className={classes.nameText}>{name}</Typography>
                                    <OpenInNewIcon className={classes.icon}/>
                                </div>
                                <VolcanoThumbnails volcano={volcano}/>
                            </Paper>
                        </Link>
            })}
        </div>
    )
}

export default withStyles(styles)(VolcanoMap);
