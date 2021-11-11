import { gnsRestEndpoint } from '../../metadata/Endpoints';
import { QuakeWithLocation } from './headers';


const fetchQuakeHistory = async(ids: string[]): Promise<QuakeWithLocation[]> => {
    const history = await Promise.all(ids.map(async(id) => {
        try {
            const call = await fetch(`${gnsRestEndpoint}/volcano/quake/${id}`);
            const data = await call.json();
            return {
                history: data.features,
                volcanoID: id
            };
        } catch (err) {
            return null
        }   
    }));
    return history.flat().filter(Boolean) as QuakeWithLocation[];
};

export default fetchQuakeHistory;
