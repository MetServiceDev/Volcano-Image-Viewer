import { createContext } from "react";
import { GeoJSON } from '../../api/lightning/headers';

interface Context {
    lightningAlerts: GeoJSON | null | undefined;
    setAlerts: any;
};

export const LandingPageContext = createContext<Context>({
    lightningAlerts: null,
    setAlerts: () => null,
});
