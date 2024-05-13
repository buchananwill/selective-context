import {ListenerRefInterface, StringMap} from "../../types";
import {Context, Dispatch, MutableRefObject, SetStateAction, useContext, useEffect, useMemo, useState,} from "react";

function computeNextStringMap<T>(oldMap: StringMap<T>, key: string, replacementValue: T) {
    const newMap = new Map(oldMap); // Create a new Map with the entries of the existing Map
    newMap.set(key, replacementValue); // Update or add a new key-value pair
    return newMap
}

export function useSelectiveContextListenerGroup<T>(
    contextKeys: string[],
    listenerKey: string,
    updateRefContext: Context<MutableRefObject<ListenerRefInterface<T>>>,
    latestValueRefContext: Context<MutableRefObject<StringMap<T>>>,
) {
    const updateTriggers = useContext(updateRefContext);
    const latestRef = useContext(latestValueRefContext);

    const safeToAddListeners = updateTriggers !== undefined

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
        if (safeToAddListeners)
        for (let i = 0; i < contextKeys.length; i++) {
            let contextKey = contextKeys[i]
            let currentListeners = safeToAddListeners ? updateTriggers.current.get(contextKey) : undefined;

            if (currentListeners === undefined && safeToAddListeners) {
                currentListeners = new Map()
                updateTriggers.current.set(contextKey, currentListeners)

            }
            if (currentListeners !== undefined) {
                currentListeners.set(listenerKey, listenerUpdateArray[i])

                const currentValue = latestRef.current.get(contextKey);

                if (currentValue !== undefined) {
                    listenerUpdateArray[i](() => currentValue);
                }
            }
        }

        const listeners = updateTriggers.current

        return () => {
            for (let i = 0; i < contextKeys.length; i++){
                let contextKey = contextKeys[i];
                const listenersMap = listeners.get(contextKey);
                if (listenersMap !== undefined) {
                    listenersMap.delete(listenerKey);
                }

            }
        };
    }, [contextKeys, listenerKey, latestRef]);

    return {currentState};
}
