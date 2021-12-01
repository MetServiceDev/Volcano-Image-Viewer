import React, { useState } from 'react';
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
import ImagePopup from './ImagePopup';

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

interface SelectedImage {
    src: string;
    title: string;
    volcano: string;
}

interface Props extends WithStyles<typeof styles> {
    volcanoes: Volcano[]
}

const UserDashboard: React.FC<Props> = ({ classes, volcanoes }) => {

    const [savedImages, setSavedImages] = React.useState<string[]>([]);
    const token = authClient.getAccessToken() as string;
    const login = useSelector((state:AppState) => state.login) as User || {};

    const [selectedImg, setSelected] = useState<SelectedImage>({ src: '', title: '', volcano: '' });
    const [expaned, toggleExpand] = React.useState<boolean>(false);

    const openPopup = (src: string, title: string, volcano:string) => {
        toggleExpand(true);
        setSelected({ src, title, volcano })
    };

    const fetchImages = React.useCallback(
        async(): Promise<void> => {
            const savedImages = await apiCall<string[]>(`user?userId=${login.aud}`, 'GET', token);
            setSavedImages(savedImages);
        },
        [token, login.aud]
    );

    React.useEffect(() => {
        if(token) {
            fetchImages();
        }
    }, [fetchImages, token]);

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
        const src = `${userSavedImagesCDN}/${imgLink}`;
        const title = `${moment(timestamp).format('HH:mm MMMM Do YYYY')} UTC`
        return (
            <Tooltip title={title} arrow>
                <div className={classes.imgPreview}>
                    <img
                        src={src}
                        alt={imgLink}
                        width='25%'
                        className={classes.imgThumbnail}
                        onClick={() => openPopup(src, title, volcano)}
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
            <ImagePopup
                src={selectedImg.src}
                handleClose={() => toggleExpand(false)}
                open={expaned}
                title={selectedImg.title}
                volcano={selectedImg.volcano}
            />
        </>
    );
};

export default withStyles(styles)(UserDashboard);
