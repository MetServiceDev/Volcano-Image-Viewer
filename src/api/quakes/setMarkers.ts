import { quakeMarker, VolcanoLevels } from './headers';
import { greenIcon, yellowIcon, redIcon } from '../volcano/headers';

export const quakeLevel = (intensity: VolcanoLevels) => {
    switch (intensity) {
        case VolcanoLevels.UNNOTICABLE.toLowerCase():
            return quakeMarker.unnoticable;
        case VolcanoLevels.WEAK.toLowerCase():
            return quakeMarker.weak;
        case VolcanoLevels.LIGHT.toLowerCase():
            return quakeMarker.light;
        case VolcanoLevels.MODERATE.toLowerCase():
            return quakeMarker.moderate;
        case VolcanoLevels.STRONG.toLowerCase():
            return quakeMarker.strong;
        case VolcanoLevels.SEVERE.toLowerCase():
            return quakeMarker.severe;
        case VolcanoLevels.EXTREME.toLowerCase():  
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