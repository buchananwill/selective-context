"use client";



import {GenericDivProps} from "./PrintableListenerDiv";
import {SelectiveContextParams} from "../../../src/types";
import {useGlobalDispatchAndListener} from "../../../src";
import {useRenderCounter} from "../utils/useRenderCounter";
import ReRenderListener from "./ReRenderListener";
import React from "react";

export type GenericInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface slotProps {inputProps:  Omit<GenericInputProps, 'onChange' | 'value' | 'type'>, divProps: GenericDivProps, "data-testid": string }

function ControlledNumberInput(props: SelectiveContextParams<number> & Partial<slotProps>) {
    const {
        contextKey,
        listenerKey,
        initialValue,
        divProps, inputProps,
    } = props
  const { currentState, dispatchWithoutControl } = useGlobalDispatchAndListener({
    contextKey,
    listenerKey,
    initialValue,
  });
  const renderCounter = useRenderCounter();

  return (
    <div {...divProps}>
      <label className={'mr-1'} htmlFor={listenerKey}>Edit:
      </label>
      <input {...inputProps} type={'number'} data-testid={props["data-testid"]} id={listenerKey} value={currentState} onChange={(event) => dispatchWithoutControl(parseInt(event.target.value, 10) || 1)}/>
      <ReRenderListener
        parentComponent={`printable-listener-div:${contextKey}:${listenerKey}`}
        renderCount={renderCounter}
      />
    </div>
  );
}

export default ControlledNumberInput