import React from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import * as L from 'leaflet';
import { withStyles } from '@material-ui/styles';
import { createStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, WithStyles } from '@material-ui/core';
import { Volcano } from '../../api/volcano/headers';

const greenIcon = new L.Icon({
    iconUrl:"https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|03fc77&chf=a,s,ee00FFFF",
    popupAnchor: [1, -30],
    iconAnchor: [10, 30]
});

const yellowIcon = new L.Icon({
    iconUrl:"https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|fcbe03&chf=a,s,ee00FFFF",
    popupAnchor: [1, -30],
    iconAnchor: [10, 30]
});

const redIcon = new L.Icon({
    iconUrl:"https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff2e2e&chf=a,s,ee00FFFF",
    popupAnchor: [1, -30],
    iconAnchor: [10, 30]
});

const getIcon = (alertLevel: string) => {
    switch(alertLevel){
        case '0':
        case '1':
            return greenIcon;
        case '2':
        case '3':
            return yellowIcon;
        case '4':
        case '5':
            return redIcon;
        default:
            return greenIcon;
    };
};

const styles = () => createStyles({
    root: {
        marginTop:'60px'
    },
    mapContainer: {
        width:'70%',
        position:'absolute',
        right:'0%',
        zIndex: -2,   
    },
    alertTable: {
        width:'30%',
        position:'absolute',
        left:'0%' ,
        height: '100vh',
        backgroundColor: 'white',
        zIndex: -2
    },
    tableRow: {
        '&:nth-of-type(odd)': {
          backgroundColor: '#f0f0f0',
        }
    },
});

interface Props extends WithStyles<typeof styles> {
    volcanoes: Volcano[]
}

const VolcanoMap: React.FC<Props> = ({ classes, volcanoes }) => {
    const volcanoStrings = volcanoes.map(v => v.mountain);
    const alertArray = [...new Set(volcanoStrings)].filter(Boolean)
    const mapRef = React.useRef<any>(null);

    const alertTable = () => {
        return alertArray.map(volcano => {
            const volcanoObject = volcanoes.find(v => { return v.mountain === volcano }) as Volcano;
            const alertStats = volcanoObject.volcanicAlerts;
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
                    <TableCell align="left">{alertStats?.msg}</TableCell>
                </TableRow>
            );
        });
    };

    const map = () => {
        return (
            <MapContainer center={[-33.431441,175.059385]} zoom={5} whenCreated={ mapInstance => { mapRef.current = mapInstance }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {alertArray.map(volcano => {
                    const volcanoObject = volcanoes.find(v => { return v.mountain === volcano }) as Volcano;
                    const alertStats = volcanoObject.volcanicAlerts;
                    const { coordinates: {lat, long} } = volcanoObject;
                    const icon = getIcon(alertStats?.level as string);
                    return (
                        <Marker position={[lat, long]} icon={icon} key={volcanoObject.code}>
                            <Popup>{volcanoObject.mountain}: Alert level {alertStats?.level} - {alertStats?.msg}</Popup>
                        </Marker>
                    );
                })};
            </MapContainer>
        );
    };

    return (
        <div className={classes.root}>
            <div className={classes.alertTable}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow style={{backgroundColor:'#404040'}}>
                                <TableCell style={{color: 'white', fontWeight: 'bold'}} align="left">Volcano</TableCell>
                                <TableCell style={{color: 'white', fontWeight: 'bold'}} align="left">Level</TableCell>
                                <TableCell style={{color: 'white', fontWeight: 'bold'}} align="left">Volcanic Activity</TableCell>
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
