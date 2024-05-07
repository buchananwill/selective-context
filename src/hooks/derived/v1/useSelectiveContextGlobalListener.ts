import { UseSelectiveContextParams } from "../../../types";
import { SelectiveContextGlobal } from "../../../creators/selectiveContextCreatorGlobal";
import { useSelectiveContextListener } from "../../base/useSelectiveContextListener";

export function useSelectiveContextGlobalListener<T>({
  contextKey,
  listenerKey,
  initialValue,
}: UseSelectiveContextParams<T>) {

  return useSelectiveContextListener<T>(
    contextKey,
    listenerKey,
    initialValue,
    SelectiveContextGlobal.listenerRefContext,
    SelectiveContextGlobal.latestValueRefContext,
  );
}