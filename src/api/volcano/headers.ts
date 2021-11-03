export interface Volcano {
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
	relatedVolcanoes?: string[];
};