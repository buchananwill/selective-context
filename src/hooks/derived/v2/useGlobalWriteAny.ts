import {useSelectiveContextWriteAny} from "../../base/useSelectiveContextWriteAny";
import {SelectiveContextGlobal} from "../../../creators/selectiveContextCreatorGlobal";
import {DispatchUpdateContext} from "../../../types";

export function useGlobalWriteAny<T>() {
return useSelectiveContextWriteAny<T>(SelectiveContextGlobal.dispatchUpdateContext as DispatchUpdateContext<T>)

}
