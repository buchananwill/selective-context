"use client";
import React, { PropsWithChildren } from "react";
import { useSelectiveContextManager } from "../hooks/base/useSelectiveContextManager";
import { GenericSelectiveContextProps, StringMap } from "../types";

export function SelectiveContextManagerGeneric<T>({
  children,
  dispatchContext,
  latestValueRefContext,
  listenerRefContext,
}: GenericSelectiveContextProps<T> & PropsWithChildren) {
  const ListenerProvider = listenerRefContext.Provider;
  const DispatchProvider = dispatchContext.Provider;
  const LatestValueProvider = latestValueRefContext.Provider;

  const {
    dispatch,
    triggerUpdateRef: listenerRef,
    contextRef: latestValueRef,
  } = useSelectiveContextManager({} as StringMap<T>);

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
