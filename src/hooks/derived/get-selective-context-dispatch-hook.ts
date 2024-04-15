'use client';


import {GenericSelectiveContextProps, UseSelectiveContextDispatch} from "../../types";
import {useSelectiveContextDispatch} from "../base/use-selective-context-dispatch";

export default function getSelectiveContextDispatchHook<T>({
  latestValueRefContext,
  dispatchContext,
  listenerRefContext
}: GenericSelectiveContextProps<T>): UseSelectiveContextDispatch<T> {
  return ({ contextKey, listenerKey, initialValue }) => {
    const { currentState, dispatchWithoutControl, dispatch } =
      useSelectiveContextDispatch(
        contextKey,
        listenerKey,
        initialValue,
        listenerRefContext,
        latestValueRefContext,
        dispatchContext,
      );

    return { currentState, dispatchWithoutControl, dispatch };
  };
}
