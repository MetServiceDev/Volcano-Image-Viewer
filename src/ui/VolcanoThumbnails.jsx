import { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';
import Zoom  from '@material-ui/core/Zoom';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const styles = {
    root: {
        position:'relative',
    },
    overlay: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'black',
        backgroundColor: 'white'
    },
    indexDisplay: {
        position:'absolute',
        top:'5%',
        right: '10%',
        backgroundColor: 'rgba(219, 219, 219, 0.5)',
        borderRadius: '5px',
        padding: '10px',
        fontSize: '22px'
    }
}

const VolcanoThumbnail = ({classes, volcano}) => {
    const [thumbnail, setThumbnail] = useState('12')
    const imgList = ['', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    const [expand, toggleExpand] = useState(false)

    return(
        <div className={classes.root} onMouseLeave={()=>{toggleExpand(false)}}>
            <Paper>
                {expand && <Typography className={classes.indexDisplay}>{`${thumbnail === '' ? '1' : thumbnail}/12`}</Typography>}
                <img width={720} src={`http://10.100.21.161:4000/${volcano.name}/${volcano.code}_PICS${thumbnail}.jpg`} alt={volcano.name} onMouseOver={()=>{toggleExpand(true)}}/><br/>
                {expand && imgList.map((val, index) => {
                    return(
                        <Zoom in={expand} key={index}>
                            <img          
                                src={`http://10.100.21.161:4000/${volcano.name}/${volcano.code}_PICS${val}.jpg`} 
                                alt={volcano.name} 
                                width={60}
                                onMouseOver={()=>{setThumbnail(val)}}
                                className={classes.root}
                            />
                        </Zoom>                  
                    );
                })}
            </Paper>
        </div>    
    );
};

VolcanoThumbnail.propTypes = {
    classes: PropTypes.object,
    volcano: PropTypes.object.isRequired,
};

export default withStyles(styles)(VolcanoThumbnail);
