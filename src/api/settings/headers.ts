import { Color } from '@material-ui/lab';

export enum SettingsOptions {
    Display = 'Display',
    NavOptions = 'Nav Options',
}

export interface RecentScanStatus {
    status: Color | undefined;
    timestamp: Date;
    newImages?: string[];
    msg?: string;
};
