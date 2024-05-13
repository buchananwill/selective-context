import {DispatchContext, LatestValueRefContext, ListenersRefContext, UseSelectiveContextParams} from "../../../types";
import {useSelectiveContextController} from "../../base/useSelectiveContextController";
import {SelectiveContextGlobal} from "../../../creators/selectiveContextCreatorGlobal";

export function useSelectiveContextGlobalController<T>({
                                                           contextKey,
                                                           listenerKey,
                                                           initialValue,
                                                       }: UseSelectiveContextParams<T>) {
    return useSelectiveContextController<T>(
        contextKey,
        listenerKey,
        initialValue,
        SelectiveContextGlobal.listenerRefContext as ListenersRefContext<T>,
        SelectiveContextGlobal.latestValueRefContext as LatestValueRefContext<T>,
        SelectiveContextGlobal.dispatchContext as DispatchContext<T>
    );
}