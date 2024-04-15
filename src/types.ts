import { Context, Dispatch, MutableRefObject, SetStateAction } from "react";

export interface ListenerRefInterface<T> {
  [key: string]: SelectiveListeners<T>;
}

export interface SelectiveListeners<T> {
    [key: string]: Dispatch<SetStateAction<T>>;
}

export interface LatestValueRef<T> {
    [key: string]: T;
}

export interface UpdateAction<T> {
    contextKey: string;
    update: SetStateAction<T>;
}

export type SelectiveListenersContext<T> = Context<
    MutableRefObject<ListenerRefInterface<T>>
>;
export type SelectiveDispatchContext<T> = Context<Dispatch<UpdateAction<T>>>;
export type SelectiveValueContext<T> = Context<
    MutableRefObject<LatestValueRef<T>>
>;

export interface UseSelectiveContextParams<T> {
  contextKey: string;
  listenerKey: string;
  initialValue: T;
}

export interface UseSelectiveContextControllerReturn<T> {
  currentState: T;
  dispatchUpdate: (action: UpdateAction<T>) => void;
}

export interface UseSelectiveContextDispatchReturn<T> {
  currentState: T;
  dispatchWithoutControl: Dispatch<SetStateAction<T>>;
}

export type UseSelectiveContextDispatch<T> = (
  params: UseSelectiveContextParams<T>,
) => UseSelectiveContextDispatchReturn<T>;

export type UseSelectiveContextController<T> = (
  params: UseSelectiveContextParams<T>,
) => UseSelectiveContextControllerReturn<T>;

export interface GenericSelectiveContextProps<T> {
  listenerRefContext: SelectiveListenersContext<T>;
  latestValueRefContext: SelectiveValueContext<T>;
  dispatchContext: SelectiveDispatchContext<T>;
}

export interface UseSelectiveContextListenerReturn<T> {
  currentState: T;
}

export type UseSelectiveContextListener<T> = (params: UseSelectiveContextParams<T>
) => UseSelectiveContextListenerReturn<T>;