"use client";
import {createContext, Dispatch, MutableRefObject} from "react";
import {
    DispatchUpdateContext,
    LatestValueRefContext,
    ListenersRefInterface,
    ListenersRefContext,
    StringMap,
    UpdateAction,
} from "../types";

// const emptyRefObject = <T>(): MutableRefObject<StringMap<T>> => ({
//     current: new Map<string, T>()
// });

export const FacadeObjectPlaceholder = {} as const

export const defaultFunctionWarningMessage = 'Dispatch function has been called before being defined.';
const warnDispatchIsUndefined = () => {
    console.warn(defaultFunctionWarningMessage)
}

export function createSelectiveContext<T>(): SelectiveContext<T> {
    const latestValueRefContext = createContext<
        MutableRefObject<StringMap<T>>
    >(FacadeObjectPlaceholder as MutableRefObject<StringMap<T>>);
    const listenersRefContext = createContext<
        MutableRefObject<ListenersRefInterface<T>>
    >(FacadeObjectPlaceholder as MutableRefObject<ListenersRefInterface<T>>);
    const dispatchUpdateContext = createContext<Dispatch<UpdateAction<T>>>(warnDispatchIsUndefined);
    return {latestValueRefContext, listenersRefContext, dispatchUpdateContext};
}

export interface SelectiveContext<T> {
    latestValueRefContext: LatestValueRefContext<T>;
    listenersRefContext: ListenersRefContext<T>;
    dispatchUpdateContext: DispatchUpdateContext<T>;
}

