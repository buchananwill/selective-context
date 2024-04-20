import {StringMap, UseSelectiveContextParams} from "../../types";
import { SelectiveContextGlobal } from "../../creators/selectiveContextCreatorGlobal";
import { useSelectiveContextListener } from "../base/useSelectiveContextListener";
import {useSelectiveContextListenerGroup} from "../base/useSelectiveContextListenerGroup";

export interface UseSelectiveContextGroupParams<T> {
    contextKeys: string[];
    listenerKey: string;
    initialValue: StringMap<T>;
}


export function useSelectiveContextListenerGroupGlobal<T>({
                                                         contextKeys,
                                                         listenerKey,
                                                         initialValue,
                                                     }: UseSelectiveContextGroupParams<T>) {

    return useSelectiveContextListenerGroup<T>(
            contextKeys,
            listenerKey,
            initialValue,
            SelectiveContextGlobal.listenerRefContext,
            SelectiveContextGlobal.latestValueRefContext,

    );
}