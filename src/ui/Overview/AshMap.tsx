import React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/styles';
import { Typography, Button, Theme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';

import { apiEndpoint } from '../../metadata/Endpoints';
import { AppContext } from '../../AppContext';

const styles = (theme: Theme) => createStyles({
    root:{},
    headerDiv: {
        padding:'20px',
        backgroundColor: theme.palette.background.default,
        borderBottom: '1px solid #404040',
        position:'fixed',
        width: '100%',
        zIndex:50,
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
        backgroundColor:theme.palette.background.default,
        boxShadow: '-2px 0px 8px #404040',     
        height: '100%',
        position:'fixed',
        zIndex:2,
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
})

enum ImageSetting {
    ASH = 'Ash',
    DUST = 'Dust',
    TRUE_COLOR = 'True-Color'
}

const metadata = [ ImageSetting.ASH, ImageSetting.DUST, ImageSetting.TRUE_COLOR ];

interface Props extends WithStyles<typeof styles> {}

const AshMapOverview: React.FC<Props> = ({ classes }) => {
    const { user } = React.useContext(AppContext);

    const [currentDisplay, setCurrentDisplay] = React.useState(metadata[0]);
    const [dateString, setDate] = React.useState('');

    React.useEffect(() => {
        if (user) {
            fetch(`${apiEndpoint}/utc`, {
                headers: { 'Authorization' : user.token }
            }).then(res => res.text()).then(data => setDate(data)).catch(err => console.log(err))
        }
    },[user])

    const renderImg = () => {
        const src = `https://loopy-files.s3-ap-southeast-2.amazonaws.com/loopy-pix/${currentDisplay}.png` 
        return (
            <div>
                <img src={'https://loopy-files.s3-ap-southeast-2.amazonaws.com/grid.png'} style={{zIndex:5}} alt='Satellite' width='100%' className={classes.img}/>
                <img src={src} alt='Satellite' width='100%' className={classes.img}/>
            </div>
        );
    };

    return (
        <div>
            <div className={classes.headerDiv}>
                <Link to='/'>
                    <Button className={classes.homeIcon} aria-label="return home">
                        <HomeIcon style={{fontSize:'48px'}}/>
                    </Button>
                </Link>
                <Typography variant='h3' className={classes.headerText}>
                    Vanuatu {dateString}-UTC
                </Typography>
            </div>
            <div className={classes.sidebar}>
                <div className={classes.sidebarInner}>
                {metadata.map((type, index) => {
                    const src = `https://loopy-files.s3-ap-southeast-2.amazonaws.com/loopy-pix/${type}.png`                 
                    return (
                        <div onClick={() => setCurrentDisplay(type)} className={classes.sidebarItem} key={index}>
                            <img src={'https://loopy-files.s3-ap-southeast-2.amazonaws.com/grid.png'} style={{zIndex:5}} alt='Satellite' width='100%' className={classes.img}/>
                            <img src={src} alt='Satellite' width='100%' className={classes.img}/>
                            <Typography variant='body1' className={classes.text}>{type}</Typography>
                        </div>
                    );
                })} 
                </div>
            </div>
            <div className={classes.mainImg}>{renderImg()}</div>
        </div>
    )
};

export default withStyles(styles)(AshMapOverview);
