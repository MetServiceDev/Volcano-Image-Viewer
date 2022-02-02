export interface LightningState {
    severity: string;
    msg: string;
    strikeLocations: StrikeLocation;
}

export interface LightningStrikesData {
    [volcanoName: string]: {
        twentyKStrikes: number;
        hundredKStrikes: number;
        coordinates: [number, number];
    }
};

export interface StrikeLocation {
    twentyKStrikes: number;
    hundredKStrikes: number;
    coordinates: [number, number];
    name: string;
}

export type LightningObservation = NodeJS.Dict<LightningStrikesData>;

export interface LightningStrikes {
    warningStrikes: LightningObservation;
    alertStrikes: LightningObservation;
};