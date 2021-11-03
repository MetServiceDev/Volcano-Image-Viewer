import React from 'react';
import { makeStyles } from '@material-ui/styles';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { useDispatch, useSelector } from 'react-redux';
import { ExternalLinks } from '../../metadata/ExternalLinks';
import SidebarItem from './SidebarItem';
import { toggleSidebar } from '../../redux/effects/sidebarEffect';
import { AppState } from '../../redux/store';

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: 'white',
        position: 'fixed',
        height:'100vh',
        boxShadow: '-2px -2px 8px #404040',
        transition: '0.5s',
    },
    content: {
        position: 'relative',
        top:'7%',
        height: '92vh',
        overflow: 'auto',
        overflowX:'hidden'
    },
    menuIcon: {
        cursor: 'pointer',
        verticalAlign: 'middle',
        fontSize: '28px',
        paddingTop:'2px'
    },
    collapseIcon: {
        cursor: 'pointer',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: '28px',
        paddingTop:'2px'
    }
}));

const Sidebar: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const showMenu = useSelector((state: AppState) => state.expandSidebar)
    const toggle = (val: boolean) => dispatch(toggleSidebar(val))
    const style = {
        width: `${showMenu ? '15':'2'}%`
    };

    const setSidebar = () => {
        toggle(!showMenu);
        localStorage.setItem('expandSidebar', String(!showMenu));
    }

    return (
        <div className={classes.root} style={style}>
            <div className={classes.content}>
                {showMenu ? <MenuOpenIcon className={classes.menuIcon} onClick={setSidebar}/> : <MenuIcon className={classes.collapseIcon} onClick={setSidebar}/>}
                {showMenu && ExternalLinks.map((link, index) => {return <SidebarItem link={link} key={index}/>})}
            </div>
        </div>
    );
};

export default Sidebar;
