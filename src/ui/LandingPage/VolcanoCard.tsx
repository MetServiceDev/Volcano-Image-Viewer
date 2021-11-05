import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles, createStyles, WithStyles } from '@material-ui/styles';
import { Paper, Typography } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import AlertIcon from '../ReusedComponents/AlertIcon';
import VolcanoThumbnails from '../ReusedComponents/VolcanoThumbnails';
import { Volcano } from '../../api/volcano/headers';

const styles = () => createStyles({
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
    alerIcon: {
        position:'absolute',
        right:'8%',
        top:'1%'
    },
    alertBulletin: {
        position:'absolute',
        height:'5vh',
        zIndex: 5,
        right:'-10%',
        padding:'10px',
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
                    <span className={classes.alerIcon}>{alert && 
                        <AlertIcon data={alert} fontSize={fontSize}/>}
                    </span>
                    <OpenInNewIcon className={classes.icon} style={{ fontSize }}/>
                </div>
                <VolcanoThumbnails volcano={volcano}/>
            </Paper>
        </Link>
    );
};

export default withStyles(styles)(VolcanoCard);
