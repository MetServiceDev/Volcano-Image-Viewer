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
    alertBulletin: {
        position:'absolute',
        height:'10vh',
        width:'50%',
        zIndex:'5',
        right:'-10%',
        padding:'10px'
    }
};

const VolcanoCard = ({classes, volcano, fontSize}) => {

    const eruptionAlerts = useSelector(state => state.eruptionAlerts);
    const [showAlert, setAlertVisibility] = useState(false)

    const renderAlertBulletin = alert => {
        return (
            <div>
                {alert && showAlert &&
                <Paper elevation={3} className={classes.alertBulletin}>
                    <Typography>Alert level {alert.alertLevel}</Typography>
                    <Typography>{alert.alertMsg}</Typography>
                </Paper>}
            </div>
        )
    }

    const renderVolcano = () => {
        const alert = eruptionAlerts.find(v => v.volcano === volcano.mountain);
        return (
            <Link className={classes.link} to={volcano.name} target='_blank' key={volcano.code} name='volcano-item'>
                <Paper className={classes.div} elevation={3}>
                    <div className={classes.header}>
                        <Typography variant='h4' className={classes.nameText} name='volcano-text' style={{fontSize:fontSize}}>{volcano.name}</Typography>
                        {alert && <AlertIcon data={alert} showAlert={() => {setAlertVisibility(!showAlert)}} fontSize={fontSize}/>}
                        {renderAlertBulletin(alert)}
                        <OpenInNewIcon className={classes.icon} style={{fontSize:fontSize}}/>
                    </div>
                    <VolcanoThumbnails volcano={volcano}/>
                </Paper>
            </Link>
        );
    };



    return (
        <div>
            {renderVolcano()}
        </div>
    );
};

VolcanoCard.propTypes = {
    classes: PropTypes.object.isRequired,
    volcano: PropTypes.object.isRequired,
    fontSize: PropTypes.string.isRequired
};

export default withStyles(styles)(VolcanoCard);
