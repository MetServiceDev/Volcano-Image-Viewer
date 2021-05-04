import { withStyles } from '@material-ui/styles';
import { ExternalLinks } from '../ExternalLinks';
import SidebarItem from './SidebarItem';
import PropTypes from 'prop-types';

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
        top:'9%',
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

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Sidebar);
