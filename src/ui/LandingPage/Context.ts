import { createContext } from "react";
import { LightningStrikes } from '../../api/lightning/headers';

interface Context {
    lightningAlerts: LightningStrikes | null | undefined;
    setAlerts: any;
};

export const LandingPageContext = createContext<Context>({
    lightningAlerts: null,
    setAlerts: () => null,
});
