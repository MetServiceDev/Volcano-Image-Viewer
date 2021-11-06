import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles, createStyles, WithStyles } from '@material-ui/styles';
import { Paper, Typography, Theme } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import AlertIcon from '../ReusedComponents/AlertIcon';
import VolcanoThumbnails from '../ReusedComponents/VolcanoThumbnails';
import { Volcano } from '../../api/volcano/headers';

const styles = (theme: Theme) => createStyles({
    div: {
        margin:theme.spacing(1),
        position:'relative',
        '&:hover': {
            boxShadow:'4px 4px 8px #404040'
        },
        backgroundColor: theme.palette.background.default
    },
    link: {
        textDecoration:'none'
    },
    header: {
        borderBottom: '1px solid #404040',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    nameText: {
        padding: theme.spacing(0.5),
        
    },
    icon: {
        marginRight: theme.spacing(1), 
        marginLeft: theme.spacing(1),
    },
    icons: {
        marginRight: theme.spacing(1),
    }
});

interface Props extends WithStyles<typeof styles> {
    volcano: Volcano;
    fontSize: string;
};

const VolcanoCard: React.FC<Props> = ({ classes, volcano, fontSize }) => {
    const alert = volcano.volcanicAlerts
    return (
        <Link className={classes.link} to={`overview?volcano=${volcano.name}`} target='_blank' key={volcano.code}>
            <Paper className={classes.div} elevation={3}>
                <div className={classes.header}>
                    <Typography variant='h4' className={classes.nameText} style={{ fontSize }}>
                        {volcano.name}
                    </Typography>
                    <span className={classes.icons}>{alert && 
                        <AlertIcon data={alert} fontSize={fontSize}/>}
                        <OpenInNewIcon className={classes.icon} style={{ fontSize }}/>
                    </span>
                </div>
                <VolcanoThumbnails volcano={volcano}/>
            </Paper>
        </Link>
    );
};

export default withStyles(styles)(VolcanoCard);
