"use client";
import { PropsWithChildren } from "react";
import { useSelectiveContextManager } from "../hooks/base/use-selective-context-manager";
import { GenericSelectiveContextProps, LatestValueRef } from "../types";

export default function SelectiveContextManagerGeneric<T>({
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
  } = useSelectiveContextManager({} as LatestValueRef<T>);

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
