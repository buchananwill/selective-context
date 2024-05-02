import { useCallback, useContext } from "react";
import { SelectiveContext } from "../../creators/genericSelectiveContextCreator";
import { SelectiveContextReadAll } from "../../types";

export function useSelectiveContextReadAny<T>(
  context: SelectiveContext<T>,
): SelectiveContextReadAll<T> {
  const mutableRefObject = useContext(context.latestValueRefContext);
  return useCallback(
    function (contextKey) {
      return mutableRefObject.current[contextKey];
    },
    [mutableRefObject],
  );
}