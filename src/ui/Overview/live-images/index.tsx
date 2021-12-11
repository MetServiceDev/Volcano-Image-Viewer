import React from 'react';
import { useSelector } from 'react-redux';
import { Theme } from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import moment from 'moment';

import { userSavedImagesCDN } from '../../../metadata/Endpoints';
import { formatDate } from '../../../api/volcano/formatThumbnail';
import apiCall from '../../../api/APICall';
import { User } from '../../../api/User/headers';
import VolcanoThumbnails from '../../ReusedComponents/VolcanoThumbnails';
import { Volcano } from '../../../api/volcano/headers';
import RelatedVolcano from './RelatedVolcano';
import { AppState } from '../../../redux/store';
import formatS3Tags from '../../../api/images/formatS3Tags';
import Notes from './Notes';
import { Note } from '../../../api/volcano/headers';
import SelectImageDialog from './SelectImageDialog';
import authClient from '../../../api/auth/Auth';
import ImageComponent from '../../ReusedComponents/saved-images/ImageComponent';

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

interface Props extends WithStyles<typeof styles> {
    volcano: Volcano,
    volcanoes: Volcano[];
    notes: Note[];
}

const LiveImages: React.FC<Props> = ({ classes, volcano, volcanoes, notes }) => {
    const allS3Tags = useSelector((state:AppState) => state.s3ImageTags);
    const s3Tags = formatS3Tags(allS3Tags, volcano.code);
    const login = useSelector((state:AppState) => state.login) as User || {};

    const [savedImages, setSavedImages] = React.useState<string[]>([]);
    const token = authClient.getAccessToken() as string;

    const [checkedImages, setCheckedImages] = React.useState<string[]>([]);
    const [openDialog, toggleDialog] = React.useState<boolean>(false);

    const addRemoveImage = (e: React.ChangeEvent<HTMLInputElement>, imgLink: string) => {
        if (e.target.checked) {
            setCheckedImages([...checkedImages, imgLink])
        } else {
            setCheckedImages(checkedImages.filter((img) => img !== imgLink));
        };
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

    const relatedVolcanoes = () => {
        return (
            <div className={classes.relatedVolcanoes}>
                {volcano?.relatedVolcanoes?.map((code, index) => {
                    const volc = volcanoes.find(v => v.code === code) as Volcano;
                    return (
                        <>
                            {volc && <RelatedVolcano
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
        }
        const volcano = volcanoes.find(vol => vol.code === volcCode)?.name
        return volcano as string;
    };

    const imageGrid = (
        <div className={classes.imgGrid}>
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
                        openPopup={() => null}
                        imgWidth={'80%'}
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
                <Notes
                    selectedImages={checkedImages}
                    notes={notes}
                    openDialog={() => toggleDialog(true)}
                />
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
