import { useReducer } from "react";
import { filtersReducer } from '../volcano/headers';

const useFilter = () => {
    const filtersState = {
        showVA: true,
        showNZ: true,
        showCNI: true,
        showWI: true,
        showSAT: true,
        showARC: true,
    };
    const [filters, dispatchFilter] = useReducer(filtersReducer, filtersState);

    return { filters, dispatchFilter };
};

export default useFilter;
