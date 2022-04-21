import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Theme, Typography, TextField, Divider, IconButton } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import moment from 'moment';
import { AppContext } from '../../AppContext';

const styles = (theme: Theme) => createStyles({
    root: {
    },
    header: {
        marginBottom: theme.spacing(2),
    },
    thumbnailRows: {
        height: '42vh',
        overflow: 'auto',
        marginTop: theme.spacing(1)
    },
    imageRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-start',
        gap: theme.spacing(1),
        margin: theme.spacing(2)
    },
    bottomSec: {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        bottom: '0%',
        width: '80%',
    }
});

interface Props extends WithStyles<typeof styles> {

}

const CurrentImages: React.FC<Props> = ({ classes }) => {
    const { currentImages: { imageLog } } = React.useContext(AppContext);

    const [selectedVolcano, setSelectedVolcano] = React.useState<any>(null);

    const renderTimestamp = (s3Tag: string): string => {
        const dateTag = s3Tag.split('/')[1].split('.').splice(0, 3);
        const day = moment(dateTag[0]).startOf('year').add(dateTag[1], 'days').format('DD/MM/YY');
        return `${dateTag[2].substring(0, 2) + ':' + dateTag[2].substring(2, 4)} ${day} UTC`;
    }

    return (
        <div>
            <div className={classes.header}>
                <Autocomplete
                    id="volcanoes-images-select"
                    options={Object.keys(imageLog) ?? []}
                    onChange={(event, value) => setSelectedVolcano(imageLog[value as string])}
                    renderInput={(params) => <TextField {...params} variant="outlined" label="Volcano" />}
                />
            </div>
            <Divider />
            <div className={classes.thumbnailRows}>
                {selectedVolcano?.allThumbnails?.map((image: any, index: number) => (
                    <div key={`selected-volcano-image-${index + 1}`} className={classes.imageRow}>
                        <img src={image.src} alt={image.timestamp ?? image.size} width="10%"/>
                        <Typography variant="subtitle1">
                            {image.uploadedAt ?
                                `${moment(image.uploadedAt).format('hh:mm DD/MM/YY')} UTC`:
                                renderTimestamp(selectedVolcano.s3Tags[index])}
                        </Typography>
                    </div>
                ))}
            </div>
            {selectedVolcano && <Divider />}
            <div className={classes.bottomSec}>
                <IconButton color="primary">
                    <ArrowBackIosNewIcon/>
                </IconButton>
                <IconButton color="primary">
                    <ArrowForwardIosIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default withStyles(styles)(CurrentImages);
