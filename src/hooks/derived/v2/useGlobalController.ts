import {DispatchUpdateContext, LatestValueRefContext, ListenersRefContext, SelectiveContextParams} from "../../../types";
import {useSelectiveContextController} from "../../base/useSelectiveContextController";
import {SelectiveContextGlobal} from "../../../creators/selectiveContextCreatorGlobal";

export function useGlobalController<T>({
                                                           contextKey,
                                                           listenerKey,
                                                           initialValue,
                                                       }: SelectiveContextParams<T>) {
    return useSelectiveContextController<T>(
        contextKey,
        listenerKey,
        initialValue,
        SelectiveContextGlobal.listenersRefContext as ListenersRefContext<T>,
        SelectiveContextGlobal.latestValueRefContext as LatestValueRefContext<T>,
        SelectiveContextGlobal.dispatchContext as DispatchUpdateContext<T>,
    );
}