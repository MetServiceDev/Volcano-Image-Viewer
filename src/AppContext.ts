import { createContext } from "react";
import { Volcano } from './api/volcano/headers';
import { QuakeDict } from './api/quakes/headers';
import { User } from "./api/User/headers";

interface Context {
    volcanoes: Volcano[];
    polling: boolean;
    links: string[];
    quakes: QuakeDict;
    user: User | null | undefined;
    expandSidebar: boolean;
    toggleSidebar: (state: boolean) => void;
    gridDisplay: number;
    setGrid: (state: number) => void;
    theme: boolean;
    filters: {
        showVA: boolean;
        showNZ: boolean;
        showCNI: boolean;
        showWI: boolean;
        showSAT: boolean;
        showARC: boolean;
    };
    dispatchFilter: any;
    counter: number;
    fetchLinks: () => void;
};

export const AppContext = createContext<Context>({
    volcanoes: [],
    polling: true,
    links: [],
    quakes: {},
    user: null,
    expandSidebar: false,
    toggleSidebar: () => null,
    gridDisplay: 4,
    setGrid: () => null,
    theme: false,
    filters: {
        showVA: true,
        showNZ: true,
        showCNI: true,
        showWI: true,
        showSAT: true,
        showARC: true,
    },
    dispatchFilter: () => null,
    counter: 10,
    fetchLinks: () => null
});
