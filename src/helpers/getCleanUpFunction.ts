import {StringMap} from "../types";
import {Dispatch, SetStateAction} from "react";

export function getCleanUpFunction<T>(currentListeners: StringMap<Dispatch<SetStateAction<T>>> | undefined, listenerKey: string) {
    return () => {
        if (currentListeners) {
            currentListeners.delete(listenerKey);
        }
    };
}