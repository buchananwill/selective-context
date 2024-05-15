
import React from "react";
import {GenericDivProps} from "./JsonListenerDiv";
import {ControllerComponent} from "../../../src";
import PrintableListenerDiv from "./PrintableListenerDiv";
import {PageListeners} from "../literals/listenerKeys";

export const metaContextKey = "content-of-any-context";

const placeholderReadAnyDivContent = "Select a key to read its current value.";
export default function ReadAnyDiv({...props }: GenericDivProps) {
  return (
    <>
      <ControllerComponent contextKey={metaContextKey} initialValue={placeholderReadAnyDivContent} />
      <PrintableListenerDiv
        {...props}
        contextKey={metaContextKey}
        listenerKey={PageListeners.readAnyDiv}
        initialValue={''}
        data-testid={PageListeners.readAnyDiv}
      />
    </>
  );
}