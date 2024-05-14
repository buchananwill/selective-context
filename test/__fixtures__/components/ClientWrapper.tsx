"use client";


import React, {PropsWithChildren} from "react";
import {useLogStore} from "../utils/useLogStore";
import {wrapper} from "../literals/logFormat";
import {useRenderCounter} from "../utils/useRenderCounter";
import {ControllerComponent} from "../../../src";
import {
    FunctionContextKey,
    LogContent,
    LogSupplier,
    NthTerm,
    ReRenderTracker,
    SwapContextKey
} from "../literals/contextKeys";
import {initialFunction} from "../utils/mathFunctions";
import ControlledReplaceButton from "./ControlledReplaceButton";
import {memoizedSwapFunction} from "../utils/swapMathFunction";
import ControlledMergeButton from "./ControlledMergeButton";
import FunctionListenerDiv from "./FunctionListenerDiv";
import ReRenderListener from "./ReRenderListener";
import {ClientWrapperListeners} from "../literals/listenerKeys";

const buttonClassNames =
  "border-2 drop-shadow text-lg bg-sky-300 rounded-lg hover:bg-sky-400 group";

const arrowAnimate = "inline-block transition-transform";

const horizontalAnimate = " group-hover:translate-x-1";

export function ClientWrapper({ children }: PropsWithChildren) {
  const [addLog, getLog] = useLogStore(wrapper);
  const renderCounter = useRenderCounter();

  return (
    <>
      <ControllerComponent contextKey={LogSupplier} initialValue={getLog} />
      <ControllerComponent contextKey={ReRenderTracker} initialValue={addLog} />
      <ControllerComponent
        contextKey={FunctionContextKey}
        initialValue={initialFunction}
      />
      <ControlledReplaceButton
        className={buttonClassNames}
        consumerContextKey={LogContent}
        contextKey={LogSupplier}
        listenerKey={ClientWrapperListeners.updateLogButton}
        initialValue={getLog}
        data-testid={ClientWrapperListeners.updateLogButton}
      >
        Update Log Readout{" "}
        <div className={"rotate-90 group-hover:translate-y-1 " + arrowAnimate}>
          -{">"}
        </div>
      </ControlledReplaceButton>
      <ControllerComponent
        contextKey={SwapContextKey}
        initialValue={memoizedSwapFunction}
      />
      <ControlledMergeButton
        className={buttonClassNames}
        valueContextKey={FunctionContextKey}
        contextKey={SwapContextKey}
        listenerKey={ClientWrapperListeners.swapFunctionButton}
        initialValue={memoizedSwapFunction}
        data-testid={ClientWrapperListeners.swapFunctionButton}
      >
        Swap <div className={arrowAnimate + horizontalAnimate}>-{">"}</div>
      </ControlledMergeButton>
      <FunctionListenerDiv
        contextKey={FunctionContextKey}
        listenerKey={ClientWrapperListeners.functionalListenerDiv}
        initialValue={initialFunction}
        className={
          "text-center text-purple-800 drop-shadow border-b-4 border-r-2 rounded-lg bg-gradient-to-tl from-sky-200 to-purple-300 cursor-default select-none "
        }
        data-testid={ClientWrapperListeners.functionalListenerDiv}
      />
      <ControlledMergeButton
        className={buttonClassNames}
        valueContextKey={NthTerm}
        contextKey={FunctionContextKey}
        listenerKey={ClientWrapperListeners.applyFunctionButton}
        initialValue={initialFunction}
        data-testid={ClientWrapperListeners.applyFunctionButton}
      >
        Apply <div className={arrowAnimate + horizontalAnimate}>-{">"}</div>
      </ControlledMergeButton>

      {children}
        <ReRenderListener parentComponent={'client-function-wrapper'} renderCount={renderCounter}/>
    </>
  );
}
