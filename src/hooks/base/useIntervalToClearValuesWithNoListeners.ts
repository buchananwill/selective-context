import {MutableRefObject, useEffect} from "react";
import {ListenersRefInterface} from "../../types";

export function useIntervalToClearValuesWithNoListeners<T>(
    listenersRef: MutableRefObject<ListenersRefInterface<T>>,
    latestValueRef: MutableRefObject<Map<string, T>>,
    intervalClearRef: MutableRefObject<NodeJS.Timeout | undefined>, 
    timeout = 30_000
) {
    useEffect(() => {
        const cachedListenerRef = listenersRef.current;
        const cachedValueRef = latestValueRef.current;
        intervalClearRef.current = setInterval(() => {
            const setOfContextKeysToDelete = new Set<string>();
            for (const [contextKey] of cachedValueRef) {
                const listenerMap = cachedListenerRef.get(contextKey);
                if (listenerMap === undefined) {
                    setOfContextKeysToDelete.add(contextKey)
                } else if (listenerMap.size === 0) {
                    setOfContextKeysToDelete.add(contextKey)
                    cachedListenerRef.delete(contextKey)
                }
            }
            for (const keyToDelete of setOfContextKeysToDelete) {
                cachedValueRef.delete(keyToDelete)
            }
            
            // for (const [contextKey, listeners] of cachedListenerRef.entries()) {
            //     if (
            //         listeners.size === 0 &&
            //         cachedValueRef.get(contextKey) !== undefined
            //     ) {
            //         cachedValueRef.delete(contextKey)
            //     }
            // }
        }, timeout);
        return () => {
            clearInterval(intervalClearRef.current);
        };
    }, [listenersRef, latestValueRef, intervalClearRef]);
}