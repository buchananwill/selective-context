import { Context, Dispatch, MutableRefObject, SetStateAction } from "react";

export type ListenerRefInterface<T> = Map<string, SelectiveListeners<T>>

export type SelectiveListeners<T> = Map<string, Dispatch<SetStateAction<T>>>

export type StringMap<T> = Map<string,T>

export interface UpdateAction<T> {
    contextKey: string;
    update: SetStateAction<T>;
}

export type ListenersRefContext<T> = Context<
    MutableRefObject<ListenerRefInterface<T>>
>;
export type DispatchContext<T> = Context<Dispatch<UpdateAction<T>>>;
export type LatestValueRefContext<T> = Context<
    MutableRefObject<StringMap<T>>
>;

export interface UseSelectiveContextParams<T> {
  contextKey: string;
  listenerKey: string;
  initialValue: T;
}
export interface GenericSelectiveContextProps<T> {
  listenerRefContext: ListenersRefContext<T>;
  latestValueRefContext: LatestValueRefContext<T>;
  dispatchContext: DispatchContext<T>;
}
export interface SelectiveContextReadAll<T> {
  (contextKey: string): T | undefined;
}