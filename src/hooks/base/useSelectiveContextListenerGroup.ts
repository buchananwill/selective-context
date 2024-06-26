import {LatestValueRefContext, ListenersRefContext, StringMap} from "../../types";
import {Dispatch, SetStateAction, useContext, useEffect, useMemo, useState,} from "react";
import {addListenerAndRetrieveLatestValue} from "../../helpers/addListenerAndRetrieveLatestValue";
import {getCleanUpFunction} from "../../helpers/getCleanUpFunction";
import {FacadeObjectPlaceholder} from "../../creators/genericSelectiveContextCreator";

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
    if (listenersRef === FacadeObjectPlaceholder || latestValueRef === FacadeObjectPlaceholder) {
        throw Error(`Could not find either listeners and/or latestValue refs: ${listenersRef}, ${latestValueRef}`)
    }

    const [currentState, setCurrentState] = useState<StringMap<(T)>>(new Map());

    // Map the context keys to their own function, each updating the inner string map state.
    const listenerUpdateArray = useMemo(() => {
        return contextKeys.map(key => {
            const setStateAction: Dispatch<SetStateAction<T>> = (value: SetStateAction<T>) => {
                if (value instanceof Function) { throw Error(`Function supplied as listener update argument. Listener group should not be computing its own state: only copying the values it is subscribed to. Function supplied: ${value}`)
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
        }

        const listeners = listenersRef.current

        const cleanUpHookArray: (() => void)[] = []

            for (const contextKey of contextKeys) {
                const listenersMap = listeners.get(contextKey);
                cleanUpHookArray.push(getCleanUpFunction(listenersMap, listenerKey))
            }

        return () => cleanUpHookArray.forEach(fn => fn())
    }, [contextKeys, listenerKey, latestValueRef]);

    return {currentState};
}
