export interface LightningData {
    severity: string;
    msg: string
}

export interface APIResponse {
    alertCheck: number;
    innerCheck: number;
    alertNames: string[];
    innerNames: string[];
    areas: string[];
    twentyKStrikes: number;
    hundredKStrikes: number;
};