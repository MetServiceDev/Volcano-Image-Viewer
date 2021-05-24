import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import PropTypes from 'prop-types';

const styles = {
    root: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        cursor: 'pointer'
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
    div: {
        margin:'10px',
        position:'relative',
        '&:hover':{
            boxShadow:'4px 4px 8px #404040'
        },
    },
    link: {
        textDecoration:'none'
    },
    icon: {
        color:'#404040',
        fontSize:'28px',
        position:'absolute',
        right:'1%',
        top:'1%'
    },
};

const SulfurMaps = ({classes, sulfurMaps}) => {
    return (
        <div className={classes.root}>
            {sulfurMaps.map((so2, index) => {
                return (
                    <Link className={classes.link} to={{pathname: so2.link}} target='_blank' key={index}>
                        <Paper className={classes.div} elevation={3}>
                            <div className={classes.header}>
                                <Typography variant='h4' className={classes.nameText} name='volcano-text'>{so2.name}</Typography>
                                <OpenInNewIcon className={classes.icon}/>            
                            </div>
                            <img src={so2.img} alt={so2.name} width='100%'/>
                        </Paper>
                    </Link>
                );
            })};
        </div>
    )
};

SulfurMaps.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SulfurMaps);
