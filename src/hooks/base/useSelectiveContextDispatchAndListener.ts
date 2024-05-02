import {
  Context,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useContext,
} from "react";

import { useSelectiveContextListener } from "./useSelectiveContextListener";
import { StringMap, ListenerRefInterface, UpdateAction } from "../../types";

export function useSelectiveContextDispatchAndListener<T>(
  contextKey: string,
  listenerKey: string,
  fallBackValue: T,
  updateRefContext: Context<MutableRefObject<ListenerRefInterface<T>>>,
  latestValueRefContext: Context<MutableRefObject<StringMap<T>>>,
  dispatchUpdateContext: Context<Dispatch<UpdateAction<T>>>,
) {
  const { currentState } = useSelectiveContextListener(
    contextKey,
    listenerKey,
    fallBackValue,
    updateRefContext,
    latestValueRefContext,
  );

  const dispatch = useContext(dispatchUpdateContext);

  const dispatchWithoutControl = useCallback(
    (proposedUpdate: SetStateAction<T>) => {
      dispatch({ contextKey, update: proposedUpdate });
    },
    [contextKey, dispatch],
  );

  return { currentState, dispatchWithoutControl };
}
