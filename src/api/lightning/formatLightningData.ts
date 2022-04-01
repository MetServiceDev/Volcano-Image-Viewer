<<<<<<< HEAD
import { LightningStrikes, LightningObservation, LightningState } from './headers';
=======
import { LightningState, GeoJSON } from './headers';
>>>>>>> feature-amplify-backend

const formatLightningData = (lightningData: GeoJSON): LightningState => {
    const { features } = lightningData;
    const warningStrikes = features.filter((feature) => feature.properties.alertLevel === 'warning');
    const alertStrikes = features.filter((feature) => feature.properties.alertLevel === 'error');
    const regions = [...new Set(features.map((feature) => feature.properties.region))].join(', ').trim();
    const volcanoes = [...new Set(features.map((feature) => feature.properties.name))].join(', ').trim();
    const twentyKStrikes = features.map((feature) => feature.properties.twentyKStrikes);
    const hundreadKStrikes = features.map((feature) => feature.properties.hundredKStrikes);
    const maxTwentyStrikes = Math.max(...twentyKStrikes);
    const maxHundreadStrikes = Math.max(...hundreadKStrikes);
    if (warningStrikes.length === 0 && alertStrikes.length === 0) {
        return {
            severity: 'success',
            msg: 'No current lightning alerts for possible eruptions',
        };
        
    } else if (alertStrikes.length === 0 && warningStrikes.length > 0) {
        return {
            msg: `${regions}: Lightning data shows ${maxTwentyStrikes} strike${maxTwentyStrikes > 1 ? 's' : ''} within 20km and ${maxHundreadStrikes} 
strike${maxHundreadStrikes > 1 ? 's' : ''} within 100km of ${volcanoes}, Please check latest imagery.`,
            severity: 'warning',
        }
    } else if (alertStrikes.length > 0 && warningStrikes.length === 0) {
        return {
            msg: `${regions}: Lightning data indicates possible eruption happening at ${volcanoes} --- Please check latest imagery!`,
            severity: 'warning',
            strikeLocations: alertStrikes
        }
    }
    return {
        msg: `${regions}: Possible eruption at ${alertStrikes.map((strike) => strike.properties.name).join(', ').trim()} --- 
${maxTwentyStrikes} lightning strike${maxTwentyStrikes > 1 ? 's' : ''} also reported within 20km of ${warningStrikes.map((strike) => strike.properties.name).join(', ').trim()}`,
        severity: 'error',
        strikeLocations: [...alertStrikes, ...warningStrikes]
    }
};


export default formatLightningData;
