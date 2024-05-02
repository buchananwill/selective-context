import {useSelectiveContextReadAny} from "../../base/useSelectiveContextReadAny";
import {SelectiveContextGlobal} from "../../../creators/selectiveContextCreatorGlobal";

export function useSelectiveContextGlobalReadAll<T>() {
    return useSelectiveContextReadAny<T>(SelectiveContextGlobal)
}