import { quakeMarker } from './headers';
import { greenIcon, yellowIcon, redIcon } from '../volcano/headers';

export const quakeLevel = (mmi: number) => {
    switch (mmi) {
        case 1:
        case 2:
            return quakeMarker.unnoticable;
        case 3:
            return quakeMarker.weak;
        case 4:
            return quakeMarker.light;
        case 5:
            return quakeMarker.moderate;
        case 6:
            return quakeMarker.strong;
        case 7:
            return quakeMarker.severe;
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:   
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