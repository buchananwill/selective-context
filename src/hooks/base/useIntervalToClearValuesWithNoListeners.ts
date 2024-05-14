import React, {useEffect} from "react";
import {SelectiveListeners} from "../../types";

export function useIntervalToClearValuesWithNoListeners<T>(
    triggerUpdateRef: React.MutableRefObject<Map<string,
        SelectiveListeners<T>>>,
    latestValueRef: React.MutableRefObject<Map<string, T>>,
    intervalClearRef: React.MutableRefObject<NodeJS.Timeout | undefined>
) {
    useEffect(() => {
        const cachedListenerRef = triggerUpdateRef.current;
        const cachedValueRef = latestValueRef.current;
        intervalClearRef.current = setInterval(() => {
            for (const [contextKey, listeners] of cachedListenerRef.entries()) {
                if (
                    listeners.size === 0 &&
                    cachedValueRef.get(contextKey) !== undefined
                ) {
                    cachedValueRef.delete(contextKey)
                }
            }
        }, 30_000);
        return () => {
            clearInterval(intervalClearRef.current);
        };
    }, [triggerUpdateRef, latestValueRef, intervalClearRef]);
}