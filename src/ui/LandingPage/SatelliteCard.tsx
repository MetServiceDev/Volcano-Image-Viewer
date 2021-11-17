import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Paper, Theme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppState } from '../../redux/store';
import { apiEndpoint } from '../../metadata/Endpoints';
import { User } from '../../api/User/headers';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width:'100%',
        backgroundColor: theme.palette.background.default,
        borderRadius: '5%'
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
        backgroundColor: theme.palette.background.default,
        borderRadius: '5%'
    },
}));

interface Props {
    fontSize: string
}

const SatelliteCard: React.FC<Props> = ({ fontSize }) => {
    const classes = useStyles();
    const [dateString, setDate] = React.useState<string>('');

    const { gridDisplay } = useSelector((state: AppState) => state);
    const user = useSelector((state:AppState) => state.login) as User;

    React.useEffect(() => {
        if (user) {
            fetch(`${apiEndpoint}/utc`, {
                headers: { 'Authorization' : user.token }
            }).then(res => res.text()).then(data => setDate(data)).catch(err => console.log(err))
        }
    }, [user]);
    

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
            <Paper elevation={3} className={classes.root}>
                <div className={classes.header}>
                    <Typography variant='h4' style={{fontSize:fontSize}}>
                        Vanuatu {dateString}-UTC
                    </Typography>
                </div>
                {ashImg()}            
            </Paper>
        </Link>
    );
};

export default SatelliteCard;
