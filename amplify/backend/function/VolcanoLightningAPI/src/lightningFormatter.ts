import axios from "axios";
import { JSDOM } from "jsdom";

enum VAACRegion {
    NEW_ZEALAND = 'New Zealand',
    KERMADEC_IS = 'Kermadec Is',
    TONGA = 'Tonga-SW Pacific',
    SAMOA = 'Samoa-SW Pacific',
    SW_PACIFIC = 'SW Pacific',
    FIJI = 'Fiji Is-SW Pacific',
    VANUATU = 'Vanuatu-SW Pacific',
    PACIFIC_S = 'Pacific-S',
    ANTARCTICA = 'Antarctica',
};

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
};

interface GeoJSON {
    type: string;
    features: Feature[]
};


export const extractFromDom = (domArray: HTMLCollectionOf<Element>): Feature[] => {
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
                type: 'Point',
            },
            properties: { name, region, type, twentyKStrikes, hundredKStrikes, timestamp: new Date() },
            type: 'Feature',
        };
    });
};

/**
 * Promise based function to return recent lightning strikes around VAAC Regions
 * @returns {GeoJSON}
 */
export const fetchLightningStrikes = async(): Promise<GeoJSON> => {
    const call = await axios.get('https://wwlln.net/USGS/Global/')
    const dom = new JSDOM(call.data);
    const features = ['inner', 'alert'].map((className) => {
        const domObject = dom.window.document.getElementsByClassName(className);
        return extractFromDom(domObject);
    }).flat() as Feature[];
    return { type: 'FeatureCollection', features } as GeoJSON;
};