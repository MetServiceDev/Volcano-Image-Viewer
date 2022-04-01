export interface Feature {
    geometry: {
        coordinates: [number, number];
        type: string;
    };
    properties: {
        name: string;
        region: string;
        type: string;
        twentyKStrikes: number;
        hundredKStrikes: number;
        timestamp: Date;
        alertLevel: string;
    };
    type: string;
};

export interface GeoJSON {
    type: string;
    features: Feature[]
};

export interface LightningState {
    severity: string;
    msg: string;
    strikeLocations?: Feature[];
}
