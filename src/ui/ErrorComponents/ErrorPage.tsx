import React from 'react';
import { makeStyles } from "@material-ui/styles";
import { Theme, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import icon from '../../images/volcano.png';

const useStyles = makeStyles((theme: Theme) => ({
    root: {},
    centerDiv: {
        display: 'block',
        width:'50%',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:'40px',
        textAlign: 'center'
    },
    link: {
        textDecoration: 'none',
        cursor: 'pointer',
    },
    button: {
        width: '50%',
        border: `1px solid ${theme.palette.primary.main}`,
        backgroundColor: 'rgba(255, 187, 0, 0.25)',
        borderRadius:'0px',
        height:'10vh',
        marginTop:'20px',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark
        }    
    },
    text: {
        fontWeight: 'bold',
        color: 'rgba(255, 187, 0, 0.75)',
    }
}));

const ErrorPage: React.FC = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <div className={classes.centerDiv}>
            <Typography variant='h1' className={classes.text}>404</Typography>
                <Typography variant='h3' className={classes.text}>Volcano Not Found</Typography>
                <img src={icon} alt='icon.png' width='50%'/><br/>
                <Link to='/' className={classes.link}><Button className={classes.button}>Return Home</Button></Link>
            </div>
        </div>
    )
};

export default ErrorPage;
