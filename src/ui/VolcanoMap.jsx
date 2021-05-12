import { Link } from 'react-router-dom';
import VolcanoThumbnails from './VolcanoThumbnails';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { useSelector  } from 'react-redux'

const styles = {
    root: {
        display: 'grid',
    },
    div: {
        margin:'2px',
        position:'relative',
        '&:hover': {
            boxShadow:'4px 4px 8px #404040'
        },
    },
    link: {
        textDecoration:'none'
    },
    header: {
        borderBottom: '1px solid #404040',
        color:'#404040',
    },
    nameText: {
        display:'inline',
        verticalAlign: 'middle',
        padding:'10px',
        
    },
    icon: {
        color:'#404040',
        position:'absolute',
        right:'1%',
        top:'1%'
    },
};

const VolcanoMap = ({classes, volcanoes}) => {

    const gridDisplay = useSelector(state => state.gridDisplay);
    const showNZ = useSelector(state => state.showNZ);
    const showVA = useSelector(state => state.showVA);
    const showCNI = useSelector(state => state.showCNI);
    const showWI = useSelector(state => state.showWI);

    const gridLayout = {
        gridTemplateColumns: `repeat(${gridDisplay}, 1fr)`,
    };

    const fontSize = gridDisplay === 6 ? '20px' : '28px';

    const renderVolcano = volcano => {
        return (
            <Link className={classes.link} to={volcano.name} target='_blank' key={volcano.code} name='volcano-item'>
                <Paper className={classes.div} elevation={3}>
                    <div className={classes.header}>
                        <Typography variant='h4' className={classes.nameText} name='volcano-text' style={{fontSize:fontSize}}>{volcano.name}</Typography>
                        <OpenInNewIcon className={classes.icon} style={{fontSize:fontSize}}/>
                    </div>
                    <VolcanoThumbnails volcano={volcano}/>
                </Paper>
            </Link>
        );
    };

    return (
        <div className={classes.root} style={gridLayout}>
                {volcanoes.map(volcano => {
                    return(
                        <Fragment key={volcano.code}>
                            {volcano.location === 'Vanuatu' && showVA && renderVolcano(volcano)}
                            {volcano.location === 'NZ' && showNZ && renderVolcano(volcano)}
                            {volcano.location === 'Central NI' && showCNI && renderVolcano(volcano)}
                            {volcano.location === 'WI' && showWI && renderVolcano(volcano)}
                        </Fragment>
                    ); 
                })}
            </div>
    );
};

VolcanoMap.propTypes = {
    classes: PropTypes.object.isRequired,
    volcanoes: PropTypes.array.isRequired,
};

export default withStyles(styles)(VolcanoMap);
