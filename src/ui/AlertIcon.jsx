import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const styles = {
    noWarning : {
        color: '#03fc77'
    },
    mediumWarning: {
        color: '#fcbe03'
    },
    severeWarning: {
        color: '#ff2e2e'
    },
};

const AlertIcon = ({classes, data, showAlert, hideAlert, fontSize, toggle}) => {
    
    const getIcon = () => {
        switch(data.alertLevel){
            case '0':
            case '1':
                return <ReportProblemOutlinedIcon className={classes.noWarning} style={{fontSize}}/>;
            case '2':
            case '3':
                return <ReportProblemOutlinedIcon className={classes.mediumWarning} style={{fontSize}}/>;
            case '4':
            case '5':
                return <ErrorOutlineOutlinedIcon className={classes.severeWarning} style={{fontSize}}/>;
            default:
                return;
        };
    };

    return (
        <div onMouseEnter={showAlert} onMouseLeave={hideAlert} onClick={toggle}>
            {getIcon()}
        </div>     
    );
};

AlertIcon.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    showAlert: PropTypes.func,
    hideAlert: PropTypes.func,
    fontSize: PropTypes.string,
    toggle: PropTypes.func,
};

AlertIcon.defaultProps = {
    showAlert: () => {},
    hideAlert: () => {},
    toggle: () => {},
    fontSize: '28px'
};

export default withStyles(styles)(AlertIcon);
