import { Context, MutableRefObject } from "react";
import { SetStateAction } from "react";
import { Dispatch } from "react";


export type ListenersRefInterface<T> = Map<string, SelectiveListeners<T>>

export type SelectiveListeners<T> = Map<string, Dispatch<SetStateAction<T>>>

export type StringMap<T> = Map<string,T>

export interface UpdateAction<T> {
    contextKey: string;
    update: SetStateAction<T>;
}

export type ListenersRefContext<T> = Context<
    MutableRefObject<ListenersRefInterface<T>>
>;
export type DispatchUpdateContext<T> = Context<Dispatch<UpdateAction<T>>>;
export type LatestValueRefContext<T> = Context<
    MutableRefObject<StringMap<T>>
>;

export interface SelectiveContextParams<T> {
  contextKey: string;
  listenerKey: string;
  initialValue: T;
}
export interface GenericSelectiveContextProps<T> {
  listenersRefContext: ListenersRefContext<T>;
  latestValueRefContext: LatestValueRefContext<T>;
  dispatchUpdateContext: DispatchUpdateContext<T>;
}
export type SelectiveContextReadAll<T> = (contextKey: string) => T | undefined;