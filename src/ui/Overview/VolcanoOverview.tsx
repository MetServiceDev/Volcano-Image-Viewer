import React from 'react';
import { useLocation } from 'react-router-dom';
import { Grow, Typography, Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

import { imageBucket } from '../../metadata/Endpoints';
import VolcanicAlert from './VolcanicAlert';
import VolcanoThumbnails from '../ReusedComponents/VolcanoThumbnails';
import { Volcano } from '../../api/volcano/headers';

const styles = () => createStyles({
    root: {
    },
    imgContainer: {
        width:'50%',
        position: 'absolute',
        left: '25%',
        top: '2%'
    },
    mainPanel:{
        position: 'absolute',
        width: '100%',
        height: '100vh'
    },
    sidebar: {
        width:'10%',
        backgroundColor:'white',
        boxShadow: '-2px 4px 8px #404040',
        display: 'grid',
        gridTemplateRows: '1fr 1fr 1fr',
        height: '100%',
        float:'left',
    },
    sideItem:{
        padding:'20px',
        opacity:'0.7',
        transition: '0.5s',
        cursor: 'pointer',
        textAlign: 'center',
        '&:hover': {
            opacity:'1',
        }
    },
    bottomSec: {
        width:'10%',
        backgroundColor:'white',
        display: 'grid',
        boxShadow: '2px 4px 8px #404040',
        gridTemplateRows: '1fr 1fr 1fr',
        height: '100%',
        float:'right',
    },
    link: {
        textDecoration: 'none',
        color: '#404040',
        opacity:'0.7',
        transition: '0.5s',
        cursor: 'pointer',
        textAlign: 'center',
        '&:hover': {
            opacity:'1',
        }
    },
    headerDiv: {
        padding:'20px',
        backgroundColor:'white',
        borderBottom: '1px solid #404040',
        textAlign:'center',
        width:'100%',
        overflow:'auto'
    },
    homeIcon: {
        borderRadius: '5px',
        marginRight:'10px',
        float:'left'
    },
    headerText: {
        display:'inline',
        float:'left'
    },
    relatedVolcanoes: {
        transition: '0.5s',
        '&:hover':{
            boxShadow: '4px 4px 8px #404040'
        }
    },
    alerIcon: {
        display:'inline-block',
        verticalAlign:'middle',
        float:'right',
        cursor: 'pointer'
    }
});

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

interface Props extends WithStyles<typeof styles> {
    volcanoes: Volcano[]
}

const VolcanoOverview: React.FC<Props> = ({ classes, volcanoes }) => {
    let query = useQuery();
    const volcano = query.get('volcano')
    const volcanoObject = volcanoes.find(v => v.name === volcano) as Volcano || {};
    const { name, volcanicAlerts, s3Link } = volcanoObject;
    const [currentDisplay, setCurrentDisplay] = React.useState('THUMBNAIL')
    const landingImg = `${imageBucket}/${s3Link}/${s3Link}-12.jpg`

    const setDisplay = (currentDisplay: string) => {
        switch(currentDisplay){
            case 'THUMBNAIL':
                return <div><VolcanoThumbnails volcano={volcanoObject}/></div>;
            case 'DRUM_GRAPH':
                return <img src={volcanoObject.location === 'Vanuatu' ? volcanoObject.drumLink : `${volcanoObject.drumLink}-drum.png`} alt={name} width='100%'/>
            case 'RSAM':
                return <img src={`${volcanoObject.drumLink}-combined.png`} alt={name} width='100%'/>
            default:
                return
        }
    }

    if(!volcanoObject.name){
        return null
    }

    return(
        <div className={classes.root}>
            <div className={classes.headerDiv}>
                <Link className={classes.link} to='/'><Button className={classes.homeIcon} aria-label="return home"><HomeIcon style={{fontSize:'48px'}}/></Button></Link>
                <Typography variant='h3' className={classes.headerText}>{name}</Typography>
                {volcanicAlerts && <VolcanicAlert data={volcanicAlerts}/>}
            </div>
            <div className={classes.mainPanel}>
                <div className={classes.sidebar}>
                    <Grow in={true} {...(true ? { timeout: 1000*(1) } : {})}>
                        <div className={classes.sideItem}>
                            <img src={landingImg} alt={volcano as string} width='100%' onClick={() => {setCurrentDisplay('THUMBNAIL')}}/>
                            <Typography>Live Images</Typography>
                        </div>
                    </Grow>
                    {volcanoObject.drumLink &&
                        <Grow in={true} {...(true ? { timeout: 1000*(2) } : {})}>
                        <div className={classes.sideItem} >
                            <img 
                                src={volcanoObject.location === 'Vanuatu' ? volcanoObject.drumLink : `${volcanoObject.drumLink}-drum.png`} 
                                alt={name} 
                                width='100%' 
                                onClick={() => {setCurrentDisplay('DRUM_GRAPH')}}
                            />
                            <Typography>Drum Plot</Typography>
                        </div>
                        </Grow>}
                    {volcanoObject.location !== 'Vanuatu' && volcanoObject.drumLink &&
                        <Grow in={true} {...(true ? { timeout: 1000*(3) } : {})}>
                            <div className={classes.sideItem} >
                                <img 
                                    src={`${volcanoObject.drumLink}-combined.png`} 
                                    alt={name} width='100%' 
                                    onClick={() => {setCurrentDisplay('RSAM')}}
                                />
                                <Typography>RASM & SSAM</Typography>
                            </div>
                        </Grow>}
                </div>
                <div className={classes.imgContainer}>
                    {setDisplay(currentDisplay)}
                </div>
                {volcanoObject.relatedVolcanoes && (
                    <div className={classes.bottomSec}>
                    {volcanoObject.relatedVolcanoes.map((vol, index) => {
                        const volcano = volcanoes.find(v => v.code === vol) as Volcano;
                        const s3Tag = volcano.s3Link || ''
                        const src = `${imageBucket}/${s3Tag}/${s3Tag}-12.jpg`
                        return (
                            <Link className={classes.link} to={`overview?volcano=${volcano.name}`} target='_blank' key={volcano.code}>
                                <Grow in={true} {...(true ? { timeout: 1000*(index+1) } : {})}>
                                    <div className={classes.sideItem}>
                                        <img src={src} alt={volcano.name} width='100%'/>
                                        <Typography>{volcano.name}</Typography>
                                    </div>
                                </Grow>
                            </Link>
                        )
                    })}
                    </div>
                )}  
            </div>
        </div>
    );
};

export default withStyles(styles)(VolcanoOverview);
