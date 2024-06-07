import {SelectiveListeners, StringMap} from "../types";
import {Dispatch, MutableRefObject, SetStateAction} from "react";

export function addListenerAndRetrieveLatestValue<T>(contextKey: string, listenerKey: string, currentListeners: SelectiveListeners<T> | undefined, latestValueRef: MutableRefObject<StringMap<T>>, setCurrentState: Dispatch<SetStateAction<T>>) {
    if (currentListeners !== undefined) {
        if (currentListeners.has(listenerKey)) {
            throw new Error(`duplicated listener key detected: ${listenerKey}. Every listener must have a unique key within a contextKey namespace in order to receive updates.`)
        }
        currentListeners.set(listenerKey, setCurrentState)
        const latestValue = latestValueRef.current.get(contextKey);
        // TODO: This conditional prevents the listener's state from retrieving undefined, EVEN WHEN DESIRED BY THE CLIENT.
        // TODO: Refactor return types to allow undefined.
        if (latestValue !== undefined) {
            setCurrentState(latestValue);
        }
    }
}