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

const emptyRefObject = <T>(): MutableRefObject<StringMap<T>> => ({
    current: new Map<string, T>()
});


const warnDispatchIsUndefined = () => {
    console.warn('Dispatch function has been called before being defined.')
}

export function createSelectiveContext<T>(): SelectiveContext<T> {
    const latestValueRefContext = createContext<
        MutableRefObject<StringMap<T>>
    >(emptyRefObject());
    const listenersRefContext = createContext<
        MutableRefObject<ListenersRefInterface<T>>
    >(emptyRefObject());
    const dispatchUpdateContext = createContext<Dispatch<UpdateAction<T>>>(warnDispatchIsUndefined);
    return {latestValueRefContext, listenersRefContext, dispatchUpdateContext};
}

export interface SelectiveContext<T> {
    latestValueRefContext: LatestValueRefContext<T>;
    listenersRefContext: ListenersRefContext<T>;
    dispatchUpdateContext: DispatchUpdateContext<T>;
}

