import axios from "axios";
import { JSDOM } from "jsdom";
import { VAACRegion, LightningGeoJSON, LightningFeature, DataType } from '@metservice/aviationtypes';


export const extractFromDom = (domArray: HTMLCollectionOf<Element>, alertLevel: string): LightningFeature[] => {
    const array: Element[] = [];
    for (let i = 0; i < domArray.length; i++) {
        const element = domArray[i];
        array.push(element);
    };
    return array.filter((element) => {
        const td = element.getElementsByTagName("td");
        const region = td[2].innerHTML;
        return Object.values(VAACRegion).find((el) => el === region) ? element : null
    }).filter(Boolean).map((element) => {
        const td = element.getElementsByTagName("td");
        const name = td[1].innerHTML;
        const region = td[2].innerHTML;
        const type = td[3].innerHTML;
        const lat = Number(td[4].innerHTML);
        const lon = Number(td[5].innerHTML);
        const twentyKStrikes = Number(td[6].innerHTML);
        const hundredKStrikes = Number(td[7].innerHTML);
        return {
            geometry: {
                coordinates: [lat, lon],
                type: DataType.POINT,
            },
            properties: {
                name,
                region,
                type,
                twentyKStrikes,
                hundredKStrikes,
                timestamp: new Date(),
                alertLevel: alertLevel === 'inner' ? 'warning' : 'error',
            },
            type: DataType.FEATURE,
        };
    });
};

/**
 * Promise based function to return recent lightning strikes around VAAC Regions
 * @returns {LightningGeoJSON}
 */
export const fetchLightningStrikes = async(): Promise<LightningGeoJSON> => {
    const call = await axios.get('https://wwlln.net/USGS/Global/')
    const dom = new JSDOM(call.data);
    const features = ['inner', 'alert'].map((className) => {
        const domObject = dom.window.document.getElementsByClassName(className);
        return extractFromDom(domObject, className);
    }).flat() as LightningFeature[];
    return { type: 'FeatureCollection', features } as LightningGeoJSON;
};
