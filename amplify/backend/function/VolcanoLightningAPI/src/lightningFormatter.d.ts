interface Feature {
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
    };
    type: string;
}
interface GeoJSON {
    type: string;
    features: Feature[];
}
export declare const extractFromDom: (domArray: HTMLCollectionOf<Element>) => Feature[];
/**
 * Promise based function to return recent lightning strikes around VAAC Regions
 * @returns {GeoJSON}
 */
export declare const fetchLightningStrikes: () => Promise<GeoJSON>;
export {};
