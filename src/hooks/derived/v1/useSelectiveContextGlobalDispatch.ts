import {DispatchUpdateContext, LatestValueRefContext, ListenersRefContext, SelectiveContextParams} from "../../../types";
import {useSelectiveContextDispatchAndListener} from "../../base/useSelectiveContextDispatchAndListener";
import {SelectiveContextGlobal} from "../../../creators/selectiveContextCreatorGlobal";

export function useSelectiveContextGlobalDispatch<T>({
                                                         contextKey,
                                                         listenerKey,
                                                         initialValue,
                                                     }: SelectiveContextParams<T>) {
    return useSelectiveContextDispatchAndListener<T>(
        contextKey,
        listenerKey,
        initialValue,
        SelectiveContextGlobal.listenersRefContext as ListenersRefContext<T>,
        SelectiveContextGlobal.latestValueRefContext as LatestValueRefContext<T>,
        SelectiveContextGlobal.dispatchContext as DispatchUpdateContext<T>,
    );
}