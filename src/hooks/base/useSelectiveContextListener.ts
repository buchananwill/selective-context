import { LatestValueRef, ListenerRefInterface } from "../../types";
import {
  Context,
  MutableRefObject,
  useContext,
  useEffect,
  useState,
} from "react";

export function useSelectiveContextListener<T>(
  contextKey: string,
  listenerKey: string,
  fallBackValue: T,
  updateRefContext: Context<MutableRefObject<ListenerRefInterface<T>>>,
  latestValueRefContext: Context<MutableRefObject<LatestValueRef<T>>>,
) {
  const updateTriggers = useContext(updateRefContext);
  const latestRef = useContext(latestValueRefContext);
  let currentValue: LatestValueRef<T> | undefined = undefined;
  try {
    currentValue = latestRef.current;
  } catch (e) {
    console.error(e);
  }

  const initialValue =
    currentValue === undefined ||
    currentValue === null ||
    currentValue[contextKey] === undefined
      ? fallBackValue
      : latestRef.current[contextKey];

  const [currentState, setCurrentState] = useState<T>(initialValue);

  const safeToAddListeners = updateTriggers !== undefined

  let currentListeners = safeToAddListeners ? updateTriggers.current[contextKey] : undefined;
  if (currentListeners === undefined && safeToAddListeners) {
    updateTriggers.current[contextKey] = {};
    currentListeners = updateTriggers.current[contextKey];
    currentListeners[listenerKey] = setCurrentState;
  }

  useEffect(() => {
    if (currentListeners !== undefined) {
    currentListeners[listenerKey] = setCurrentState;

    if (latestRef.current[contextKey] !== undefined) {
      setCurrentState(() => latestRef.current[contextKey]);
    }

    }

    return () => {
      if (currentListeners) {
        delete currentListeners[listenerKey];
      }
    };
  }, [currentListeners, contextKey, listenerKey, latestRef]);

  return { currentState, latestRef };
}
