import {Context, Dispatch, SetStateAction, useCallback, useContext,} from "react";
import {UpdateAction} from "../../types";

export function useSelectiveContextDispatch<T>(
  contextKey: string,
  dispatchUpdateContext: Context<Dispatch<UpdateAction<T>>>,
) {
  const dispatch = useContext(dispatchUpdateContext);

  const dispatchWithoutListen = useCallback(
    (proposedUpdate: SetStateAction<T>) => {
      dispatch({ contextKey, update: proposedUpdate });
    },
    [contextKey, dispatch],
  );

  return { dispatchWithoutListen };
}
