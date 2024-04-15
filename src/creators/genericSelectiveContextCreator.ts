"use client";
import { createContext, Dispatch, MutableRefObject } from "react";
import {
  LatestValueRef,
  ListenerRefInterface,
  SelectiveDispatchContext,
  SelectiveListenersContext,
  SelectiveValueContext,
  UpdateAction,
} from "../types";

export function createSelectiveContext<T>(): SelectiveContext<T> {
  const latestValueRefContext = createContext<
    MutableRefObject<LatestValueRef<T>>
  >({} as MutableRefObject<LatestValueRef<T>>);
  const listenerRefContext = createContext<
    MutableRefObject<ListenerRefInterface<T>>
  >({} as MutableRefObject<ListenerRefInterface<T>>);
  const dispatchContext = createContext<Dispatch<UpdateAction<T>>>(() => {});
  return { latestValueRefContext, listenerRefContext, dispatchContext };
}

export interface SelectiveContext<T> {
  latestValueRefContext: SelectiveValueContext<T>;
  listenerRefContext: SelectiveListenersContext<T>;
  dispatchContext: SelectiveDispatchContext<T>;
}
