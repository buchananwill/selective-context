"use client";

import {
  GenericSelectiveContextProps,
  UseSelectiveContextController,
  UseSelectiveContextParams,
} from "../../types";
import { useSelectiveContextController } from "../base/use-selective-context-controller";

export function getSelectiveContextControllerHook<T>({
  dispatchContext,
  latestValueRefContext,
  listenerRefContext,
}: GenericSelectiveContextProps<T>): UseSelectiveContextController<T> {
  return ({
    contextKey,
    initialValue,
    listenerKey,
  }: UseSelectiveContextParams<T>) => {
    const { currentState, dispatchUpdate } = useSelectiveContextController(
      contextKey,
      listenerKey,
      initialValue,
      listenerRefContext,
      latestValueRefContext,
      dispatchContext,
    );

    return { currentState, dispatchUpdate };
  };
}
