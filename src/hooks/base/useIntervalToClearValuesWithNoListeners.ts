import {MutableRefObject, useEffect} from "react";
import {ListenersRefInterface} from "../../types";

export function useIntervalToClearValuesWithNoListeners<T>(
    listenersRef: MutableRefObject<ListenersRefInterface<T>>,
    latestValueRef: MutableRefObject<Map<string, T>>,
    intervalClearRef: MutableRefObject<number | undefined>,
    timeout = 30_000
) {
    useEffect(() => {
        const cachedListenerRef = listenersRef.current;
        const cachedValueRef = latestValueRef.current;
        intervalClearRef.current = window.setInterval(() => {
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

        }, timeout);
        return () => {
            if (intervalClearRef.current) window.clearInterval(intervalClearRef.current);
        };
    }, [listenersRef, latestValueRef, intervalClearRef]);
}