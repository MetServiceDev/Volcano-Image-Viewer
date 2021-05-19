import { withStyles } from "@material-ui/styles";
import icon from '../images/volcano.png';
import MetaTags from 'react-meta-tags';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = {
    root: {},
    centerDiv: {
        display: 'block',
        width:'50%',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:'40px',
        textAlign: 'center'
    },
    link: {
        textDecoration: 'none',
        cursor: 'pointer',
    },
    button: {
        width: '50%',
        border: '1px solid #ffbb00',
        backgroundColor: 'rgba(255, 187, 0, 0.25)',
        borderRadius:'0px',
        height:'10vh',
        marginTop:'20px',
        '&:hover': {
            backgroundColor: 'rgba(255, 187, 0, 0.5)'
        }    
    },
    text: {
        fontWeight: 'bold',
        color: 'rgba(255, 187, 0, 0.75)',
    }
}

const ErrorPage = ({classes}) => {
    return (
        <div className={classes.root}>
            <MetaTags>
                <title>Not Found</title>
            </MetaTags>
            <div className={classes.centerDiv}>
            <Typography variant='h1' className={classes.text}>404</Typography>
                <Typography variant='h3' className={classes.text}>Volcano Not Found</Typography>
                <img src={icon} alt='icon.png' width='50%'/><br/>
                <Link to='/' className={classes.link}><Button className={classes.button}>Return Home</Button></Link>
            </div>
        </div>
    )
};

export default withStyles(styles)(ErrorPage);