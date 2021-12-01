import React from 'react';
import { useSelector } from 'react-redux';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Typography, Theme, Tooltip } from '@material-ui/core';
import moment from 'moment';

import apiCall from '../../api/APICall';
import authClient from '../../api/auth/Auth';
import { User } from '../../api/User/headers';
import { AppState } from '../../redux/store';
import { userSavedImagesCDN } from '../../metadata/Endpoints';
import { Volcano } from '../../api/volcano/headers';
import { formatDate } from '../../api/volcano/formatThumbnail';
import Navbar from './Navbar';

const styles = (theme: Theme) => createStyles({
    root: {},
    imgWrapper: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        paddingTop: theme.spacing(12),
    },
    imgPreview: {
        width: '100%',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: theme.spacing(4)
    },
    previewText: {
        fontSize: '14px'
    },
    imgThumbnail: {
        cursor: 'pointer'
    }
});

interface Props extends WithStyles<typeof styles> {
    volcanoes: Volcano[]
}

const UserDashboard: React.FC<Props> = ({ classes, volcanoes }) => {

    const [savedImages, setSavedImages] = React.useState<string[]>([]);
    const token = authClient.getAccessToken() as string;
    const login = useSelector((state:AppState) => state.login) as User || {};

    const fetchImages = React.useCallback(
        async(): Promise<void> => {
            const savedImages = await apiCall<string[]>(`user?userId=${login.aud}`, 'GET', token);
            // const downloadImages = await Promise.all(savedImages.map(async(imageSrc) => {
            //     const image = await downloadImage(`${userSavedImagesCDN}/${imageSrc}`);
            //     console.log(image)
            //     return image;
            // }));
            setSavedImages(savedImages);
        },
        [token]
    );

    React.useEffect(() => {
        if(token) {
            fetchImages();
        }
    }, [fetchImages]);

    const getVolcanoName = (imgLink: string) => {
        let volcCode = `${imgLink.split('.')[4]}.${imgLink.split('.')[5]}`;
        if (!imgLink.split('.')[4]) {
            volcCode = imgLink.split('-')[0].split('/')[1];
        }
        const volcano = volcanoes.find(vol => vol.code === volcCode)?.name
        return volcano as string;
    };

    const imagePreview = (imgLink: string) => {
        const timestamp = formatDate(imgLink);
        const volcano = getVolcanoName(imgLink);
        return (
            <Tooltip title={`${moment(timestamp).format('HH:mm MMMM Do YYYY')} UTC`} arrow>
                <div className={classes.imgPreview}>
                    <img
                        src={`${userSavedImagesCDN}/${imgLink}`}
                        alt={imgLink}
                        width='25%'
                        className={classes.imgThumbnail}
                    />
                    <Typography
                        variant="subtitle1"
                        className={classes.previewText}
                    >
                        {volcano} - {moment(timestamp).format('MMM Do YYYY')}
                    </Typography>
                </div>
            </Tooltip>
        )
    }

    return (
        <>
            <Navbar
                username={login.name}
            />
            <div className={classes.imgWrapper}>
                {savedImages.map(imgLink => imagePreview(imgLink))}
            </div>
        </>
    );
};

export default withStyles(styles)(UserDashboard);
