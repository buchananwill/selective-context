import {ListenerRefInterface, StringMap} from "../../types";
import {Context, Dispatch, MutableRefObject, SetStateAction, useContext, useEffect, useMemo, useState,} from "react";
import {ObjectPlaceholder} from "./placeholders";

export function useSelectiveContextListenerGroup<T>(
    contextKeys: string[],
    listenerKey: string,
    updateRefContext: Context<MutableRefObject<ListenerRefInterface<T>>>,
    latestValueRefContext: Context<MutableRefObject<StringMap<T>>>,
) {
    const updateTriggers = useContext(updateRefContext);
    const latestRef = useContext(latestValueRefContext);

    const safeToAddListeners = updateTriggers !== undefined

    const [currentState, setCurrentState] = useState<StringMap<T>>(ObjectPlaceholder);

    // Map the context keys to their own function, each updating the inner string map state.
    const listenerUpdateArray = useMemo(() => {
        return contextKeys.map(key => {
            const setStateAction: Dispatch<SetStateAction<T>> = (value: SetStateAction<T>) => {
                if (value instanceof Function) {
                    setCurrentState(stringMap => {
                        const prev = stringMap[key]
                        const updated = value(prev);
                        return {...stringMap, [key]: updated}
                    })

                } else {
                    setCurrentState(stringMap => ({...stringMap, [key]: value}))
                }
            };
            return setStateAction
        })
    }, [contextKeys]);

    // If the contextKeys prop changes, remove local entries that are no longer on the listen list.
    useEffect(() => {
        setCurrentState(stringMap => {
            const currentContextKeys = new Set(contextKeys);
            const filteredMap: StringMap<T> = Object.entries(stringMap)
                .filter(entry => currentContextKeys.has(entry[0]))
                .reduce((prev, [currentKey, value]) => ({...prev, [currentKey]: value}), {})
           return filteredMap
        })
    }, [contextKeys, setCurrentState])

    // Use the memoized function list to subscribe to each context key.
    useEffect(() => {
        if (safeToAddListeners)
        for (let i = 0; i < contextKeys.length; i++) {
            let contextKey = contextKeys[i]
            let currentListeners = safeToAddListeners ? updateTriggers.current[contextKey] : undefined;

            if (currentListeners === undefined && safeToAddListeners) {
                updateTriggers.current[contextKey] = {};
                currentListeners = updateTriggers.current[contextKey];
            }

            if (currentListeners !== undefined) {
                currentListeners[listenerKey] = listenerUpdateArray[i];


                if (latestRef.current[contextKey] !== undefined) {
                    listenerUpdateArray[i](() => latestRef.current[contextKey]);
                }

            }
        }

        const listeners = updateTriggers.current

        return () => {
            for (let i = 0; i < contextKeys.length; i++){
                let contextKey = contextKeys[i];
                if (listeners[contextKey] !== undefined) {
                    delete listeners[contextKey][listenerKey];
                }

            }
        };
    }, [contextKeys, listenerKey, latestRef]);

    return {currentState};
}
