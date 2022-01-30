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
};

export const AppContext = createContext<Context>({
    volcanoes: [],
    polling: true,
    links: [],
    quakes: {},
    user: null,
});
