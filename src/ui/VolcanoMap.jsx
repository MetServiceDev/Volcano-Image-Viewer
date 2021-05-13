import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useSelector } from 'react-redux';
import * as L from 'leaflet';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

const LeafIcon = L.Icon.extend({options: {}});

const greenIcon = new LeafIcon({iconUrl:"https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|03fc77&chf=a,s,ee00FFFF"});
const yellowIcon = new LeafIcon({iconUrl:"https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|fcbe03&chf=a,s,ee00FFFF"})
const redIcon = new LeafIcon({iconUrl:"https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff2e2e&chf=a,s,ee00FFFF"})

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
}

const styles = {
    mapContainer: {
        width:'70%',
        position:'absolute',
        right:'0%',
        zIndex:'-2'
    },
    alertTable: {
        width:'30%',
        position:'absolute',
        left:'0%' ,
        height: '100vh',
        backgroundColor: 'white',
        zIndex:'-2'
    }
}

const VolcanoMap = ({classes, volcanoes}) => {

    const volcanicAlerts = useSelector(state => state.volcanicAlerts);

    const alertTable = () => {
        volcanicAlerts.map(volcano => {
            return(
                <div>
                    <Typography>{volcano.volcano}</Typography>
                </div>
            );
        })
    }

    const map = () => {
        return (
            <MapContainer center={[-39.156833, 175.632167]} zoom={6}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {volcanoes.map(volcano => {
                    const {lat, long} = volcano.coordinates
                    const alerts = volcanicAlerts.find(v => v.volcano === volcano.mountain);
                    const { alertLevel, alertMsg } = alerts || ''
                    const icon = getIcon(alertLevel)
                    return (
                        <Marker position={[lat, long]} icon={icon}>
                            <Popup>
                                {volcano.mountain} - Alert level {alertLevel} - {alertMsg}
                            </Popup>
                        </Marker>
                    )
                })}
            </MapContainer>
        )
    }

    return (
        <div>
            <div className={classes.alertTable}>{alertTable()}</div>
            <div className={classes.mapContainer}>{map()}</div>
        </div>
    )
}

export default withStyles(styles)(VolcanoMap);
