import { withStyles } from '@material-ui/styles';
import { ExternalLinks } from '../ExternalLinks';
import SidebarItem from './SidebarItem';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { useDispatch, useSelector } from 'react-redux';
import { handleSidebar } from '../redux/actions';

const styles = {
    root: {
        backgroundColor: 'white',
        position: 'fixed',
        height:'100vh',
        boxShadow: '-2px -2px 8px #404040',
        transition: '0.5s'
    },
    content: {
        position: 'relative',
        top:'7%',
        padding:'5px',
        height: '92vh',
        overflow: 'auto',
    },
    menuIcon: {
        cursor: 'pointer',
        verticalAlign: 'middle',
        fontSize: '28px'
    },
};

const Sidebar = ({classes}) => {
    const dispatch = useDispatch()
    const showMenu = useSelector(state => state.expandSidebar)
    const toggle = val => dispatch(handleSidebar(val))
    const style = {
        width: `${showMenu ? '15':'2'}%`
    };
    return (
        <div className={classes.root} style={style}>
            <div className={classes.content}>
                {showMenu ? <MenuOpenIcon className={classes.menuIcon} onClick={()=>{toggle(!showMenu)}}/> : <MenuIcon className={classes.menuIcon} onClick={()=>{toggle(!showMenu)}}/>}
                {showMenu && ExternalLinks.map((link, index) => {return <SidebarItem link={link} key={index}/>})}
            </div>
        </div>
    );
};

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);
