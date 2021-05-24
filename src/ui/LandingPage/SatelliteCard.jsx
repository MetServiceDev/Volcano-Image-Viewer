import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import apiCall from '../../modules/APICall';

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

    const [dateString, setDate] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        apiCall('get-utc-date', 'GET', token).then(date => {
            setDate(date)
        })
    });

    const gridDisplay = useSelector(state => state.gridDisplay);
    

    const ashImg = () => {
        return (
            <div>
                <img src={'https://loopy-files.s3-ap-southeast-2.amazonaws.com/grid.png'} style={{zIndex:5,width:`${100/gridDisplay}%`}} alt='Satellite' width='100%' className={classes.img}/>
                <img src={`https://loopy-files.s3-ap-southeast-2.amazonaws.com/loopy-pix/Ash.png` } alt='Satellite' width='100%' className={classes.img} style={{width:`${100/gridDisplay}%`}}/>
            </div>
        );
    };

    return (
        <Link className={classes.link} to='Vanuatu Satellite' target='_blank'>
            <div className={classes.root}>
                <Paper elevation={3}>
                    <div className={classes.header}>
                        <Typography variant='h4' className={classes.nameText} name='volcano-text' style={{fontSize:fontSize}}>Vanuatu {dateString}-UTC</Typography>
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
