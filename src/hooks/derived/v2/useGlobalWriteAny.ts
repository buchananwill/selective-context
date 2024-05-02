import {useSelectiveContextWriteAny} from "../../base/useSelectiveContextWriteAny";
import {SelectiveContextGlobal} from "../../../creators/selectiveContextCreatorGlobal";

export function useGlobalWriteAny<T>() {
return useSelectiveContextWriteAny<T>(SelectiveContextGlobal.dispatchContext)

}
