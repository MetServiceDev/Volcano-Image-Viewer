import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Paper, Theme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import apiCall from '../../api/APICall';
import { AppState } from '../../redux/store';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width:'100%',
        backgroundColor: theme.palette.background.default
    },
    header: {
        borderBottom: '1px solid #404040',
        color:theme.palette.text.primary,
    },
    img: {
        position: 'absolute',
    },
    grid: {
        display: 'grid',
        gridTemplateCOLUMNS: '1fr 1fr'
    },
    link: {
        textDecoration:'none',
        backgroundColor: theme.palette.background.default
    },
}));

interface Props {
    fontSize: string
}

const SatelliteCard: React.FC<Props> = ({ fontSize }) => {
    const classes = useStyles();
    const [dateString, setDate] = React.useState('');

    const { gridDisplay, login } = useSelector((state: AppState) => state);

    React.useEffect(() => {
        if (login) {
            apiCall('get-utc-date', 'GET', login).then(date => {
                setDate(date.body)
            })
        }
    }, [login]);
    

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
