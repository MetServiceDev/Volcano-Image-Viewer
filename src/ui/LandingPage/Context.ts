import { createContext } from "react";
import { LightningResponse } from '@metservice/aviationtypes';

interface Context {
    lightningAlerts: LightningResponse | null | undefined;
    setAlerts: any;
};

export const LandingPageContext = createContext<Context>({
    lightningAlerts: null,
    setAlerts: () => null,
});
