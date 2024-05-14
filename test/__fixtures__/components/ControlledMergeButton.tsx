'use client'

import {SelectiveContextParams} from "../../../src/types";
import {MemoizedFunction} from "../types/memoizedFunction";
import {useRenderCounter} from "../utils/useRenderCounter";
import {useGlobalDispatch, useGlobalListener} from "../../../src";
import ReRenderListener from "./ReRenderListener";
import React from "react";

export type GenericButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function ControlledMergeButton<T>({
  contextKey,
  listenerKey,
  initialValue,
  valueContextKey,
  children,
  ...otherProps
}: {
  valueContextKey: string;
} & SelectiveContextParams<MemoizedFunction<T, T>> &
  Omit<GenericButtonProps, "onClick">) {
  const renderCounter = useRenderCounter();
  const {
    currentState: { memoizedFunction },
  } = useGlobalListener({ contextKey, listenerKey, initialValue });
  const { dispatchWithoutListen } = useGlobalDispatch<T>(valueContextKey);
  return (
    <button
      onClick={() => {
        dispatchWithoutListen((prev) => memoizedFunction(prev));
      }}
      {...otherProps}
    >
      {children}
      <ReRenderListener
        parentComponent={`controlled-merge-button:${contextKey}:${listenerKey}:${valueContextKey}`}
        renderCount={renderCounter}
      />
    </button>
  );
}
