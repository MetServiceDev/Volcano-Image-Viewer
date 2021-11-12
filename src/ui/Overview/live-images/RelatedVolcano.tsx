import React from 'react';
import { Grow, Typography, Theme, CircularProgress } from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Volcano } from '../../../api/volcano/headers';
import { fetchImages } from '../../../api/images/fetchImages';
import { User } from '../../../api/User/headers';
import { AppState } from '../../../redux/store';

const styles = (theme:Theme) => createStyles({
    sideItem: {
        width: '100%',
        marginBottom: theme.spacing(4),
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
        textAlign: 'center',
    },
    loader: {
        display: 'block',
        marginBottom: theme.spacing(4)
    }
});

interface Props extends WithStyles<typeof styles> {
    volcano: Volcano,
    index: number,
}

const RelatedVolcano: React.FC<Props> = ({ volcano, classes, index }) => {

    const [imgSrc, setSrc] = React.useState<string>('');
    const [loading, isLoading] = React.useState<boolean>(false);
    const user = useSelector((state:AppState) => state.login) as User;

    const fetchSrc = async():Promise<string> => {
        isLoading(true);
        const imageSrc = await fetchImages(volcano, user);
        isLoading(false);
        return imageSrc[imageSrc.length-1].src;
    }

    React.useEffect(() => {
        if(user) {
            fetchSrc().then(src => setSrc(src));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    },[volcano, user]);

    const loadingUI = (
        <CircularProgress className={classes.loader}/>
    );

    const thumbnail = (
        <Link className={classes.link} to={`overview?volcano=${volcano.name}`} key={volcano.code} target='_blank'>
            <Grow in={true} {...(true ? { timeout: 1000*(index) } : {})}>
                <div className={classes.sideItem}>
                    <img src={imgSrc} alt={volcano.name} width='100%'/>
                    <Typography>{volcano.name}</Typography>
                </div>
            </Grow>
        </Link>
    )

    return (
        <>
            {loading ? loadingUI : thumbnail}
        </>
    );
};

export default withStyles(styles)(RelatedVolcano);
