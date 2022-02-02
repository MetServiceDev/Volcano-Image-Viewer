import { createContext } from "react";
import { LightningData } from '../../api/lightning/headers';

interface Context {
    lightningAlerts: any;
    setAlerts: any;
};

export const LandingPageContext = createContext<Context>({
    lightningAlerts: null,
    setAlerts: () => null,
});
