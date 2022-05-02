import moment from 'moment';
import { QuakeDict, RecentQuake } from '@metservice/aviationtypes';

const findRecentQuakes = (quakes: QuakeDict): RecentQuake[] => {
    const now = moment();
    const recentQuakes: RecentQuake[] = [];
    Object.entries(quakes).forEach(([volcanoID, history]) => {
        history?.forEach(q => {
            if (moment(q.properties.time).isSame(now, 'date') && q.properties.mmi >= 4) {
                recentQuakes.push({
                    volcanoID,
                    intensity: q.properties.intensity
                });
            };
        });
    });
    return recentQuakes;
};

export default findRecentQuakes;
