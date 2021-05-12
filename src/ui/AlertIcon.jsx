import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const styles = {
    root: {
        position:'absolute',
        right:'10%',
        top:'1%'
    },
    noWarning : {
        color: '#03fc77'
    },
    mediumWarning: {
        color: '#fcbe03'
    },
    severeWarning: {
        color: '#ff2e2e'
    }
}

const AlertIcon = ({classes, data, showAlert, fontSize}) => {
    
    const getIcon = () => {
        switch(data.alertLevel){
            case '0':
                return <CheckCircleOutlineOutlinedIcon className={classes.noWarning} style={{fontSize}}/>
            case '1':
            case '2':
                return <ReportProblemOutlinedIcon className={classes.mediumWarning} style={{fontSize}}/>
            case '3':
            case '4':
            case '5':
                return <ErrorOutlineOutlinedIcon className={classes.severeWarning} style={{fontSize}}/>
            default:
                return
        };
    }

    return (
        <div className={classes.root} onMouseEnter={showAlert} onMouseLeave={showAlert}>
            {getIcon()}
        </div>     
    );
};

AlertIcon.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    showAlert: PropTypes.func,
    fontSize: PropTypes.string.isRequired
};

AlertIcon.defaultProps = {
    showAlert: () => {},
};

export default withStyles(styles)(AlertIcon);
