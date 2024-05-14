import {useCallback, useRef} from "react";
import {ListenersRefInterface, StringMap, UpdateAction} from "../../types";
import {useIntervalToClearValuesWithNoListeners} from "./useIntervalToClearValuesWithNoListeners";

export function useSelectiveContextManager<T>(
    initialContext: StringMap<T>,
) {
    const listenerRef = useRef<ListenersRefInterface<T>>(new Map());
    const latestValueRef = useRef(initialContext);

    const intervalClearRef = useRef<NodeJS.Timeout>();

    useIntervalToClearValuesWithNoListeners(listenerRef, latestValueRef, intervalClearRef);

    const dispatch = useCallback((action: UpdateAction<T>) => {
        const {contextKey, update} = action;
        const currentElement = latestValueRef.current.get(contextKey);
        const listeners = listenerRef.current.get(contextKey);

        if (!listeners) {
            console.warn(`Attempted to dispatch an update to '${contextKey}' with no listeners.`);
            throw new Error(
                `No listeners found for this context: ${contextKey} with value ${update}`,
            );
        }

        let newValue = currentElement;
        if (update instanceof Function) {
            if (currentElement === undefined) {
                console.warn(`No current value for '${contextKey}' when trying to apply an update function.`)
                throw new Error(`Cannot apply update function: no current value exists for '${contextKey}'.`);
            }
            newValue = update(currentElement);
        } else {
            newValue = update;
        }

        if (currentElement !== newValue) {
            try {
                listeners.forEach((l) => {
                    l(newValue);
                });
            } catch (e) {
                console.error(e);
            }
            latestValueRef.current.set(contextKey, newValue)
        }
    }, []);

    return {dispatch, triggerUpdateRef: listenerRef, contextRef: latestValueRef};
}
