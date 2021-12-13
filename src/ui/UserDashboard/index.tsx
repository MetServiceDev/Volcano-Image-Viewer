import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Theme, Tooltip, IconButton, Collapse, Snackbar } from '@material-ui/core';
import Alert from '@mui/material/Alert';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';

import apiCall from '../../api/APICall';
import authClient from '../../api/auth/Auth';
import { User } from '../../api/User/headers';
import { AppState } from '../../redux/store';
import { userSavedImagesCDN } from '../../metadata/Endpoints';
import { Volcano } from '../../api/volcano/headers';
import { formatDate } from '../../api/volcano/formatThumbnail';
import Navbar from './Navbar';
import ImagePopup from './ImagePopup';
import ImageComponent from '../ReusedComponents/saved-images/ImageComponent';

const styles = (theme: Theme) => createStyles({
    checkbox: {
        position: 'relative',
        bottom: '85%',
        left: '12%'
    },
    deleteIcon: {
        position: 'fixed',
        top: '90%',
        left: '90%',
        backgroundColor: theme.palette.background.default
    },
    imgWrapper: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        paddingTop: theme.spacing(12),
    },
});

interface SelectedImage {
    src: string;
    title: string;
    volcano: string;
}

interface DeleteBody {
    files: string[];
    userId: string;
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

    const [checkedImages, setCheckedImages] = React.useState<string[]>([]);

    const [deleteComplete, setDeleteComplete] = React.useState<boolean>(false);

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

    const addRemoveImage = (e: React.ChangeEvent<HTMLInputElement>, imgLink: string) => {
        if (e.target.checked) {
            setCheckedImages([...checkedImages, imgLink])
        } else {
            setCheckedImages(checkedImages.filter((img) => img !== imgLink));
        };
    };

    const deleteItems = async() => {
        const token = authClient.getAccessToken() as string;
        const body = {
            userId: login.aud,
            files: checkedImages
        };
        try {
            await apiCall<null, DeleteBody>('user/images', 'DELETE', token, body);
            setDeleteComplete(true);
            fetchImages();
            setTimeout(() => setDeleteComplete(false), 3000);
        } catch (err) {};
    };

    return (
        <>
            <Navbar
                username={login.name}
            />
            <div className={classes.imgWrapper}>
                {savedImages.map((imgLink) => {
                    const volcano = getVolcanoName(imgLink);
                    const src = `${userSavedImagesCDN}/${imgLink}`;
                    const timestamp = formatDate(imgLink);
                    const title = `${moment(timestamp).format('HH:mm MMMM Do YYYY')} UTC`
                    return (
                        <ImageComponent
                            src={src}
                            title={title}
                            imgLink={imgLink}
                            volcanoName={volcano}
                            timestamp={timestamp as Date}
                            selectImage={(e: React.ChangeEvent<HTMLInputElement>) => addRemoveImage(e, imgLink.split('/')[1] as string)}
                            selected={Boolean(checkedImages.find((img) => img === imgLink.split('/')[1] as string))}
                            openPopup={() => openPopup(src, title, volcano)}
                        />
                    )
                })}
            </div>
            <ImagePopup
                src={selectedImg.src}
                handleClose={() => toggleExpand(false)}
                open={expaned}
                title={selectedImg.title}
                volcano={selectedImg.volcano}
            />
            <Collapse
                in={checkedImages.length > 0 ? true : false}
            >
                <Tooltip
                    title={`delete ${checkedImages.length} selected file${checkedImages.length > 1 ? 's' : '' }`}
                    arrow
                >
                    <IconButton
                        disabled={checkedImages.length <= 0 ? true : false}
                        onClick={deleteItems}
                        className={classes.deleteIcon}
                    >
                        <DeleteIcon fontSize="large"/>
                    </IconButton>
                </Tooltip>
            </Collapse>
            <Snackbar open={deleteComplete} autoHideDuration={3000} anchorOrigin={{ vertical: 'bottom', horizontal : 'left' }}>
                <Alert severity="success">
                    Images successfully deleted
                </Alert>
            </Snackbar>
        </>
    );
};

export default withStyles(styles)(UserDashboard);
