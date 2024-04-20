import { Context, Dispatch, MutableRefObject, SetStateAction } from "react";

export interface ListenerRefInterface<T> {
  [key: string]: SelectiveListeners<T>;
}

export interface SelectiveListeners<T> {
    [key: string]: Dispatch<SetStateAction<T>>;
}

export interface StringMap<T> {
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
    MutableRefObject<StringMap<T>>
>;

export interface UseSelectiveContextParams<T> {
  contextKey: string;
  listenerKey: string;
  initialValue: T;
}
export interface GenericSelectiveContextProps<T> {
  listenerRefContext: SelectiveListenersContext<T>;
  latestValueRefContext: SelectiveValueContext<T>;
  dispatchContext: SelectiveDispatchContext<T>;
}
export interface SelectiveContextReadAll<T> {
  (contextKey: string): T | undefined;
}