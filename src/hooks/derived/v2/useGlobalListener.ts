import {DispatchContext, LatestValueRefContext, ListenersRefContext, UseSelectiveContextParams} from "../../../types";
import { SelectiveContextGlobal } from "../../../creators/selectiveContextCreatorGlobal";
import { useSelectiveContextListener } from "../../base/useSelectiveContextListener";

export function useGlobalListener<T>({
  contextKey,
  listenerKey,
  initialValue,
}: UseSelectiveContextParams<T>) {

  return useSelectiveContextListener<T>(
    contextKey,
    listenerKey,
    initialValue,
      SelectiveContextGlobal.listenerRefContext as ListenersRefContext<T>,
      SelectiveContextGlobal.latestValueRefContext as LatestValueRefContext<T>,
  );
}