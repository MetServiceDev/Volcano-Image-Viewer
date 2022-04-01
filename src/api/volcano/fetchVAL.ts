import { gnsRestEndpoint } from '../../metadata/Endpoints';
import { GNSVAL } from '../quakes/headers';
import { VAL } from './headers';

const fetchVAL = async(): Promise<VAL[]> => {
    const call = await fetch(`${gnsRestEndpoint}/volcano/val`);
    const res = await call.json();
    const data = res.features as GNSVAL[];
    return data.map(val => {
        return {
            activity: val.properties.activity,
            level: String(val.properties.level),
            volcanoID: val.properties.volcanoID,
            acc: val.properties.acc,
            hazards: val.properties.hazards
        }
    }) as VAL[];
};

export default fetchVAL;
