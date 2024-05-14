"use client";


import {SelectiveContextParams} from "../../../src/types";
import {MemoizedFunction} from "../types/memoizedFunction";
import PrintableListenerDiv, {GenericDivProps} from "./PrintableListenerDiv";
import {ControllerComponent, useGlobalDispatch, useGlobalListener} from "../../../src";
import {FunctionListenerPrintout} from "../literals/contextKeys";
import React, {useEffect} from "react";
import {initialFunction, otherFunction} from "../utils/mathFunctions";

const listenerKeyPrintable = "prints-function-type";
export const initialFunctionLabel = "Simple";
export const chaoticLabel = "Chaotic";
export default function FunctionListenerDiv({
  contextKey,
  listenerKey,
  initialValue,
  children,
  ...divProps
}: SelectiveContextParams<MemoizedFunction<number, number>> & GenericDivProps) {
  const { currentState } = useGlobalListener({
    contextKey,
    listenerKey,
    initialValue,
  });
  const { dispatchWithoutListen } = useGlobalDispatch<string>(
    FunctionListenerPrintout,
  );

  useEffect(() => {
    dispatchWithoutListen(
      currentState === initialFunction
        ? initialFunctionLabel
        : currentState === otherFunction
          ? chaoticLabel
          : "Unexpected!",
    );
  }, [currentState, dispatchWithoutListen]);

  return (
    <>
      <PrintableListenerDiv
        {...divProps}
        contextKey={FunctionListenerPrintout}
        listenerKey={`${listenerKey}:${listenerKeyPrintable}`}
        initialValue={initialFunctionLabel}
      >
        {children}
      </PrintableListenerDiv>
      <ControllerComponent
        contextKey={FunctionListenerPrintout}
        initialValue={initialFunctionLabel}
      />
    </>
  );
}
