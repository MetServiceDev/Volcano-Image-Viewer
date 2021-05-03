import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useState } from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        marginBottom: '20px'
    },  
    expandButton: {
        display: 'inline',
        verticalAlign: 'middle',
        cursor: 'pointer'
    },
    textHeader: {
        display: 'inline',
        verticalAlign: 'middle',
        fontWeight: 'bold'
    },
    link: {
        color: '#404040',
        transition:'0.25s',
        '&:hover':{
            color: '#03fcf8'
        },
    }
}


const SidebarItem = ({classes, link}) => {
    const [expand, toggleExpand] = useState(true)

    const toggle = () => {
        toggleExpand(!expand)
    }

    return (
        <div className={classes.root}>
            {expand ? <ArrowDropDownIcon className={classes.expandButton} onClick={toggle}/> : <ArrowRightIcon className={classes.expandButton} onClick={toggle}/>}
            <Typography className={classes.textHeader}>{link.title}</Typography>
            {expand && link.li && link.li.map(li => {
                const style = {
                    display: 'grid',
                    gridTemplateColumns: `repeat(${li.length}, 1fr)`,
                    margin: '5px',
                    marginBottom: '10px',
                    width: '100%',
                    textAlign: 'left'
                }
                return (
                    <div style={style}>
                        {li.map(item => {
                            return <Link className={classes.link} to={{pathname: item.link}} target='_blank'><Typography variant='body2' >{item.name}</Typography></Link>
                        })}
                    </div>
            )})}
        </div>
    )
};

export default withStyles(styles)(SidebarItem);
