import { createContext } from "react";
import { Volcano, QuakeDict } from '@metservice/aviationtypes';
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
    currentImages: {
        imageLog: any;
        setImageLog: any;
    };
    navFilterState: {
        showNavFilter: boolean;
        showNavGrid: boolean;
        showThemeToggle: boolean;
        dispatchNavOption: any;
    };
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
    fetchLinks: () => null,
    currentImages: {
        imageLog: {},
        setImageLog: () => null,
    },
    navFilterState: {
        showNavFilter: false,
        showNavGrid: false,
        showThemeToggle: false,
        dispatchNavOption: () => null,
    },
});
