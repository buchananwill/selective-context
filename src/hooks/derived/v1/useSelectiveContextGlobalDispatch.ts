import {UseSelectiveContextParams} from "../../../types";
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
        SelectiveContextGlobal.listenerRefContext,
        SelectiveContextGlobal.latestValueRefContext,
        SelectiveContextGlobal.dispatchContext,
    );
}