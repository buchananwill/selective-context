import {SelectiveContextGlobal} from "../../../creators/selectiveContextCreatorGlobal";
import {useSelectiveContextDispatch} from "../../base/useSelectiveContextDispatch";

export function useGlobalDispatch<T>(contextKey: string) {
    return useSelectiveContextDispatch<T>(
        contextKey,
        SelectiveContextGlobal.dispatchContext,
    );
}