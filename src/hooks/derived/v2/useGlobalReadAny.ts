import {useSelectiveContextReadAny} from "../../base/useSelectiveContextReadAny";
import {SelectiveContextGlobal} from "../../../creators/selectiveContextCreatorGlobal";

export function useGlobalReadAny<T>() {
    return useSelectiveContextReadAny<T>(SelectiveContextGlobal)
}