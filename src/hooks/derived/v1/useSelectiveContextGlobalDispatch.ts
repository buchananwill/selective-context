import {DispatchContext, LatestValueRefContext, ListenersRefContext, UseSelectiveContextParams} from "../../../types";
import {useSelectiveContextDispatchAndListener} from "../../base/useSelectiveContextDispatchAndListener";
import {SelectiveContextGlobal} from "../../../creators/selectiveContextCreatorGlobal";

export function useSelectiveContextGlobalDispatch<T>({
                                                         contextKey,
                                                         listenerKey,
                                                         initialValue,
                                                     }: UseSelectiveContextParams<T>) {
    return useSelectiveContextDispatchAndListener<T>(
        contextKey,
        listenerKey,
        initialValue,
        SelectiveContextGlobal.listenerRefContext as ListenersRefContext<T>,
        SelectiveContextGlobal.latestValueRefContext as LatestValueRefContext<T>,
        SelectiveContextGlobal.dispatchContext as DispatchContext<T>,
    );
}