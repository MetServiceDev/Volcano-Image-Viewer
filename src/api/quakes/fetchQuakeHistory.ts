import { gnsRestEndpoint } from '../../metadata/Endpoints';
import { Quake } from './headers';

const fetchQuakeHistory = async(ids: string[]): Promise<Quake[]> => {
    const history = await Promise.all(ids.map(async(id) => {
        try {
            const call = await fetch(`${gnsRestEndpoint}/volcano/quake/${id}`);
            const data = await call.json();
            return data.features;
        } catch (err) {
            return null
        }   
    }));
    return history.flat().filter(Boolean) as Quake[];
};

export default fetchQuakeHistory;
