"use client";
import React, {PropsWithChildren} from "react";
import {useSelectiveContextManager} from "../hooks/base/useSelectiveContextManager";
import {GenericSelectiveContextProps} from "../types";

export function SelectiveContextManagerGeneric<T>({
  children,
  dispatchContext,
  latestValueRefContext,
  listenersRefContext,
}: GenericSelectiveContextProps<T> & PropsWithChildren) {
  const ListenerProvider = listenersRefContext.Provider;
  const DispatchProvider = dispatchContext.Provider;
  const LatestValueProvider = latestValueRefContext.Provider;

  const {
    dispatch,
    triggerUpdateRef: listenerRef,
    contextRef: latestValueRef,
  } = useSelectiveContextManager(new Map());

  return (
    <ListenerProvider value={listenerRef}>
      <DispatchProvider value={dispatch}>
        <LatestValueProvider value={latestValueRef}>
          {children}
        </LatestValueProvider>
      </DispatchProvider>
    </ListenerProvider>
  );
}
