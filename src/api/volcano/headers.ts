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

export enum VolcanoLocation {
	VANUATU = 'Vanuatu',
	NZ = 'NZ',
	CENTRAL_NI = 'Central NI',
	WI = 'WI',
};

export enum OverviewDisplay {
	THUMBNAIL = 'THUMBNAIL',
	DRUM_GRAPH = 'DRUM_GRAPH',
	RSAM = 'RSAM'
};
