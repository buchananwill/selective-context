import {UseSelectiveContextParams} from "../../../types";
import {useSelectiveContextController} from "../../base/useSelectiveContextController";
import {SelectiveContextGlobal} from "../../../creators/selectiveContextCreatorGlobal";

export function useGlobalController<T>({
                                                           contextKey,
                                                           listenerKey,
                                                           initialValue,
                                                       }: UseSelectiveContextParams<T>) {
    return useSelectiveContextController<T>(
        contextKey,
        listenerKey,
        initialValue,
        SelectiveContextGlobal.listenerRefContext,
        SelectiveContextGlobal.latestValueRefContext,
        SelectiveContextGlobal.dispatchContext,
    );
}