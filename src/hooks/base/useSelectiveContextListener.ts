import {ListenerRefInterface, StringMap} from "../../types";
import {Context, MutableRefObject, useContext, useEffect, useState,} from "react";

export function useSelectiveContextListener<T>(
  contextKey: string,
  listenerKey: string,
  fallBackValue: T,
  updateRefContext: Context<MutableRefObject<ListenerRefInterface<T>>>,
  latestValueRefContext: Context<MutableRefObject<StringMap<T>>>,
) {
  const updateTriggers = useContext(updateRefContext);
  const latestRef = useContext(latestValueRefContext);
  // let currentValue: StringMap<T>
      // | undefined;

  const currentValue = latestRef.current.get(contextKey);
  let initialValue: T = fallBackValue
  if (currentValue !== undefined) {
    initialValue = currentValue
  }
  // const initialValue =
  //   currentValue === undefined ||
  //   currentValue === null ||
  //   currentValue.get(contextKey) === undefined
  //     ? fallBackValue
  //     : currentValue.get(contextKey);

  const [currentState, setCurrentState] = useState<T>(initialValue);

  const safeToAddListeners = updateTriggers !== undefined

  let currentListeners = safeToAddListeners ? updateTriggers.current.get(contextKey) : undefined;
  if (currentListeners === undefined && safeToAddListeners) {
    currentListeners = new Map()
    currentListeners.set(listenerKey, setCurrentState);
    updateTriggers.current.set(contextKey, currentListeners);
  }

  useEffect(() => {
    if (currentListeners !== undefined) {
    currentListeners.set(listenerKey, setCurrentState)
      const latestValue = latestRef.current.get(contextKey);
    if (latestValue !== undefined) {
      setCurrentState(latestValue);
    }

    }

    return () => {
      if (currentListeners) {
        currentListeners.delete(listenerKey);
      }
    };
  }, [currentListeners, contextKey, listenerKey, latestRef]);

  return { currentState, latestRef };
}
