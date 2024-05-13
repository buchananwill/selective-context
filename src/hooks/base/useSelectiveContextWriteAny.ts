import {Context, Dispatch, SetStateAction, useCallback, useContext,} from "react";
import {UpdateAction} from "../../types";

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
