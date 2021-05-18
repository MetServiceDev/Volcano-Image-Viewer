import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ash from '../images/vanuatu_2000m_202105170200_Ash.png';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const styles = {
    root: {
        width:'100%'
    },
    header: {
        borderBottom: '1px solid #404040',
        color:'#404040',
    },
    img: {
        position: 'absolute',
        width:'25%'
    },
    grid: {
        display: 'grid',
        gridTemplateCOLUMNS: '1fr 1fr'
    },
    link: {
        textDecoration:'none'
    },
}

const SatelliteCard = ({classes, fontSize}) => {

    const ashImg = () => {
        return (
            <div>
                <img src={'https://loopy-files.s3-ap-southeast-2.amazonaws.com/grid.png'} style={{zIndex:5}} alt='Satellite' width='100%' className={classes.img}/>
                <img src={ash} alt='Satellite' width='100%' className={classes.img}/>
            </div>
        );
    };

    return (
        <Link className={classes.link} to='Vanuatu Ash Map' target='_blank'>
            <div className={classes.root}>
                <Paper elevation={3}>
                    <div className={classes.header}>
                        <Typography variant='h4' className={classes.nameText} name='volcano-text' style={{fontSize:fontSize}}>Vanuatu Ash Map</Typography>
                    </div>
                    {ashImg()}            
                </Paper>
            </div>
        </Link>
    );
};

SatelliteCard.propTypes = {
    classes: PropTypes.object,
    fontSize: PropTypes.string.isRequired,
};

export default withStyles(styles)(SatelliteCard);
