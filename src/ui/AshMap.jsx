import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import ash from '../images/vanuatu_2000m_202105170200_Ash.png';
import dust from '../images/vanuatu_2000m_202105170200_Dust.png';
import { useState } from 'react';
import color from '../images/vanuatu_1000m_202105170450_True-Colour.png';
import PropTypes from 'prop-types';
import MetaTags from 'react-meta-tags';

const styles = {
    root:{},
    headerDiv: {
        padding:'20px',
        backgroundColor:'white',
        borderBottom: '1px solid #404040',
        position:'fixed',
        width: '100%'
    },
    homeIcon: {
        borderRadius: '5px',
        marginRight:'10px'
    },
    headerText: {
        display:'inline',
        verticalAlign:'middle'
    },
    sidebar: {
        width:'10%',
        backgroundColor:'white',
        boxShadow: '-2px 0px 8px #404040',     
        height: '100%',
        position:'fixed',
        zIndex:-2,
        padding: '20px'
    },
    sidebarInner: {
        display: 'grid',
        gridTemplateRows: '1fr 1fr 1fr',
        height:'80%',
        marginTop:'100px'
    },
    img: {
        position: 'absolute',
        width:'80%'
    },
    mainImg: {
        position: 'absolute',
        width:'70%',
        left: '25%',
        top:'15%'
    },
    sidebarItem: {
        opacity: '0.7',
        cursor: 'pointer',
        transition: '0.5s',
        '&:hover':{
            opacity: '1',
        }
    },
    text: {
        position: 'relative',
        bottom:'-60%',
        textAlign:'center'
    }
}

const metadata = [
    {
        img:ash,
        value: 'ASH',
        name:'Ash'
    },
    {
        img: dust,
        value: 'DUST',
        name: 'Dust'
    },
    {
        img: color,
        value: 'COLOR',
        name:'True color'
    }
]

export const AshMapOverview = ({classes}) => {

    const [currentDisplay, setCurrentDisplay] = useState('ASH')

    const setDisplay = (currentDisplay) => {
        switch(currentDisplay){
            case 'ASH':
                return renderImg(ash)
            case 'DUST':
                return renderImg(dust)
            case 'COLOR':
                return renderImg(color)
            default:
                return
        }
    }

    const renderImg = (type) => {
        return (
            <div>
                <img src={'https://loopy-files.s3-ap-southeast-2.amazonaws.com/grid.png'} style={{zIndex:5}} alt='Satellite' width='100%' className={classes.img}/>
                <img src={type} alt='Satellite' width='100%' className={classes.img}/>
            </div>
        );
    };

    return (
        <div>
            <MetaTags>
                <title>Vanuatu Satellite</title>
            </MetaTags>
            <div className={classes.headerDiv}>
                <Link className={classes.link} to='/'><Button className={classes.homeIcon} aria-label="return home"><HomeIcon style={{fontSize:'48px'}}/></Button></Link>
                <Typography variant='h3' className={classes.headerText}>Vanuatu Satellite</Typography>
            </div>
            <div className={classes.sidebar}>
                <div className={classes.sidebarInner}>
                {metadata.map((data, index) => {
                    return (
                        <div onClick={()=>{setCurrentDisplay(data.value)}} className={classes.sidebarItem} key={index}>
                            <img src={'https://loopy-files.s3-ap-southeast-2.amazonaws.com/grid.png'} style={{zIndex:5}} alt='Satellite' width='100%' className={classes.img}/>
                            <img src={data.img} alt='Satellite' width='100%' className={classes.img}/>
                            <Typography variant='body1' className={classes.text}>{data.name}</Typography>
                        </div>
                    );
                })} 
                </div>
            </div>
            <div className={classes.mainImg}>{setDisplay(currentDisplay)}</div>
        </div>
    )
};

AshMapOverview.propTypes = {
    classes:PropTypes.object
};

export default withStyles(styles)(AshMapOverview);
