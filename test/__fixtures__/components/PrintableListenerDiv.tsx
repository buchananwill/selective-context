"use client";


import React from "react";
import {SelectiveContextParams} from "../../../src/types";
import {useGlobalListener} from "../../../src";
import {useRenderCounter} from "../utils/useRenderCounter";
import ReRenderListener from "./ReRenderListener";

export type GenericDivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

function PrintableListenerDiv({
  contextKey,
  listenerKey,
  initialValue,
  children,
  ...divProps
}: SelectiveContextParams<number | string> & GenericDivProps) {
  const { currentState } = useGlobalListener({
    contextKey,
    listenerKey,
    initialValue,
  });
  const renderCounter = useRenderCounter();

  return (
    <div {...divProps}>
      {currentState}
      {children}
      <ReRenderListener
        parentComponent={`printable-listener-div:${contextKey}:${listenerKey}`}
        renderCount={renderCounter}
      />
    </div>
  );
}

export default PrintableListenerDiv