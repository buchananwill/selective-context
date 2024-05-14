import {LatestValueRefContext, ListenersRefContext, StringMap} from "../../../types";
import {SelectiveContextGlobal} from "../../../creators/selectiveContextCreatorGlobal";
import {useSelectiveContextListenerGroup} from "../../base/useSelectiveContextListenerGroup";

export interface UseSelectiveContextGroupParams<T> {
    contextKeys: string[];
    listenerKey: string;
    initialValue: StringMap<T>;
}


export function useGlobalListenerGroup<T>({
                                              contextKeys,
                                              listenerKey,
                                          }: UseSelectiveContextGroupParams<T>) {

    return useSelectiveContextListenerGroup<T>(
        contextKeys,
        listenerKey,
        SelectiveContextGlobal.listenersRefContext as ListenersRefContext<T>,
        SelectiveContextGlobal.latestValueRefContext as LatestValueRefContext<T>,
    );
}