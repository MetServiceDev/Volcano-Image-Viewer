import apiCall from './APICall';

interface Volcano {
	code: string;
	coordinates: {
		lat: number;
		long: number;
	};
	drumLink?: string;
	index: number;
	location: string;
	mountain?: string;
	name: string;
	s3Link: string;
	volcanicAlerts?: {
		level: string;
		msg: string;
	};
	relatedVolanoes?: string[];
};

const poll = async ( token: string, cb: (res: Volcano[]) => {} ) => {
    const fetch = await apiCall('volcano-list', 'GET', token);
    cb(fetch as Volcano[]);
};

export { poll };
