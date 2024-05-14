"use client";


import {ContextKeys} from "../literals/contextKeys";
import {useGlobalDispatch, useGlobalReadAny} from "../../../src";
import {metaContextKey} from "./ReadAnyDiv";
import {useRenderCounter} from "../utils/useRenderCounter";
import ReRenderListener from "./ReRenderListener";
import React from "react";

export const choicesArray = Object.values(ContextKeys).filter(
  (value) => value !== ContextKeys.LogContent,
);

const readAnyDropdown = 'read-any-dropdown';
export default function ReadAnyButton() {
  const globalRead = useGlobalReadAny<string>();
  const { dispatchWithoutListen } = useGlobalDispatch(metaContextKey);
  const renderCounter = useRenderCounter();

  return (
    <div className={"w-full border-2 rounded-lg items-center p-1 pl-4 flex"}>
      <label className={"w-full select-none"}>
        Read any state:
        <select
          id={readAnyDropdown}
          onChange={(e) => {
            dispatchWithoutListen(`${globalRead(e.target.value)}`);
          }}
          className={'outline-blue-400 outline-offset-2 hover:opacity-75 bg-sky-100 rounded-lg p-1 cursor-pointer'}
          data-testid={'select-read-target'}
        >
          {choicesArray.map((choice) => (
            <option key={choice} value={choice} className={'p-1'}>
              {choice}
            </option>
          ))}
        </select>
      </label>
        <ReRenderListener parentComponent={readAnyDropdown} renderCount={renderCounter}/>
    </div>
  );
}
