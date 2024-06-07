import {LatestValueRefContext, ListenersRefContext} from "../../types";


import {addListenerAndRetrieveLatestValue} from "../../helpers/addListenerAndRetrieveLatestValue";
import {getCleanUpFunction} from "../../helpers/getCleanUpFunction";
import { useContext, useEffect, useState } from "react";
import {FacadeObjectPlaceholder} from "../../creators/genericSelectiveContextCreator";

export function useSelectiveContextListener<T>(
    contextKey: string,
    listenerKey: string,
    fallBackValue: T,
    listenerRefContext: ListenersRefContext<T>,
    latestValueRefContext: LatestValueRefContext<T>,
) {
    const listenersRef = useContext(listenerRefContext);
    const latestValueRef = useContext(latestValueRefContext);
    if (listenersRef === FacadeObjectPlaceholder || latestValueRef === FacadeObjectPlaceholder) {
        throw Error(`Could not find either listeners and/or latestValue refs: ${listenersRef}, ${latestValueRef}`)
    }

    const currentValue = latestValueRef.current.get(contextKey);
    let initialValue: T = fallBackValue
    if (currentValue !== undefined) {
        initialValue = currentValue
    }

    const [currentState, setCurrentState] = useState<T>(initialValue);

    const safeToAddListeners = listenersRef.current !== undefined

    let currentListeners = safeToAddListeners ? listenersRef.current.get(contextKey) : undefined;
    if (currentListeners === undefined && safeToAddListeners) {
        currentListeners = new Map()
        listenersRef.current.set(contextKey, currentListeners);
    }

    useEffect(() => {
        addListenerAndRetrieveLatestValue(contextKey, listenerKey, currentListeners, latestValueRef, setCurrentState)

        return getCleanUpFunction(currentListeners, listenerKey);
    }, [currentListeners, contextKey, listenerKey, latestValueRef]);

    return {currentState, latestValueRef};
}

