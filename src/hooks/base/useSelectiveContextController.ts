"use client";


import {useSelectiveContextListener} from "./useSelectiveContextListener";
import {StringMap, ListenerRefInterface, UpdateAction} from "../../types";
import {Context, MutableRefObject, SetStateAction, useCallback, useContext, useEffect, useState} from "react";

export function useSelectiveContextController<T>(
  contextKey: string,
  listenerKey: string,
  initialValue: T,
  UpdateTriggerRefContext: Context<
    MutableRefObject<ListenerRefInterface<T>>
  >,
  latestValueRefContext: Context<
    MutableRefObject<StringMap<T>>
  >,
  dispatchUpdateContext: Context<(value: UpdateAction<T>) => void>,
) {
  const { currentState, latestRef } = useSelectiveContextListener(
    contextKey,
    listenerKey,
    initialValue,
    UpdateTriggerRefContext,
    latestValueRefContext,
  );

  const freshRef = latestRef.current;

  const dispatchUpdate = useContext(dispatchUpdateContext);

  const dispatch = useCallback((action: SetStateAction<T>) => {
    dispatchUpdate({contextKey: contextKey, update: action});
  }, [contextKey, dispatchUpdate]);
  const [isInitialized, setIsInitialized] = useState(false);


  if (freshRef.get(contextKey) === undefined) {
    freshRef.set(contextKey, initialValue)
  }


  useEffect(() => {
    if (!isInitialized) {
      dispatchUpdate({ contextKey: contextKey, update: initialValue });
      if (currentState === initialValue) {
        setIsInitialized(true);
      }
    }
  }, [currentState, isInitialized, contextKey, initialValue, dispatchUpdate]);
  return { currentState, dispatch };
}
