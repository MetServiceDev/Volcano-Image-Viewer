import * as L from 'leaflet';

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
	gnsID?: string;
	FIT_ID?: string;
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
	RSAM = 'RSAM',
	QUAKES = 'QUAKES',
	GAS_EMISSION = 'GAS_EMISSION'
};

export interface Thumbnail {
    src: string,
    timestamp?: string,
    size?: number,
	hasntUpdated?: boolean
};

export interface VAL {
	msg: string;
	level: string;
	volcanoID?: string;
	hazards?: string;
};

export interface EmissionMeasures {
	element: string;
	data: {
		time: string;
		measurement: number;
		error: Number;
	}[];
};

export interface EmissionData {
	volcano: string;
	data: EmissionMeasures[];
}

export const greenIcon = new L.Icon({
    iconUrl:"https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|03fc77&chf=a,s,ee00FFFF",
    popupAnchor: [1, -30],
    iconAnchor: [10, 30]
});

export const yellowIcon = new L.Icon({
    iconUrl:"https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|fcbe03&chf=a,s,ee00FFFF",
    popupAnchor: [1, -30],
    iconAnchor: [10, 30]
});

export const redIcon = new L.Icon({
    iconUrl:"https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff2e2e&chf=a,s,ee00FFFF",
    popupAnchor: [1, -30],
    iconAnchor: [10, 30]
});
