import {ListenerRefInterface, StringMap} from "../../types";
import {Context, Dispatch, MutableRefObject, SetStateAction, useContext, useEffect, useMemo, useState,} from "react";

export function useSelectiveContextListenerGroup<T>(
    contextKeys: string[],
    listenerKey: string,
    fallBackValue: StringMap<T>,
    updateRefContext: Context<MutableRefObject<ListenerRefInterface<T>>>,
    latestValueRefContext: Context<MutableRefObject<StringMap<T>>>,
) {
    const updateTriggers = useContext(updateRefContext);
    const latestRef = useContext(latestValueRefContext);
    // let currentValue: StringMap<T> | undefined = undefined;
    // try {
    //     currentValue = latestRef.current;
    // } catch (e) {
    //     console.error(e);
    // }

    // const initialValue =
    //     currentValue === undefined ||
    //     currentValue === null ||
    //     currentValue[contextKeys] === undefined
    //         ? fallBackValue
    //         : latestRef.current[contextKeys];

    const [currentState, setCurrentState] = useState<StringMap<T>>(fallBackValue);

    const safeToAddListeners = updateTriggers !== undefined

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

    // for (let i = 0; i < contextKeys.length; i++) {
    //     let contextKey = contextKeys[i]
    //     let currentListeners = safeToAddListeners ? updateTriggers.current[contextKey] : undefined;
    //     if (safeToAddListeners && currentListeners === undefined) {
    //         updateTriggers.current[contextKey] = {};
    //         currentListeners = updateTriggers.current[contextKey];
    //         currentListeners[listenerKey] = listenerUpdateArray[i];
    //     }
    // }


    useEffect(() => {
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
            for (let contextKey of contextKeys) {
                if (listeners[contextKey] !== undefined) {
                    delete listeners[contextKey];
                }

            }
        };
    }, [contextKeys, listenerKey, latestRef]);

    return {currentState};
}
