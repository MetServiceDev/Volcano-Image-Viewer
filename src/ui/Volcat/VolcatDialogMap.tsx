import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { DialogTitle, Dialog, Theme, Divider, Typography } from '@material-ui/core';

import { AppContext } from '../../AppContext';

const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.palette.background.default,
    },
    img: {
        width: '100%',
    },
    button: {
        border: `1px solid ${theme.palette.primary.main}`,
        textTransform: 'none',
        color: theme.palette.primary.main,
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    imgGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr'  
    },
    dateTag: {
        marginRight: theme.spacing(1)
    }
});

interface Props extends WithStyles<typeof styles> {
    handleClose: () => void;
    open: boolean;
    coordinates: [number, number];
    header: string;
}

const LightningMapDialog: React.FC<Props> = ({ classes, handleClose, open, coordinates, header }) => {
    const { theme } = React.useContext(AppContext);

    return(
        <Dialog
            onClose={handleClose}
            open={open}
            classes={{ paper: classes.root }}
            fullWidth={true}
            maxWidth={'md'}
        >
            <div className={classes.title}>
                <DialogTitle>
                    <Typography variant='subtitle1'>{header}</Typography>
                </DialogTitle>       
            </div>
            <Divider/>
            <MapContainer center={coordinates} zoom={8}>
                <TileLayer
                    url={!theme ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" : "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"}
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={coordinates}/>
            </MapContainer>
        </Dialog>
    );
}

export default withStyles(styles)(LightningMapDialog);
