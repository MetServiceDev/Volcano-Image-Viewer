"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchLightningStrikes = exports.extractFromDom = void 0;
const axios_1 = __importDefault(require("axios"));
const jsdom_1 = require("jsdom");
var VAACRegion;
(function (VAACRegion) {
    VAACRegion["NEW_ZEALAND"] = "New Zealand";
    VAACRegion["KERMADEC_IS"] = "Kermadec Is";
    VAACRegion["TONGA"] = "Tonga-SW Pacific";
    VAACRegion["SAMOA"] = "Samoa-SW Pacific";
    VAACRegion["SW_PACIFIC"] = "SW Pacific";
    VAACRegion["FIJI"] = "Fiji Is-SW Pacific";
    VAACRegion["VANUATU"] = "Vanuatu-SW Pacific";
    VAACRegion["PACIFIC_S"] = "Pacific-S";
    VAACRegion["ANTARCTICA"] = "Antarctica";
})(VAACRegion || (VAACRegion = {}));
;
;
;
const extractFromDom = (domArray) => {
    const array = [];
    for (let i = 0; i < domArray.length; i++) {
        const element = domArray[i];
        array.push(element);
    }
    ;
    return array.filter((element) => {
        const td = element.getElementsByTagName("td");
        const region = td[2].innerHTML;
        return Object.values(VAACRegion).find((el) => el === region) ? element : null;
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
exports.extractFromDom = extractFromDom;
/**
 * Promise based function to return recent lightning strikes around VAAC Regions
 * @returns {GeoJSON}
 */
const fetchLightningStrikes = () => __awaiter(void 0, void 0, void 0, function* () {
    const call = yield axios_1.default.get('https://wwlln.net/USGS/Global/');
    const dom = new jsdom_1.JSDOM(call.data);
    const features = ['inner', 'alert'].map((className) => {
        const domObject = dom.window.document.getElementsByClassName(className);
        return (0, exports.extractFromDom)(domObject);
    }).flat();
    return { type: 'FeatureCollection', features };
});
exports.fetchLightningStrikes = fetchLightningStrikes;
