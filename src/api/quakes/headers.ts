enum GNSTypes {
    POINT = 'Point',
    FEATURE = 'Feature',
}

export enum VolcanoLevels {
    UNNOTICABLE = 'Unnoticeable',
    WEAK = 'Weak',
    LIGHT = 'Light',
    MODERATE = 'Moderate',
    STRONG = 'Strong',
    SEVERE = 'Severe',
    EXTREME = 'Extreme'
}

interface Geometry {
    coordinates: [number, number];
    type: GNSTypes.POINT;
}

interface QuakeProperties {
    publicID: string;
    time: string,
    depth: number;
    magnitude: number;
    locality: string;
    intensity: VolcanoLevels;
    regionIntensity: string;
    mmi: number;
    quality: string;
    status: string;
}

export interface Quake {
    type: GNSTypes.FEATURE;
    geometry: Geometry;
    properties: QuakeProperties;
};

export type QuakeDict = NodeJS.Dict<Quake[]>

export interface QuakeWithLocation {
    history: Quake[];
    volcanoID: string;
};

export interface RecentQuake {
    volcanoID: string;
    intensity: QuakeProperties['intensity'];
}

interface VALProperties {
    acc: string;
    activity: string;
    hazards: string;
    level: number;
    volcanoID: string;
    volcanoTitle: string;
}

export interface GNSVAL {
    type: GNSTypes.FEATURE;
    geometry: Geometry;
    properties: VALProperties
}

export enum EmissionElements {
    SO2 = 'SO2',
    CO2 = 'CO2',
    H2S = 'H2S'
};

export type IntensityFreq = NodeJS.Dict<Quake[]>

export const quakeMarker = {
    unnoticable: {
        primary: '#ffc65c',
        bg: 'rgba(255, 198, 92, 0.5)',
        radius: 6
    },
    weak: {
        primary: '#ffbe45',
        bg: 'rgba(255, 190, 69, 0.5)',
        radius: 6
    },
    light: {
        primary: '#ffb224',
        bg: 'rgba(255, 178, 36, 0.5)',
        radius: 8
    },
    moderate: {
        primary: '#ff7f1c',
        bg: 'rgba(255, 127, 28, 0.5)',
        radius: 8
    },
    strong: {
        primary: '#ff3c00',
        bg: 'rgba(255, 60, 0, 0.5)',
        radius: 10
    },
    severe: {
        primary: '#ff1e00',
        bg: 'rgba(255, 30, 0, 0.5)',
        radius: 12
    },
    extreme: {
        primary: '#ff0000',
        bg: 'rgba(255, 0, 0, 0.5)',
        radius: 14
    }
};