import { Color } from '@material-ui/lab';

export enum SettingsOptions {
    Display = 'Display',
    Monitor = 'Monitor',
    Image_scanner = 'Image Scan'
}

export interface RecentScanStatus {
    status: Color | undefined;
    timestamp: Date;
    newImages?: string[];
    msg?: string;
};
