import {useCallback, useRef} from "react";
import {ListenerRefInterface, StringMap, UpdateAction} from "../../types";
import {useIntervalToClearValuesWithNoListeners} from "./useIntervalToClearValuesWithNoListeners";

export function useSelectiveContextManager<T>(
    initialContext: StringMap<T>,
) {
    const triggerUpdateRef = useRef({} as ListenerRefInterface<T>);
    const latestValueRef = useRef(initialContext);

    const intervalClearRef = useRef<NodeJS.Timeout>();

    useIntervalToClearValuesWithNoListeners(triggerUpdateRef, latestValueRef, intervalClearRef);

    const dispatch = useCallback((action: UpdateAction<T>) => {
        const {contextKey, update} = action;
        const currentElement = latestValueRef.current.get(contextKey);
        const listeners = triggerUpdateRef.current.get(contextKey);

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
                Object.values(listeners).forEach((l) => {
                    l(newValue);
                });
            } catch (e) {
                console.error(e);
            }
            latestValueRef.current.set(contextKey, newValue)
        }
    }, []);

    return {dispatch, triggerUpdateRef, contextRef: latestValueRef};
}
