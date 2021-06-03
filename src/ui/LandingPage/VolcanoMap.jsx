import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import * as L from 'leaflet';
import { withStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import { useRef } from 'react';

const LeafIcon = L.Icon.extend({options: {}});

const greenIcon = new LeafIcon({iconUrl:"https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|03fc77&chf=a,s,ee00FFFF"});
const yellowIcon = new LeafIcon({iconUrl:"https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|fcbe03&chf=a,s,ee00FFFF"});
const redIcon = new LeafIcon({iconUrl:"https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff2e2e&chf=a,s,ee00FFFF"});

const getIcon = (alertLevel) => {
    switch(alertLevel){
        case '0':
        case '1':
            return greenIcon
        case '2':
        case '3':
            return yellowIcon
        case '4':
        case '5':
            return redIcon
        default:
            return greenIcon
    };
};

const styles = {
    root: {
        marginTop:'60px'
    },
    mapContainer: {
        width:'70%',
        position:'absolute',
        right:'0%',
        zIndex:'-2',   
    },
    alertTable: {
        width:'30%',
        position:'absolute',
        left:'0%' ,
        height: '100vh',
        backgroundColor: 'white',
        zIndex:'-2'
    },
    tableRow: {
        '&:nth-of-type(odd)': {
          backgroundColor: '#f0f0f0',
        }
    },
}

const VolcanoMap = ({classes, volcanoes}) => {

    const volcanoStrings = [].concat(volcanoes.map(v => { return v.mountain}));
    const alertArray = [...new Set(volcanoStrings)].filter(x => { return x !== undefined});
    const mapRef = useRef();

    const alertTable = () => {
        return alertArray.map(volcano => {
            const { volcanicAlerts, coordinates } = volcanoes.find(v => { return v.mountain === volcano});
            if(volcanicAlerts){
                return(
                    <TableRow className={classes.tableRow} key={volcano.code} onClick={()=>{
                        mapRef.current.flyTo([coordinates.lat, coordinates.long], 12, {duration:1});   
                    }}>
                        <TableCell align="left">{volcano}</TableCell>
                        <TableCell align="left">{volcanicAlerts.level}</TableCell>
                        <TableCell align="left">{volcanicAlerts.msg}</TableCell>
                    </TableRow>
                );
            }
            
        });
    };

    const map = () => {
        return (
            <MapContainer center={[-33.431441,175.059385]} zoom={5} whenCreated={ mapInstance => { mapRef.current = mapInstance } } >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {alertArray.map(volcano => {
                    const volcanoObject = volcanoes.find(v => { return v.mountain === volcano });
                    const { level, msg } = volcanoObject.volcanicAlerts;
                    const {lat, long} = volcanoObject.coordinates;
                    const icon = getIcon(level);
                    return (
                        <Marker position={[lat, long]} icon={icon} key={volcanoObject.code}>
                            <Popup>{volcanoObject.mountain}: Alert level {level} - {msg}</Popup>
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

VolcanoMap.propTypes = {
    classes: PropTypes.object,
    volcanoes: PropTypes.array.isRequired
};

export default withStyles(styles)(VolcanoMap);
