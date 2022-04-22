import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Theme, Tooltip, IconButton, Collapse, Snackbar, Typography } from '@material-ui/core';
import Alert from '@mui/material/Alert';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import InboxIcon from '@mui/icons-material/Inbox';

import apiCall, { HTTPMethod } from '../../api/APICall';
import authClient from '../../api/auth/Auth';
import { userSavedImagesCDN } from '../../metadata/Endpoints';
import { formatDate } from '../../api/volcano/formatThumbnail';
import Navbar from './Navbar';
import ImagePopup from './ImagePopup';
import ImageComponent from '../ReusedComponents/saved-images/ImageComponent';
import DeleteConfirmationDialog from './DeleteConformationDialog';
import { AppContext } from '../../AppContext';

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
    emptyImages: {
        position: 'absolute',
        top: '10%',
        left: '45%',
        alignItems: 'center',
        textAlign: 'center',
        color: theme.palette.text.secondary
    }
});

enum ActionType {
    SELECT_IMAGE = 'select-image',
    DESELECT_IMAGE = 'deselect-image',
    EMPTY_ARRAY = 'empty-array'
};

interface SelectedImagesAction {
    type: ActionType;
    image: string;
};

interface SelectedImagesState {
    selectedImages: string[];
};

const reducer = (state: SelectedImagesState, action: SelectedImagesAction) => {
    switch (action.type) {
        case ActionType.SELECT_IMAGE:
            return {
                selectedImages: [...state.selectedImages, action.image],
            };
        case ActionType.DESELECT_IMAGE:
            return {
                selectedImages: [...state.selectedImages.filter((image: string) => image !== action.image)]
            };
        case ActionType.EMPTY_ARRAY:
            return {
                selectedImages: []
            };
        default:
            return state;
    }
}

interface SelectedImage {
    src: string;
    title: string;
    volcano: string;
}

interface DeleteBody {
    files: string[];
    userId: string;
}

interface Props extends WithStyles<typeof styles> {}

const UserDashboard: React.FC<Props> = ({ classes }) => {
    const [loadedImages, setLoaded] = React.useState<boolean>(false);

    const { volcanoes, user } = React.useContext(AppContext);

    const [{ selectedImages }, dispatch] = React.useReducer(reducer, {
        selectedImages: [],
    });

    const [savedImages, setSavedImages] = React.useState<string[]>([]);
    const token = authClient.getAccessToken() as string;

    const [selectedImg, setSelected] = React.useState<SelectedImage>({ src: '', title: '', volcano: '' });
    const [expaned, toggleExpand] = React.useState<boolean>(false);

    const [deleteComplete, setDeleteComplete] = React.useState<boolean>(false);

    const [showConfirmation, toggleConfirmation] = React.useState<boolean>(false);

    const openPopup = (src: string, title: string, volcano:string) => {
        toggleExpand(true);
        setSelected({ src, title, volcano })
    };

    const fetchImages = React.useCallback(
        async(): Promise<void> => {
            try {
                const savedImages = await apiCall<string[]>(`user?userId=${user?.aud}`, HTTPMethod.GET, token);
                setLoaded(true);
                setSavedImages(savedImages);
            } catch(err) {
                setLoaded(true);
                setSavedImages([]);
            }
        },
        [token, user?.aud]
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

    const addRemoveImage = (e: React.ChangeEvent<HTMLInputElement>, image: string) => {
        const type = e.target.checked ? ActionType.SELECT_IMAGE : ActionType.DESELECT_IMAGE;
        dispatch({ type, image });
    };

    const deleteItems = async() => {
        const token = authClient.getAccessToken() as string;
        const body = {
            userId: user?.aud as string,
            files: selectedImages
        };
        try {
            await apiCall<null, DeleteBody>('user/images', HTTPMethod.DELETE, token, body);
            setDeleteComplete(true);
            fetchImages();
            dispatch({ type: ActionType.EMPTY_ARRAY, image: '' });
            setTimeout(() => setDeleteComplete(false), 3000);
        } catch (err) {};
    };

    if (!loadedImages) {
        return (
            <div>
                <Typography variant="h6">
                    Loading images, please wait...
                </Typography>
            </div>
        )
    }

    return (
        <>
            <Navbar
                username={user?.name as string}
            />
            {savedImages.length === 0 && (
                <div className={classes.emptyImages}>
                    <Typography variant="h4">
                        No Saved Images!
                    </Typography>
                    <InboxIcon style={{ fontSize: '256px' }}/>
                </div>
            )}
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
                            selected={Boolean(selectedImages.find((img: string) => img === imgLink.split('/')[1] as string))}
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
                in={selectedImages.length > 0 ? true : false}
            >
                <Tooltip
                    title={`delete ${selectedImages.length} selected file${selectedImages.length > 1 ? 's' : '' }`}
                    arrow
                >
                    <IconButton
                        disabled={selectedImages.length <= 0 ? true : false}
                        onClick={() => toggleConfirmation(true)}
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
            <DeleteConfirmationDialog
                open={showConfirmation}
                handleClose={() => toggleConfirmation(false)}
                imgList={selectedImages.map((img) => `${getVolcanoName(img)} ${moment(formatDate(img)).format('HH:mm MMM Do YYYY')} UTC`)}
                confirm={deleteItems}
            />
        </>
    );
};

export default withStyles(styles)(UserDashboard);
