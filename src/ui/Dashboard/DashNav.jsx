import { withStyles } from '@material-ui/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const styles = {
    root: {
        backgroundColor: 'white',
        position:'fixed',
        width:'100%',
        padding:'10px',
        borderBottom: '1px solid #404040',
        zIndex: '5'
    },
    rightSide: {
        float:'right',
        marginRight:'60px',
    },
    userTag: {
        display:'inline'
    },
    userIcon: {    
        verticalAlign:'middle',
        fontSize:'28px',
        color:'#404040',
        marginLeft:'5px'
    },
    homeIcon: {
        color:'#404040',
        marginLeft:'10px',
    }
}

const DashNav = ({classes}) => {
    const user = useSelector(state => state.user);
    const { firstName, lastName } = user;
    return (
        <div className={classes.root}>
            <Link to='/'><ButtonBase><HomeIcon className={classes.homeIcon}/></ButtonBase></Link>
            <div className={classes.rightSide}>
                <Typography variant='body1' className={classes.userTag}>{firstName} {lastName}</Typography>
                <AccountCircleIcon className={classes.userIcon}/>
            </div>
        </div>
    );
    
};

export default withStyles(styles)(DashNav);
