import { Link } from 'react-router-dom';
import VolcanoThumbnails from './VolcanoThumbnails';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import AlertIcon from './AlertIcon';
import { useState } from 'react';

const styles = {
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
        zIndex:'5',
        right:'-10%',
        padding:'10px',
    }
};

const setBG = (level) => {
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

const VolcanoCard = ({classes, volcano, fontSize}) => {

    const volcanicAlerts = useSelector(state => state.volcanicAlerts);
    const gridDisplay = useSelector(state => state.gridDisplay);
    const alertFontSize = gridDisplay === 6 ? '14px' : '16px';
    const bulletinWidth = gridDisplay === 6 ? '70%' : '50%';
    const [showAlert, setAlertVisibility] = useState(false);

    const renderAlertBulletin = alert => {
        return (
            <div>
                {alert && showAlert &&
                <Paper elevation={3} className={classes.alertBulletin} style={{border:`1px solid ${setBG(alert.alertLevel)}`,width:bulletinWidth}}>
                    <Typography>Alert level {alert.alertLevel}</Typography>
                    <Typography style={{fontWeight:'bold',fontSize:alertFontSize}}>{alert.alertMsg}</Typography>
                </Paper>}
            </div>
        );
    };

    const renderVolcano = () => {
        const alert = volcanicAlerts.find(v => v.volcano === volcano.mountain);
        return (
            <Link className={classes.link} to={`overview?volcano=${volcano.name}`} key={volcano.code} name='volcano-item'>
                <Paper className={classes.div} elevation={3}>
                    <div className={classes.header}>
                        <Typography variant='h4' className={classes.nameText} name='volcano-text' style={{fontSize:fontSize}}>{volcano.name}</Typography>
                        <span className={classes.alerIcon}>{alert && 
                            <AlertIcon data={alert} showAlert={() => {setAlertVisibility(true)}} hideAlert={() => {setAlertVisibility(false)}} fontSize={fontSize}/>}
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

VolcanoCard.propTypes = {
    classes: PropTypes.object.isRequired,
    volcano: PropTypes.object.isRequired,
    fontSize: PropTypes.string.isRequired
};

export default withStyles(styles)(VolcanoCard);
