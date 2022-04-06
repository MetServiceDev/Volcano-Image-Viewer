import { quakeMarker } from './headers';
import { QuakeIntesity } from '@metservice/aviationtypes';
import { greenIcon, yellowIcon, redIcon } from '../volcano/headers';

export const quakeLevel = (intensity: QuakeIntesity) => {
    switch (intensity) {
        case QuakeIntesity.UNNOTICABLE.toLowerCase():
            return quakeMarker.unnoticable;
        case QuakeIntesity.WEAK.toLowerCase():
            return quakeMarker.weak;
        case QuakeIntesity.LIGHT.toLowerCase():
            return quakeMarker.light;
        case QuakeIntesity.MODERATE.toLowerCase():
            return quakeMarker.moderate;
        case QuakeIntesity.STRONG.toLowerCase():
            return quakeMarker.strong;
        case QuakeIntesity.SEVERE.toLowerCase():
            return quakeMarker.severe;
        case QuakeIntesity.EXTREME.toLowerCase():  
            return quakeMarker.extreme;
        default:
            return quakeMarker.unnoticable;
    }
};

export const getIcon = (alertLevel: string) => {
    switch(alertLevel){
        case '0':
        case '1':
            return greenIcon;
        case '2':
        case '3':
            return yellowIcon;
        case '4':
        case '5':
            return redIcon;
        default:
            return greenIcon;
    };
};