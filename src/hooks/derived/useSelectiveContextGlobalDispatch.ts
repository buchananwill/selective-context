import {UseSelectiveContextParams} from "../../types";
import {useSelectiveContextDispatch} from "../base/useSelectiveContextDispatch";
import {SelectiveContextGlobal} from "../../creators/selectiveContextCreatorGlobal";

export function useSelectiveContextGlobalDispatch<T>({
                                                         contextKey,
                                                         listenerKey,
                                                         initialValue,
                                                     }: UseSelectiveContextParams<T>) {
    return useSelectiveContextDispatch<T>(
        contextKey,
        listenerKey,
        initialValue,
        SelectiveContextGlobal.listenerRefContext,
        SelectiveContextGlobal.latestValueRefContext,
        SelectiveContextGlobal.dispatchContext,
    );
}