import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

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
            color: '#0e35c4'
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
            {expand && link.li && link.li.map((li, index) => {
                const style = {
                    display: 'grid',
                    gridTemplateColumns: `repeat(${li.length}, 1fr)`,
                    margin: '5px',
                    marginBottom: '10px',
                    width: '100%',
                    textAlign: 'left'
                }
                return (
                    <div style={style} key={index}>
                        {li.map((item, index) => {return item.link ? 
                            <Link key={index} className={classes.link} to={{pathname: item.link}} target='_blank'><Typography variant='body2'>{item.name}</Typography></Link> : 
                            <Typography variant='body1' key={index} style={{fontWeight:'bold'}}>{item.name}</Typography>
                        })}
                    </div>
            )})}
        </div>
    )
};

SidebarItem.propTypes = {
    classes: PropTypes.object.isRequired,
    link: PropTypes.object.isRequired,
};

export default withStyles(styles)(SidebarItem);
