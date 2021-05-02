import Typography from '@material-ui/core/Typography';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        textAlign: 'center',
        padding:'10px',
    },
    icon: {
        color: '#e31e10',
        fontSize:'128px'
    }
}

const ErrorMessage = ({classes, msg}) => {
    return (
        <div className={classes.root}>
            <ErrorOutlineIcon className={classes.icon}/>
            <Typography>{msg}</Typography>
        </div>
    );
};

export default withStyles(styles)(ErrorMessage);
