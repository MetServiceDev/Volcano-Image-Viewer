import React from 'react';
import { Theme } from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import moment from 'moment';
import { Volcano } from '@metservice/aviationtypes';

import { userSavedImagesCDN } from '../../../metadata/Endpoints';
import { formatDate } from '../../../api/volcano/formatThumbnail';
import apiCall, { HTTPMethod } from '../../../api/APICall';
import VolcanoThumbnails from '../../ReusedComponents/VolcanoThumbnails';
import RelatedVolcano from './RelatedVolcano';
import formatS3Tags from '../../../api/images/formatS3Tags';
import SelectImageDialog from './SelectImageDialog';
import ImageComponent from '../../ReusedComponents/saved-images/ImageComponent';
import { AppContext } from '../../../AppContext';

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
    imgGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr'  
    }
});

enum ActionType {
    SELECT_IMAGE = 'select-image',
    DESELECT_IMAGE = 'deselect-image',
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
            }
        default:
            return state;
    }
}

interface Props extends WithStyles<typeof styles> {
    volcano: Volcano,
    volcanoes: Volcano[];
}

const LiveImages: React.FC<Props> = ({ classes, volcano, volcanoes }) => {
    const { links } = React.useContext(AppContext);
    const s3Tags = formatS3Tags(links, volcano.code);
    const { user } = React.useContext(AppContext);

    const [{ selectedImages }, dispatch] = React.useReducer(reducer, {
        selectedImages: [],
    });

    const [savedImages, setSavedImages] = React.useState<string[]>([]);

    const [openDialog, toggleDialog] = React.useState<boolean>(false);

    const addRemoveImage = (e: React.ChangeEvent<HTMLInputElement>, image: string) => {
        const type = e.target.checked ? ActionType.SELECT_IMAGE : ActionType.DESELECT_IMAGE;
        dispatch({ type, image });
    };

    const fetchImages = React.useCallback(
        async(): Promise<void> => {
            const savedImages = await apiCall<string[]>(`user?userId=${user?.aud}`, HTTPMethod.GET, user?.token as string);
            setSavedImages(savedImages);
        },
        [user]
    );

    React.useEffect(() => {
        if(user) {
            fetchImages();
        }
    }, [fetchImages, user]);

    const relatedVolcanoes = () => {
        return (
            <div className={classes.relatedVolcanoes}>
                {volcano?.relatedVolcanoes?.map((code, index) => {
                    const volc = volcanoes.find(v => v.code === code) as Volcano;
                    return (
                        <>
                            {volc && <RelatedVolcano
                                key={volc.code}
                                volcano={volc}
                                index={index}
                            />}
                        </>
                    )
                })}
            </div>
        ) 
    };

    const getVolcanoName = (imgLink: string) => {
        let volcCode = `${imgLink.split('.')[4]}.${imgLink.split('.')[5]}`;
        if (!imgLink.split('.')[4]) {
            volcCode = imgLink.split('-')[0].split('/')[1];
        };
        return volcanoes.find(({ code }) => code === volcCode)?.name as string;
    };

    const imageGrid = (
        <div className={classes.imgGrid}>
            {savedImages.map((imgLink, index) => {
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
                        openPopup={() => null}
                        imgWidth="80%"
                    />
                )
            })}
        </div>
    )

    return (
        <div className={classes.root}>
            <div className={classes.thumnbailWrapper}>
                {volcano.code && <VolcanoThumbnails
                    volcano={volcano}
                    s3Tags={s3Tags}
                    captureImage={true}
                />}
            </div>
            {relatedVolcanoes()}
            <SelectImageDialog
                handleClose={() => toggleDialog(false)}
                open={openDialog}
                ImageGrid={imageGrid}
            />
        </div>
    )
};

export default withStyles(styles)(LiveImages);
