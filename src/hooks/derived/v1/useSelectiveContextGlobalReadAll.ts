import {useSelectiveContextReadAny} from "../../base/useSelectiveContextReadAny";
import {SelectiveContextGlobal} from "../../../creators/selectiveContextCreatorGlobal";
import {SelectiveContext} from "../../../creators/genericSelectiveContextCreator";

export function useSelectiveContextGlobalReadAll<T>() {
    return useSelectiveContextReadAny<T>(SelectiveContextGlobal as SelectiveContext<T>)
}