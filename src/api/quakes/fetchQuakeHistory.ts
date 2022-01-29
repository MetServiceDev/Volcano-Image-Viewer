import { gnsRestEndpoint } from '../../metadata/Endpoints';
import { QuakeDict } from './headers';


const fetchQuakeHistory = async(ids: string[]): Promise<QuakeDict> => {
    const history = await Promise.all(ids.map(async(id) => {
        try {
            const call = await fetch(`${gnsRestEndpoint}/volcano/quake/${id}`);
            const data = await call.json();
            let features = data.features;
            if (id === 'kermadecislands') {
                features = data.features.map((plot: any) => {
                    return {
                        ...plot,
                        geometry: {
                            ...plot.geometry,
                            coordinates: [
                                Number(plot.geometry.coordinates[0].toString().replace('-', '')),
                                Number(plot.geometry.coordinates[1]),
                            ]
                        }
                    }
                })
            }
            return {
                history: features,
                volcanoID: id
            };
        } catch (err) {
            return null
        }   
    }));
    return history.flat().filter(Boolean).reduce((prev: any, curr) => {
        return { ...prev, [curr?.volcanoID as string]: curr?.history };
    }, {}) as QuakeDict;
};

export default fetchQuakeHistory;
