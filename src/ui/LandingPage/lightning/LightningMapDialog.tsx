import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { DialogTitle, Dialog, Theme, Typography, Divider } from '@material-ui/core';
import moment from 'moment';

import { AppContext } from '../../../AppContext';
import { LightningFeature } from '@metservice/aviationtypes';

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
    strikeLocations?: LightningFeature[];
}

const LightningMapDialog: React.FC<Props> = ({ classes, handleClose, open, strikeLocations }) => {
    const center = strikeLocations?.[0].geometry.coordinates || [0, 0];
    const { theme } = React.useContext(AppContext);

    const strikePopup = (data: LightningFeature) => {
        const { properties } = data;
        return (
            <Popup>
                <Typography variant="body1">
                    <b>{properties.name}</b> - {properties.type}
                </Typography>
                <Typography variant="body2">
                    <b>{properties.twentyKStrikes}</b> strikes within 20km
                </Typography>
                <Typography variant="body2">
                    <b>{properties.hundredKStrikes}</b> strikes within 100km
                </Typography>
                <Typography variant="body2">
                    {moment(properties.timestamp).utc().format('MMMM Do YYYY, h:mm:ss a')} UTC
                </Typography>
            </Popup>
        )
    };

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
                    Recent Lightning Strikes
                </DialogTitle>          
            </div>
            <Divider/>
            <MapContainer center={center} zoom={8}>
                <TileLayer
                    url={!theme ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" : "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"}
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {strikeLocations?.map((location) => {
                    const { coordinates } = location.geometry;
                    return (
                        <div key={location.properties.name}>
                            <Marker position={coordinates}>
                                {strikePopup(location)}
                            </Marker>
                            <CircleMarker
                                center={coordinates}
                                radius={20}
                                fillColor="#ff0000"
                                color="#ff0000"
                            />
                            <CircleMarker
                                center={coordinates}
                                radius={60}
                                fillColor="#ff7f1c"
                                color="#ff7f1c"
                            />
                        </div>
                        
                    )
                })}
            </MapContainer>
        </Dialog>
    );
}

export default withStyles(styles)(LightningMapDialog);
