import {ListenersRefInterface, SelectiveListeners, StringMap} from "../../types";
import {Context, Dispatch, MutableRefObject, SetStateAction, useContext, useEffect, useState,} from "react";

export function getCleanUpFunction<T>(currentListeners: StringMap<Dispatch<SetStateAction<T>>> | undefined, listenerKey: string) {
    return () => {
        if (currentListeners) {
            currentListeners.delete(listenerKey);
        }
    };
}

export function addListenerAndRetrieveLatestValue<T>(contextKey: string, listenerKey: string, currentListeners: SelectiveListeners<T> | undefined, latestValueRef: MutableRefObject<StringMap<T>>, setCurrentState: Dispatch<SetStateAction<T>>) {
    if (currentListeners !== undefined) {
        currentListeners.set(listenerKey, setCurrentState)
        const latestValue = latestValueRef.current.get(contextKey);
        if (latestValue !== undefined) {
            setCurrentState(latestValue);
        }
    }
}

export function useSelectiveContextListener<T>(
    contextKey: string,
    listenerKey: string,
    fallBackValue: T,
    listenerRefContext: Context<MutableRefObject<ListenersRefInterface<T>>>,
    latestValueRefContext: Context<MutableRefObject<StringMap<T>>>,
) {
    const listenerRef = useContext(listenerRefContext);
    const latestValueRef = useContext(latestValueRefContext);
    // let currentValue: StringMap<T>
    // | undefined;

    const currentValue = latestValueRef.current.get(contextKey);
    let initialValue: T = fallBackValue
    if (currentValue !== undefined) {
        initialValue = currentValue
    }
    // const initialValue =
    //   currentValue === undefined ||
    //   currentValue === null ||
    //   currentValue.get(contextKey) === undefined
    //     ? fallBackValue
    //     : currentValue.get(contextKey);

    const [currentState, setCurrentState] = useState<T>(initialValue);

    const safeToAddListeners = listenerRef.current !== undefined

    let currentListeners = safeToAddListeners ? listenerRef.current.get(contextKey) : undefined;
    if (currentListeners === undefined && safeToAddListeners) {
        currentListeners = new Map()
        // currentListeners.set(listenerKey, setCurrentState); I think this is unnecessary as the effect performs the subscription.
        listenerRef.current.set(contextKey, currentListeners);
    }

    useEffect(() => {
        addListenerAndRetrieveLatestValue(contextKey, listenerKey, currentListeners, latestValueRef, setCurrentState)
        // if (currentListeners !== undefined) {
        // currentListeners.set(listenerKey, setCurrentState)
        //   const latestValue = latestValueRef.current.get(contextKey);
        // if (latestValue !== undefined) {
        //   setCurrentState(latestValue);
        // }
        //
        // }
        return getCleanUpFunction(currentListeners, listenerKey);
    }, [currentListeners, contextKey, listenerKey, latestValueRef]);

    return {currentState, latestRef: latestValueRef};
}

