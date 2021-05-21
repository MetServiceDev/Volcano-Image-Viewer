import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import ash from '../images/vanuatu_2000m_202105170200_Ash.png';
import dust from '../images/vanuatu_2000m_202105170200_Dust.png';
import { useState, useEffect } from 'react';
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
        value: 'ASH',
        name:'Ash'
    },
    {
        value: 'DUST',
        name: 'Dust'
    },
    {
        value: 'COLOR',
        name:'True-Colour'
    }
]

const addzero = (n) => {
	var string = n.toString();
	if (n < 10) string = "0" + string;
	return string;
}

const AshMapOverview = ({classes}) => {

    const [currentDisplay, setCurrentDisplay] = useState(metadata[0]);
    const [dateString, setDate] = useState('');
    const [dateTime, setTime] = useState('');
    const [distance, setDistance] = useState('')
    const serverEndpoint = 'http://10.100.21.161:4500'

    

    useEffect(() => {
        var ms = 60000;
        var today = new Date(new Date()-30*ms);
        var Y = today.getUTCFullYear().toString()
        var M = addzero(today.getUTCMonth() + 1);
        var D = addzero(today.getUTCDate());
        var H = addzero(today.getUTCHours());
        var n = today.getMinutes();
        var quad = addzero((Math.floor(n/10))*10);
        var datetime = Y+M+D+H+quad;
        setTime(datetime);
        setDate(`${Y}-${M}-${D}-${H}${M}`)
        currentDisplay.name === 'True-Colour' ? setDistance('1000m') : setDistance('2000m')
    })

    const setDisplay = (currentDisplay) => {
        switch(currentDisplay.value){
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
        const src = `${serverEndpoint}/${currentDisplay.name}/${distance}/10MIN/vanuatu_${distance}_${dateTime}_${currentDisplay.name}.png`
        return (
            <div>
                <img src={'https://loopy-files.s3-ap-southeast-2.amazonaws.com/grid.png'} style={{zIndex:5}} alt='Satellite' width='100%' className={classes.img}/>
                <img src={src} alt='Satellite' width='100%' className={classes.img}/>
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
                <Typography variant='h3' className={classes.headerText}>Vanuatu {dateString}-UTC</Typography>
            </div>
            <div className={classes.sidebar}>
                <div className={classes.sidebarInner}>
                {metadata.map((data, index) => {
                    const dist = data.name === 'True-Colour' ? '1000m' : '2000m'
                    const src = `${serverEndpoint}/${data.name}/${dist}/10MIN/vanuatu_${dist}_${dateTime}_${data.name}.png`                 
                    return (
                        <div onClick={()=>{setCurrentDisplay(data)}} className={classes.sidebarItem} key={index}>
                            <img src={'https://loopy-files.s3-ap-southeast-2.amazonaws.com/grid.png'} style={{zIndex:5}} alt='Satellite' width='100%' className={classes.img}/>
                            <img src={src} alt='Satellite' width='100%' className={classes.img}/>
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
