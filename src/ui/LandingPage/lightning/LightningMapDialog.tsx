import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { DialogTitle, Dialog, Theme, Typography, Divider } from '@material-ui/core';
import moment from 'moment';

import { AppContext } from '../../../AppContext';

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
    strikeLocations: any;
    timestamp: Date;
}

const LightningMapDialog: React.FC<Props> = ({ classes, handleClose, open, strikeLocations, timestamp }) => {
    const center = Object.values(strikeLocations || {})[0] as any;
    const { theme } = React.useContext(AppContext);

    const strikePopup = (data: any) => {
        return (
            <Popup>
                <Typography variant="body1">
                    <b>Volcano:</b> {data.name}
                </Typography>
                <Typography variant="body2">
                    <b>Strikes within 20km:</b> {data.twentyKStrikes}
                </Typography>
                <Typography variant="body2">
                    <b>Strikes within 100km:</b> {data.hundredKStrikes}
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
                <Typography
                    variant="subtitle2"
                    className={classes.dateTag}
                >
                    Updated at {moment(timestamp).utc().format('hh:mm MMM Do')} UTC
                </Typography>
            </div>
            <Divider/>
            <MapContainer center={center?.coordinates} zoom={8}>
                <TileLayer
                    url={!theme ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" : "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"}
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {Object.entries(strikeLocations || {}).map(([key, value]: any) => {
                    return (
                        <div key={key}>
                            <Marker position={value.coordinates}>
                                {strikePopup(value)}
                            </Marker>
                            <CircleMarker
                                key={key}
                                center={value.coordinates}
                                radius={20}
                                fillColor="#ff0000"
                                color="#ff0000"
                            />
                            <CircleMarker
                                center={value.coordinates}
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
