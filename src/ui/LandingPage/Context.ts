import { createContext } from "react";
import { LightningData } from '../../api/lightning/headers';

interface Context {
    lightningAlerts: LightningData | null | undefined;
    setAlerts: any;
};

export const LandingPageContext = createContext<Context>({
    lightningAlerts: null,
    setAlerts: () => null,
});
