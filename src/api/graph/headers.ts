export enum GraphType {
    LINE = 'Line',
    BAR = 'Bar',
    PIE = 'Pie',
    SCATTER = 'Scatter'
};

export enum DataLabels {
    RESPONSE_TIME = 'Response Time (ms)',
    PACKET_LOSS = 'Packet Loss (%)',
};

export interface LineData<T> {
    label?: string;
    data: T;
    backgroundColor?: string;
    borderColor?: string;
    type?: string;
    id?: string;
    borderWidth?: number;
    fill?: boolean,
    pointRadius?: number;
    yAxisID?: string;
}