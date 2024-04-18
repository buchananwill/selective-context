import {useSelectiveContextListenerReadAll} from "../base/useSelectiveContextListenerReadAll";
import {SelectiveContextGlobal} from "../../creators/selectiveContextCreatorGlobal";

export function useSelectiveContextGlobalReadAll<T>() {
    return useSelectiveContextListenerReadAll<T>(SelectiveContextGlobal)
}