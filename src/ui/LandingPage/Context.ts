import { createContext } from "react";
import { LightningGeoJSON } from '@metservice/aviationtypes';

interface Context {
    lightningAlerts: LightningGeoJSON | null | undefined;
    setAlerts: any;
};

export const LandingPageContext = createContext<Context>({
    lightningAlerts: null,
    setAlerts: () => null,
});
