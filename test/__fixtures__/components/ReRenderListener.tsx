"use client";
import React, {ProfilerOnRenderCallback, useCallback, useEffect} from "react";
import {useGlobalListener} from "../../../src";
import {MemoizedFunction} from "../types/memoizedFunction";
import {ReRenderTracker} from "../literals/contextKeys";
import {UseProfiler} from "../../main-api-v2/Page.test";


function warningFunction(log: string) {
  console.warn("no function in selective context", log);
}

const fallbackWarningFunction = { memoizedFunction: warningFunction };

function createLogEntry(parentComponent: string, renderCount: number) {
  return `{"parent": "${parentComponent}", "renderCount": "${renderCount}"}`;
}

// Use a variable to decide which logging function to use
const logStyle = process.env.REACT_APP_LOG_STYLE;


export const CreateLogEntry = 'createLogEntry';
export default function ReRenderListener({
  parentComponent,
  renderCount,
}: {
  parentComponent: string;
  renderCount: number;
}) {

  console.log(logStyle)


  const {
    currentState: { memoizedFunction },
  } = useGlobalListener<MemoizedFunction<string, void>>({
    contextKey: ReRenderTracker,
    listenerKey: parentComponent,
    initialValue: fallbackWarningFunction,
  });

  useEffect(() => {
    const arg = createLogEntry(parentComponent, renderCount);
    if (renderCount > 0 && logStyle === CreateLogEntry) {
      memoizedFunction(arg);
    }
  }, [renderCount, memoizedFunction, parentComponent, logStyle]);

  const renderCallback: ProfilerOnRenderCallback = useCallback((id, phase, actualDuration, baseDuration, startTime, commitTime) => {
    if (logStyle === UseProfiler) {
      const object = { id, phase, actualDuration, baseDuration, startTime, commitTime };
      const jsonStringLog = JSON.stringify(object);
      memoizedFunction(jsonStringLog);
    }
  }, [memoizedFunction, logStyle]);



  return <React.Profiler id={parentComponent} onRender={renderCallback}>{null}</React.Profiler>;
}
