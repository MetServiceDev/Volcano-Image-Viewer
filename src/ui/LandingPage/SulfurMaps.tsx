import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { Theme, Paper, Typography, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        wrap: 'nowrap'
    },
    header: {
        borderBottom: '1px solid #404040',
        padding: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        
    },
    div: {
        margin: theme.spacing(1),
        '&:hover':{
            boxShadow:'4px 4px 8px #404040'
        },
        backgroundColor: theme.palette.background.default,
    },
    link: {
        textDecoration:'none'
    },
}));

interface SulfurMap {
    link: string,
    name: string,
    img: string
}

interface Props {
    sulfurMaps: SulfurMap[]
}

const SulfurMaps: React.FC<Props> = ({ sulfurMaps }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {sulfurMaps.map((so2: any, index: number) => (
                <Link
                    className={classes.link}
                    to={{pathname: so2.link}}
                    target='_blank'
                    key={index}
                >
                    <Paper className={classes.div} elevation={3}>
                        <div className={classes.header}>
                            <Typography variant='h6'>
                                {so2.name}
                            </Typography>       
                        </div>
                        <Divider/>
                        <img
                            src={so2.img}
                            alt={so2.name}
                            width='100%'
                        />
                    </Paper>
                </Link>
            ))}
        </div>
    )
};

export default SulfurMaps;
