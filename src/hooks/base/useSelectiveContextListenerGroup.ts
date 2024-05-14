import {LatestValueRefContext, ListenersRefContext, StringMap} from "../../types";
import {Dispatch, SetStateAction, useContext, useEffect, useMemo, useState,} from "react";
import {addListenerAndRetrieveLatestValue} from "../../helpers/addListenerAndRetrieveLatestValue";
import {getCleanUpFunction} from "../../helpers/getCleanUpFunction";

function computeNextStringMap<T>(oldMap: StringMap<T>, key: string, replacementValue: T) {
    const newMap = new Map(oldMap); // Create a new Map with the entries of the existing Map
    newMap.set(key, replacementValue); // Update or add a new key-value pair
    return newMap
}

export function useSelectiveContextListenerGroup<T>(
    contextKeys: string[],
    listenerKey: string,
    listenersRefContext: ListenersRefContext<T>,
    latestValueRefContext: LatestValueRefContext<T>,
) {
    const listenersRef = useContext(listenersRefContext);
    const latestValueRef = useContext(latestValueRefContext);

    if (listenersRef === undefined || latestValueRef === undefined) {
        throw Error(`Could not find either listeners and/or latestValue refs: ${listenersRef}, ${latestValueRef}`)
    }

    const [currentState, setCurrentState] = useState<StringMap<(T)>>(new Map());

    // Map the context keys to their own function, each updating the inner string map state.
    const listenerUpdateArray = useMemo(() => {
        return contextKeys.map(key => {
            const setStateAction: Dispatch<SetStateAction<T>> = (value: SetStateAction<T>) => {
                if (value instanceof Function) {
                    setCurrentState(stringMap => {
                        const prev = stringMap.get(key)
                        if (prev === undefined) {
                            console.error(`Attempted to update '${key}' with a function but no initial value exists.`);
                            return stringMap; // return the unchanged map if no previous value exists
                        }
                        const updated = value(prev);
                        return computeNextStringMap(stringMap, key, updated)
                    })

                } else {
                    setCurrentState(stringMap => computeNextStringMap(stringMap, key, value))
                }
            };
            return setStateAction
        })
    }, [contextKeys]);

    // If the contextKeys prop changes, remove local entries that are no longer on the listen list.
    useEffect(() => {
        setCurrentState(stringMap => {
            const currentContextKeys = new Set(contextKeys);
            const filteredMap: StringMap<T> = new Map(
                [...stringMap.entries()].filter(entry => currentContextKeys.has(entry[0]))
            )
           return filteredMap
        })
    }, [contextKeys, setCurrentState])

    // Use the memoized function list to subscribe to each context key.
    useEffect(() => {

        for (let i = 0; i < contextKeys.length; i++) {
            const contextKey = contextKeys[i]
            let currentListeners = listenersRef.current.get(contextKey) ;

            if (currentListeners === undefined) {
                currentListeners = new Map()
                listenersRef.current.set(contextKey, currentListeners)

            }
            addListenerAndRetrieveLatestValue(contextKey, listenerKey, currentListeners, latestValueRef, listenerUpdateArray[i])
            // if (currentListeners !== undefined) {
            //     currentListeners.set(listenerKey, listenerUpdateArray[i])
            //
            //     const currentValue = latestValueRef.current.get(contextKey);
            //
            //     if (currentValue !== undefined) {
            //         listenerUpdateArray[i](() => currentValue);
            //     }
            // }
        }

        const listeners = listenersRef.current

        const cleanUpHookArray: (() => void)[] = []

            for (const contextKey of contextKeys) {
                const listenersMap = listeners.get(contextKey);
                cleanUpHookArray.push(getCleanUpFunction(listenersMap, listenerKey))
                // if (listenersMap !== undefined) {
                //     listenersMap.delete(listenerKey);
                // }

            }

        return () => cleanUpHookArray.forEach(fn => fn())
    }, [contextKeys, listenerKey, latestValueRef]);

    return {currentState};
}
