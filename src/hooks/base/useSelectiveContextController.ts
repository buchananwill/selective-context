"use client";


import {useSelectiveContextListener} from "./useSelectiveContextListener";
import {DispatchUpdateContext, LatestValueRefContext, ListenersRefContext} from "../../types";
import {SetStateAction, useCallback, useContext, useEffect, useState} from "react";

export function useSelectiveContextController<T>(
    contextKey: string,
    listenerKey: string,
    initialValue: T,
    listenersRefContext: ListenersRefContext<T>,
    latestValueRefContext: LatestValueRefContext<T>,
    dispatchUpdateContext: DispatchUpdateContext<T>,
) {
    const {currentState} = useSelectiveContextListener(
        contextKey,
        listenerKey,
        initialValue,
        listenersRefContext,
        latestValueRefContext,
    );

    const dispatchUpdate = useContext(dispatchUpdateContext);

    const dispatch = useCallback((action: SetStateAction<T>) => {
        dispatchUpdate({contextKey: contextKey, update: action});
    }, [contextKey, dispatchUpdate]);
    const [isInitialized, setIsInitialized] = useState(false);

    /*
  // I think these lines are messing up the listener propagation when controller mounts second. CORRECT.
  // REMOVE AFTER COMMIT.
  // TODO write a test to capture this scenario: a listener mounts before a controller.
    if (valueMap.get(contextKey) === undefined) {
      valueMap.set(contextKey, initialValue)
    }
  */

    useEffect(() => {
        if (!isInitialized) {
            dispatchUpdate({contextKey: contextKey, update: initialValue});
            if (currentState === initialValue) {
                setIsInitialized(true);
            }
        }
    }, [currentState, isInitialized, contextKey, initialValue, dispatchUpdate]);
    return {currentState, dispatch};
}
