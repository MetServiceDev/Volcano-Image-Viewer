import { withStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import InboxIcon from '@material-ui/icons/Inbox';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { useState } from 'react';

const styles = {
    root: {
        position: 'fixed',
        height: '100vh',
        backgroundColor: 'white',
        boxShadow: '-2px -2px 8px #404040',
        transition: '0.5s',
    },
    content: {
        position: 'relative',
        top:'5%',
        height: '92vh',
        overflow: 'auto',
        overflowX:'hidden'
    },
    emptyDash: {
        position: 'absolute',
        textAlign: 'center',
        top:'15%',
        left: '5%'
    },
    emptyIcon:{
        fontSize: 256
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
}

const DashSidebar = ({classes}) => {
    const savedDashboards = useSelector(state => state.userDashboards);
    const [showMenu, setMenu] = useState(true);

    const emptyData = () => {
        return (
            <div className={classes.emptyDash}>
                <Typography variant='h4'>No Saved Dashboards</Typography>
                <InboxIcon className={classes.emptyIcon}/>
            </div>
        );
    };

    const style = {
        width: `${showMenu ? '20':'2'}%`
    };

    return (
        <div className={classes.root} style={style}>
            <div className={classes.content}>
                {showMenu ? <MenuOpenIcon className={classes.menuIcon} onClick={()=>{setMenu(!showMenu)}}/> : <MenuIcon className={classes.collapseIcon} onClick={()=>{setMenu(!showMenu)}}/>}
                {showMenu && 
                    <div>
                        {savedDashboards?.length ? null : emptyData()}
                    </div>}
            </div>
        </div>
    )
};

export default withStyles(styles)(DashSidebar);