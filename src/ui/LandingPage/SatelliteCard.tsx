import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import apiCall from '../../api/APICall';
import { AppState } from '../../redux/store';

const useStyles = makeStyles(() => ({
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
}));

interface Props {
    fontSize: string
}

const SatelliteCard: React.FC<Props> = ({ fontSize }) => {
    const classes = useStyles();
    const [dateString, setDate] = React.useState('');
    const token = localStorage.getItem('token') as string

    React.useEffect(() => {
        apiCall('get-utc-date', 'GET', token).then(date => {
            setDate(date.body)
        })
    });

    const gridDisplay = useSelector((state: AppState) => state.gridDisplay);
    

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
                        <Typography variant='h4' style={{fontSize:fontSize}}>
                            Vanuatu {dateString}-UTC
                        </Typography>
                    </div>
                    {ashImg()}            
                </Paper>
            </div>
        </Link>
    );
};

export default SatelliteCard;
