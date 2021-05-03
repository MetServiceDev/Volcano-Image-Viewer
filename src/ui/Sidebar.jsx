import { withStyles } from '@material-ui/styles';
import { ExternalLinks } from '../ExternalLinks';
import SidebarItem from './SidebarItem';

const styles = {
    root: {
        backgroundColor: 'white',
        position: 'fixed',
        height:'100vh',
        width:'15%',
        boxShadow: '-2px -2px 8px #404040',
    },
    content: {
        position: 'relative',
        top:'7%',
        padding:'5px',
        height: '100vh',
        overflow: 'auto'
    },
};

const Sidebar = ({classes}) => {
    return (
        <div className={classes.root}>
            <div className={classes.content}>
                {ExternalLinks.map((link, index) => {return <SidebarItem link={link} key={index}/>})}
            </div>
        </div>
    );
};

export default withStyles(styles)(Sidebar)