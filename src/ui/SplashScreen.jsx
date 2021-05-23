import { withStyles } from '@material-ui/styles';
import icon from '../images/volcano.png';
import Fade from '@material-ui/core/Fade';

const styles = {
    root: {
        position:'fixed',
        width:'100%',
        left: '0%',
        top:'0%',
        height: '100vh',
        backgroundColor: 'white',
        zIndex:20
    },
    iconContainer: {
        boxShadow: '2px 2px 8px #404040',
        borderRadius: '100%',
        width:'25%',
        height: '50vh',
        display: 'block',
        marginLeft:'auto',
        marginRight: 'auto',
        marginTop:'100px'
    },
    icon: {
        paddingTop:'20px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
}

const SplashScreen = ({classes}) => {
    return(
        <div className={classes.root}>
            <Fade in={true} {...(true ? { timeout: 1000 } : {})}>
                <div className={classes.iconContainer}>
                    <img src={icon} alt='icon' className={classes.icon} width='70%'/>
                </div>
            </Fade>
        </div>
    );
};

export default withStyles(styles)(SplashScreen);
