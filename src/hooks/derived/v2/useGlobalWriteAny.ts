import {useSelectiveContextWriteAny} from "../../base/useSelectiveContextWriteAny";
import {SelectiveContextGlobal} from "../../../creators/selectiveContextCreatorGlobal";
import {DispatchContext} from "../../../types";

export function useGlobalWriteAny<T>() {
return useSelectiveContextWriteAny<T>(SelectiveContextGlobal.dispatchContext as DispatchContext<T>)

}
