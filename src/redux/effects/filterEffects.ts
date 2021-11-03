import { Dispatch } from 'redux';
import { nzFilterAction, vaFilterAction, cniFilterAction, wiFilterAction, satFilterAction } from '../actions/filterActions';
import {
    NZFilterType, VAFilterType, CNIFilterType, WIFilterType, SATFilterType
  } from '../types/filterType';

export const setNZFilter = (bool:boolean) => {
    return async function (dispatch: Dispatch<NZFilterType>) {
        dispatch(nzFilterAction(bool));
    };
};

export const setVAFilter = (bool:boolean) => {
    return async function (dispatch: Dispatch<VAFilterType>) {
        dispatch(vaFilterAction(bool));
    };
};

export const setCNIFilter = (bool:boolean) => {
    return async function (dispatch: Dispatch<CNIFilterType>) {
        dispatch(cniFilterAction(bool));
    };
};

export const setWIFilter = (bool:boolean) => {
    return async function (dispatch: Dispatch<WIFilterType>) {
        dispatch(wiFilterAction(bool));
    };
};

export const setSATFilter = (bool:boolean) => {
    return async function (dispatch: Dispatch<SATFilterType>) {
        dispatch(satFilterAction(bool));
    };
};
