import { VolcanicAlertFeature, VolcanicAlert } from '@metservice/aviationtypes';
import { gnsRestEndpoint } from '../../metadata/Endpoints';

const fetchVAL = async(): Promise<VolcanicAlert[]> => {
    const call = await fetch(`${gnsRestEndpoint}/volcano/val`);
    const res = await call.json();
    const data = res.features as VolcanicAlertFeature[];
    return data.map(val => {
        return {
            activity: val.properties.activity,
            level: String(val.properties.level),
            volcanoID: val.properties.volcanoID,
            acc: val.properties.acc,
            hazards: val.properties.hazards
        }
    }) as VolcanicAlert[];
};

export default fetchVAL;
