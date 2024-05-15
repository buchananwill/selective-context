import {render} from "@testing-library/react";

import {ContextKeys} from "../__fixtures__/literals/contextKeys";
import {describe, expect} from "vitest";
import React from "react";
import {useSelectiveContextListenerGroup} from "../../src/hooks/base/useSelectiveContextListenerGroup";
import {SelectiveContextGlobal} from "../../src/creators/selectiveContextCreatorGlobal";
import {SelectiveContextManagerGlobal, useGlobalDispatch, useGlobalListener} from "../../src";
import {defaultFunctionWarningMessage} from "../../src/creators/genericSelectiveContextCreator";


const contextKeys = [ContextKeys.LogContent, ContextKeys.FunctionListenerPrintout];
const ContextLessGroupHookCaller = () => {
    useSelectiveContextListenerGroup(
        contextKeys,
        'sadPath',
        SelectiveContextGlobal.listenersRefContext,
        SelectiveContextGlobal.latestValueRefContext
    )

    return <div></div>
}
const ContextLessHookCaller = () => {
    useGlobalListener({contextKey: ContextKeys.LogContent, listenerKey: 'sadPath', initialValue: 'test'})

    return <div></div>
}
const ContextLessDispatchHookCaller = () => {
    const {dispatchWithoutListen} = useGlobalDispatch(ContextKeys.LogContent);

    dispatchWithoutListen('test')

    return <div></div>
}

describe('Absence of context when calling listener hook', () => {
    it('should throw an error without the context available for listeners', () => {
        expect(() => render(
            <ContextLessHookCaller></ContextLessHookCaller>
        )).toThrow(Error)
    });

    it('should throw an error without the context available for listener groups', () => {
        expect(() => render(
            <ContextLessGroupHookCaller></ContextLessGroupHookCaller>
        )).toThrow(Error)
    });

    it('should render the listener group and setup its own listener maps', () => {
        const renderedNode = render(
            <SelectiveContextManagerGlobal>
                <ContextLessGroupHookCaller></ContextLessGroupHookCaller>
            </SelectiveContextManagerGlobal>
        );

        expect(renderedNode).toBeDefined()
    });
});

describe('Absence of context when calling dispatchWithoutListen', () => {

    it('should throw an error trying to call the default function', () => {
        let collectedArgs: [][] = []
        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation((args) => {collectedArgs = [...collectedArgs, args]});
        render(<ContextLessDispatchHookCaller></ContextLessDispatchHookCaller>)
        expect(consoleSpy).toBeCalledTimes(1);
        expect(collectedArgs[0]).toEqual(defaultFunctionWarningMessage)

    });
})
