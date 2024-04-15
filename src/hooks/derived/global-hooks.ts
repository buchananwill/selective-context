import {UseSelectiveContextParams} from "../../types";
import {useSelectiveContextController} from "../base/use-selective-context-controller";
import {SelectiveContextGlobal} from "../../creators/selective-context-creator-global";
import {useSelectiveContextListener} from "../base/use-selective-context-listener";
import {useSelectiveContextDispatch} from "../base/use-selective-context-dispatch";

export function useSelectiveContextGlobalController<T>({
                                                        contextKey,
                                                        listenerKey,
                                                        initialValue
                                                    }: UseSelectiveContextParams<T>) {
    return useSelectiveContextController<T>(
        contextKey,
        listenerKey,
        initialValue,
        SelectiveContextGlobal.listenerRefContext,
        SelectiveContextGlobal.latestValueRefContext,
        SelectiveContextGlobal.dispatchContext
    );
}

export function useSelectiveContextGlobalDispatch<T>({
                                                      contextKey,
                                                      listenerKey,
                                                      initialValue
                                                  }: UseSelectiveContextParams<T>) {
    return useSelectiveContextDispatch<T>(
        contextKey,
        listenerKey,
        initialValue,
        SelectiveContextGlobal.listenerRefContext,
        SelectiveContextGlobal.latestValueRefContext,
        SelectiveContextGlobal.dispatchContext
    );
}

export function useSelectiveContextGlobalListener<T>({
                                                         contextKey,
                                                         listenerKey,
                                                         initialValue
                                                     }: UseSelectiveContextParams<T>) {
    console.log(contextKey, listenerKey);

    return useSelectiveContextListener<T>(
        contextKey,
        listenerKey,
        initialValue,
        SelectiveContextGlobal.listenerRefContext,
        SelectiveContextGlobal.latestValueRefContext
    );
}