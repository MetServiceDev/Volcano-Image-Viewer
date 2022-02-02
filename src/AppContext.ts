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
    theme: boolean
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
    theme: false
});