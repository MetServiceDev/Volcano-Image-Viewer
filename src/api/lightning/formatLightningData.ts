import { LightningStrikes, LightningObservation, LightningState } from './headers';
// import testData from './testData.json';

const getRegions = (observation: LightningObservation) => Object.keys(observation).map((val) => val);

const getVolcanoes = (observation: LightningObservation) => {
    return Object.values(observation).map((data: any) => {
        return Object.keys(data).map((volcanoName) => volcanoName);
    }).flat();
};

const getStrikeLocations = (strikes: LightningStrikes) => {
    return Object.values(strikes).map((observation: LightningObservation) => {
        return Object.values(observation).map((data: any) => {
            return Object.entries(data).map(([key, value]: any) => {
                return {
                    ...value,
                    name: key
                }
            });
        }).flat();
    }).flat().reduce((prev, curr) => {
        return { ...prev, [curr.name]: curr }
    }, {})
};

const formatLightningData = (strikes: LightningStrikes): LightningState => {
    const strikeLocations = getStrikeLocations(strikes);
    if (Object.keys(strikes.alertStrikes || {}).length === 0 && Object.keys(strikes.warningStrikes || {}).length === 0) {
        return {
            severity: 'success',
            msg: 'No current lightning alerts for possible eruptions',
        };
        
    }    
    else if (Object.keys(strikes.alertStrikes || {}).length === 0 && Object.keys(strikes.warningStrikes || {}).length > 0) {
        const hundreadKStrikes: number[] = [];
        const twentyKStrikes: number[] = [];
        const regions = getRegions(strikes.warningStrikes).join(', ').trim();
        const volcanoes = getVolcanoes(strikes.warningStrikes);
        Object.values(strikes.warningStrikes).forEach((data: any) => {
            Object.entries(data).forEach(([name, values]: any) => {
                twentyKStrikes.push(values.twentyKStrikes)
                hundreadKStrikes.push(values.hundredKStrikes)
            });
        });
        const maxTwentyStrikes = Math.max(...twentyKStrikes);
        const maxHundreadStrikes = Math.max(...hundreadKStrikes)
        return {
            msg: `${regions}: Lightning data shows ${maxTwentyStrikes} strike${maxTwentyStrikes > 1 ? 's' : ''} within 20km and ${maxHundreadStrikes} strike${maxHundreadStrikes > 1 ? 's' : ''} within 100km of ${volcanoes.join(', ').trim()}, Please check latest imagery.`,
            severity: 'warning',
            strikeLocations
        }
    }
    else if (Object.keys(strikes.alertStrikes || {}).length > 0 && Object.keys(strikes.warningStrikes || {}).length === 0) {
        const regions = getRegions(strikes.alertStrikes).join(', ').trim();
        const volcanoes = getVolcanoes(strikes.alertStrikes)
        return {
            msg: `${regions}: Lightning data indicates possible eruption happening at ${volcanoes.join(', ').trim()} --- Please check latest imagery!`,
            severity: 'warning',
            strikeLocations
        }
    }
    const alertRegions = getRegions(strikes.alertStrikes || {});
    const warningRegions = getRegions(strikes.warningStrikes || {});
    const twentyKStrikes: number[] = [];
    Object.values(strikes.warningStrikes).forEach((data: any) => {
        Object.values(data).forEach((values: any) => {
            twentyKStrikes.push(values.twentyKStrikes)
        });
    });
    const regions = [...alertRegions, ...warningRegions];
    const regionsString = [...new Set(regions)].join(', ').trim();
    const maxTwentyStrikes = Math.max(...twentyKStrikes);
    const alertVolcanoes = getVolcanoes(strikes.alertStrikes || {});
    const warningVolcanoes = getVolcanoes(strikes.warningStrikes || {});
    return {
        msg: `${regionsString}: Possible eruption at ${alertVolcanoes.join(', ').trim()} --- ${maxTwentyStrikes} lightning strike${maxTwentyStrikes > 1 ? 's' : ''} also reported within 20km of ${warningVolcanoes.join(', ').trim()}`,
        severity: 'error',
        strikeLocations
    }
};

export default formatLightningData;
