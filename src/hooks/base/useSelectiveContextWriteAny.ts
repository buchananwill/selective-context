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

export function useSelectiveContextWriteAny<T>(
  dispatchUpdateContext: Context<Dispatch<UpdateAction<T>>>,
) {
  const dispatch = useContext(dispatchUpdateContext);

  const dispatchWriteAny = useCallback(
    (contextKey: string, proposedUpdate: SetStateAction<T>) => {
      dispatch({ contextKey, update: proposedUpdate });
    },
    [dispatch],
  );

  return { dispatchWriteAny };
}
