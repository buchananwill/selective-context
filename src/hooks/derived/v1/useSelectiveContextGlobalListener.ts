import {LatestValueRefContext, ListenersRefContext, SelectiveContextParams} from "../../../types";
import {SelectiveContextGlobal} from "../../../creators/selectiveContextCreatorGlobal";
import {useSelectiveContextListener} from "../../base/useSelectiveContextListener";

export function useSelectiveContextGlobalListener<T>({
  contextKey,
  listenerKey,
  initialValue,
}: SelectiveContextParams<T>) {

  return useSelectiveContextListener<T>(
    contextKey,
    listenerKey,
    initialValue,
      SelectiveContextGlobal.listenersRefContext as ListenersRefContext<T>,
      SelectiveContextGlobal.latestValueRefContext as LatestValueRefContext<T>
  );
}