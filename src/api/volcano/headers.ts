import * as L from 'leaflet';

export interface Note {
    id: string;
    postedBy: string;
    postedTime: string;
    content: string;
    attachments?: string[];
    volcano: string;
    valid: string;
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
	uploadedAt?: string;
};

export enum PlotType {
    Scatter = 'scatter',
    Line = 'line'
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

export enum FilterActionType {
	VA = 'VANUATU',
	NZ = 'NZ',
	CNI = 'CNI',
	WI = 'WI',
	SAT = 'SAT',
	ARC = 'ARC'
}

export interface FilterAction {
	type: FilterActionType;
	payload: any;
};


export interface FilterState {
	showVA: boolean;
	showNZ: boolean;
	showCNI: boolean;
	showWI: boolean;
	showSAT: boolean;
	showARC: boolean;
}
  
export const filtersReducer = (state: FilterState, action: FilterAction) => {
	switch(action.type) {
		case FilterActionType.VA:
			return {
				...state,
				showVA: action.payload
			};
		case FilterActionType.NZ:
			return {
				...state,
				showNZ: action.payload
			};
		case FilterActionType.CNI:
			return {
				...state,
				showCNI: action.payload
			}
		case FilterActionType.WI:
			return {
				...state,
				showWI: action.payload
			};
		case FilterActionType.SAT:
			return {
				...state,
				showSAT: action.payload
			};
		case FilterActionType.ARC:
			return {
				...state,
				showARC: action.payload
			};
	}
};
