import moment from 'moment';
import { QuakeWithLocation, RecentQuake } from './headers';

const findRecentQuakes = (quakeHistory: QuakeWithLocation[]): RecentQuake[] => {
    const now = moment();
    const recentQuakes: RecentQuake[] = []
    quakeHistory.forEach((quake) => {
        quake.history.forEach(q => {
            if (moment(q.properties.time).isSame(now, 'date') && q.properties.mmi >= 4) {
                recentQuakes.push({
                    volcanoID: quake.volcanoID,
                    intensity: q.properties.intensity
                });
            };
        });
    });
    return recentQuakes;
};

export default findRecentQuakes;
