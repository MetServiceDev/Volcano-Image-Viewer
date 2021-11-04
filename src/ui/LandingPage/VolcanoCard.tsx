import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { withStyles, createStyles, WithStyles } from '@material-ui/styles';
import { Paper, Typography } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import AlertIcon from '../ReusedComponents/AlertIcon';
import VolcanoThumbnails from '../ReusedComponents/VolcanoThumbnails';
import { Volcano } from '../../api/volcano/headers';
import { AppState } from '../../redux/store';

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

const setBG = (level: string) => {
    switch(level){
        case '0':
            case '1':
            return 'rgba(3, 252, 119, 1)'
        case '2':
            return 'rgba(252, 190, 3, 1)'
        case '3':
        case '4':
        case '5':
            return 'rgba(255, 46, 46, 1)'
        default:
            return
    };
}

interface Props extends WithStyles<typeof styles> {
    volcano: Volcano;
    fontSize: string;
};

const VolcanoCard: React.FC<Props> = ({ classes, volcano, fontSize }) => {

    const gridDisplay = useSelector((state: AppState) => state.gridDisplay);
    const alertFontSize = gridDisplay === 6 ? '14px' : '16px';
    const bulletinWidth = gridDisplay === 6 ? '70%' : '50%';
    const [showAlert, setAlertVisibility] = React.useState(false);

    const renderAlertBulletin = (alert: any) => {
        return (
            <div>
                {alert && showAlert &&
                <Paper elevation={3} className={classes.alertBulletin} style={{border:`1px solid ${setBG(alert.level)}`,width:bulletinWidth}}>
                    <Typography>Alert level {alert.level}</Typography>
                    <Typography style={{fontWeight:'bold',fontSize:alertFontSize}}>{alert.msg}</Typography>
                </Paper>}
            </div>
        );
    };

    const renderVolcano = () => {
        const alert = volcano.volcanicAlerts
        return (
            <Link className={classes.link} to={`overview?volcano=${volcano.name}`} target='_blank' key={volcano.code}>
                <Paper className={classes.div} elevation={3}>
                    <div className={classes.header}>
                        <Typography variant='h4' className={classes.nameText} style={{fontSize:fontSize}}>
                            {volcano.name}
                        </Typography>
                        <span className={classes.alerIcon}>{alert && 
                            <AlertIcon data={alert} fontSize={fontSize}/>}
                        </span>
                        {renderAlertBulletin(alert)}
                        <OpenInNewIcon className={classes.icon} style={{fontSize:fontSize}}/>
                    </div>
                    <VolcanoThumbnails volcano={volcano}/>
                </Paper>
            </Link>
        );
    };
    return renderVolcano();
};

export default withStyles(styles)(VolcanoCard);
