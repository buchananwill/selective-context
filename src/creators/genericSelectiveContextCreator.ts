"use client";
import {createContext, Dispatch, MutableRefObject} from "react";
import {
    StringMap,
    ListenerRefInterface,
    DispatchContext,
    ListenersRefContext,
    LatestValueRefContext,
    UpdateAction,
} from "../types";

export function createSelectiveContext<T>(): SelectiveContext<T> {
    const latestValueRefContext = createContext<
        MutableRefObject<StringMap<T>>
    >({} as MutableRefObject<StringMap<T>>);
    const listenerRefContext = createContext<
        MutableRefObject<ListenerRefInterface<T>>
    >({} as MutableRefObject<ListenerRefInterface<T>>);
    const dispatchContext = createContext<Dispatch<UpdateAction<T>>>(() => {
    });
    return {latestValueRefContext, listenerRefContext, dispatchContext};
}

export interface SelectiveContext<T> {
    latestValueRefContext: LatestValueRefContext<T>;
    listenerRefContext: ListenersRefContext<T>;
    dispatchContext: DispatchContext<T>;
}

