import React from 'react';
import { Grow, Typography, Theme } from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Volcano } from '../../../api/volcano/headers';
import { fetchImages } from '../../../api/images/fetchImages';
import { User } from '../../../api/User/headers';
import { AppState } from '../../../redux/store';

const styles = (theme:Theme) => createStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },
    thumnbailWrapper: {
        width: '60%',
    },
    relatedVolcanoes: {
        width: '10%',
        marginRight: theme.spacing(4)
    },
    sideItem: {
        width: '100%',
        marginBottom: theme.spacing(4)
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
        textAlign: 'center'
    }
});

interface Props extends WithStyles<typeof styles> {
    volcano: Volcano,
    index: number,
}

const RelatedVolcano: React.FC<Props> = ({ volcano, classes, index }) => {

    const [imgSrc, setSrc] = React.useState<string>('');
    const user = useSelector((state:AppState) => state.login) as User;

    const fetchSrc = async():Promise<string> => {
        const imageSrc = await fetchImages(volcano, user);
        return imageSrc[imageSrc.length-1].src;
    }

    React.useEffect(() => {
        if(user) {
            fetchSrc().then(src => setSrc(src));
        };
        
    },[volcano, user]);

    return (
        <Link className={classes.link} to={`overview?volcano=${volcano.name}`} key={volcano.code} target='_blank'>
            <Grow in={true} {...(true ? { timeout: 1000*(index) } : {})}>
                <div className={classes.sideItem}>
                    <img src={imgSrc} alt={volcano.name} width='100%'/>
                    <Typography>{volcano.name}</Typography>
                </div>
            </Grow>
        </Link>
    )
};

export default withStyles(styles)(RelatedVolcano);
