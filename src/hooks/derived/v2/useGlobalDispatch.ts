import {SelectiveContextGlobal} from "../../../creators/selectiveContextCreatorGlobal";
import {useSelectiveContextDispatch} from "../../base/useSelectiveContextDispatch";
import {DispatchUpdateContext} from "../../../types";

export function useGlobalDispatch<T>(contextKey: string) {
    return useSelectiveContextDispatch<T>(
        contextKey,
        SelectiveContextGlobal.dispatchUpdateContext as DispatchUpdateContext<T>
    );
}