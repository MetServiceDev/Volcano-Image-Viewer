import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { withStyles } from '@material-ui/styles';
import { createStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, WithStyles, Theme, Typography } from '@material-ui/core';
import moment from 'moment';

import { QuakeFeature, Volcano, VolcanicAlert } from '@metservice/aviationtypes';
import { quakeLevel, getIcon } from '../../api/quakes/setMarkers';
import fetchVAL from '../../api/volcano/fetchVAL';
import { AppContext } from '../../AppContext';
import formatS3Tags from '../../api/images/formatS3Tags';
import { imageBucket } from '../../metadata/Endpoints';

const styles = (theme: Theme) => createStyles({
    root: {
        position: 'fixed',
        width: '100%',
        top: theme.spacing(8)
    },
    mapContainer: {
        width:'70%',
        position:'absolute',
        right:'0%',
        zIndex: 4,   
    },
    alertTable: {
        width:'30%',
        position:'absolute',
        left:'0%' ,
        height: '100vh',
        backgroundColor: theme.palette.background.paper,
        zIndex: 4,
    },
    tableRow: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.background.default,
        }
    },
    tableHeader: {
        fontWeight: 'bold'
    },
    popup: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr'
    },
});

interface Props extends WithStyles<typeof styles> {}

const VolcanoMap: React.FC<Props> = ({ classes }) => {
    const { quakes, volcanoes, theme, links } = React.useContext(AppContext);
    const volcanoStrings = volcanoes.map((v) => v.mountain);
    const alertArray = [...new Set(volcanoStrings)].filter(Boolean);

    const mapRef = React.useRef<any>(null);

    const [volcanoAlertLevels, setVAL] = React.useState<VolcanicAlert[]>([]);

    React.useEffect(() => {
        fetchVAL().then(data => setVAL(data))
    },[]);

    const getThumbnail = (code: string): string => {
        const tags = formatS3Tags(links, code);
        return tags[11];
    };

    const volcanicAlertLevel = (volcano: Volcano) => volcanoAlertLevels.find((v) => {
        return volcano.gnsID === v?.volcanoID
    }) || { ...volcano.volcanicAlerts, volcanoID: volcano.gnsID } as VolcanicAlert

    const alertTable = () => {
        return alertArray.map(volcano => {
            const volcanoObject = volcanoes.find(v => { return v.mountain === volcano }) as Volcano;
            const alertStats = volcanicAlertLevel(volcanoObject);
            const { coordinates: {lat, long} } = volcanoObject;
            if (!alertStats?.level) {
                return null
            }
            return(
                <TableRow className={classes.tableRow} key={volcanoObject.code} onClick={()=>{
                    mapRef.current.flyTo([lat, long], 12, {duration:1});
                }}>
                    <TableCell align="left">{volcano}</TableCell>
                    <TableCell align="left">{alertStats?.level}</TableCell>
                    <TableCell align="left">{alertStats?.activity || alertStats?.msg}</TableCell>
                </TableRow>
            );
        });
    };

    const quakePopup = (quake: QuakeFeature) => {
        return (
            <Popup>
                <Typography variant="body1">
                    <b>Earthquake {quake.properties.locality}</b>
                </Typography>
                <Typography variant="body2">
                    <b>Magnitude:</b> {Math.round(quake.properties.magnitude * 100) / 100}
                </Typography>
                <Typography variant="body2">
                    <b>Depth:</b> {Math.round(quake.properties.depth * 100) / 100}
                </Typography>
                <Typography variant="body2">
                    <b>Intensity:</b> {quake.properties.intensity}
                </Typography>
                <Typography variant="body2">
                    <b>Time NZDT:</b> {moment(quake.properties.time).format('LLLL')}
                </Typography>
            </Popup>
        )
    };

    const volcanoPopup = (volcano: Volcano) => {
        const alertStats = volcanicAlertLevel(volcano);
        const latestImage = getThumbnail(volcano.code);
        return (
            <Popup className={classes.popup}>
                <Typography variant="body1">
                    <b>{volcano.mountain}</b> - Volcanic level {alertStats?.level}
                </Typography>
                <img
                    src={`${imageBucket}/${latestImage}`}
                    alt={latestImage}
                    width="100%"
                />
                <div>
                    {alertStats?.activity && <Typography variant="body2">
                        <b>Activity:</b> {alertStats?.activity}
                    </Typography>}
                    {alertStats?.hazards && <Typography variant="body2">
                        <b>Hazards:</b> {alertStats?.hazards}
                    </Typography>}
                </div>
            </Popup>
        )
    }

    const map = () => {
        const allQuakes = Object.values(quakes).map(i => i).flat() as QuakeFeature[];
        return (
            <MapContainer center={[-33.431441,175.059385]} zoom={5} whenCreated={ mapInstance => { mapRef.current = mapInstance }}>
                <TileLayer
                    url={!theme ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" : "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"}
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {alertArray.map(volcano => {
                    const volcanoObject = volcanoes.find(v => { return v.mountain === volcano }) as Volcano;
                    const alertStats = volcanoObject.volcanicAlerts;
                    const { coordinates: {lat, long} } = volcanoObject;
                    const icon = getIcon(alertStats?.level as string);
                    return (
                        <Marker position={[lat, long]} icon={icon} key={volcanoObject.code}>
                            {volcanoPopup(volcanoObject)}
                        </Marker>
                    );
                })};

                {allQuakes.map(quake => {
                    const coordinates = quake.geometry.coordinates;
                    const severity = quakeLevel(quake.properties.intensity);
                    return (
                        <CircleMarker
                            key={quake.properties.publicID}
                            center={[coordinates[1], coordinates[0]]}
                            radius={severity.radius}
                            fillColor={severity.bg}
                            color={severity.primary}
                        >
                            {quakePopup(quake)}
                        </CircleMarker>
                    )
                })}
            </MapContainer>
        );
    };

    return (
        <div className={classes.root}>
            <div className={classes.alertTable}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableHeader} align="left">Volcano</TableCell>
                                <TableCell className={classes.tableHeader} align="left">Level</TableCell>
                                <TableCell className={classes.tableHeader} align="left">Volcanic Activity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{alertTable()}</TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className={classes.mapContainer}>{map()}</div>
        </div>
    );
};

export default withStyles(styles)(VolcanoMap);
