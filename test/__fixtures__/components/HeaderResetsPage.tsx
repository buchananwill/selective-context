"use client";


import {GenericButtonProps} from "./ControlledMergeButton";
import {useGlobalWriteAny} from "../../../src";
import {createLogStore, useLogStore} from "../utils/useLogStore";
import React, {useCallback} from "react";
import {wrapper} from "../literals/logFormat";
import {ContextKeys, LogContent, NthTerm} from "../literals/contextKeys";
import {initialFunction} from "../utils/mathFunctions";

export const headerButton = "header-button";
export default function HeaderResetsPage({
  children,className
}: Pick<GenericButtonProps, "children" | 'className'>) {
  const { dispatchWriteAny } = useGlobalWriteAny();
  useLogStore();

  const resetCallback = useCallback(() => {
    const [addLog, getLog] = createLogStore(wrapper);
    dispatchWriteAny(NthTerm, 27);
    dispatchWriteAny(LogContent, "{}");
    dispatchWriteAny(ContextKeys.FunctionContextKey, initialFunction);
    dispatchWriteAny(ContextKeys.LogSupplier, getLog);
    dispatchWriteAny(ContextKeys.ReRenderTracker, addLog);
  }, [dispatchWriteAny]);

  return (
    <button
      className={
        className
      }
      onClick={resetCallback}
      data-testid={headerButton}
    >
      {children}
    </button>
  );
}
