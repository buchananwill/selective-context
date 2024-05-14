'use client'


import {SelectiveContextParams} from "../../../src/types";
import {MemoizedSupplier} from "../types/memoizedFunction";
import {useRenderCounter} from "../utils/useRenderCounter";
import {useGlobalDispatch, useGlobalListener} from "../../../src";
import ReRenderListener from "./ReRenderListener";
import React from "react";

export type GenericButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function ControlledReplaceButton<T>({
  contextKey,
  listenerKey,
  initialValue,
  consumerContextKey,
  children,
  ...otherProps
}: {
  consumerContextKey: string;
} & SelectiveContextParams<MemoizedSupplier<T>> &
  Omit<GenericButtonProps, "onClick">) {
  const renderCounter = useRenderCounter();
  const {
    currentState: {get },
  } = useGlobalListener({ contextKey, listenerKey, initialValue });
  const { dispatchWithoutListen } = useGlobalDispatch<T>(consumerContextKey);
  return (
    <button
      onClick={() => {
        dispatchWithoutListen(get());
      }}
      {...otherProps}
    >
      {children}
      <ReRenderListener
        parentComponent={`controlled-replace-button:${contextKey}:${listenerKey}`}
        renderCount={renderCounter}
      />
    </button>
  );
}
