import {render} from "@testing-library/react";

import {ContextKeys} from "../__fixtures__/literals/contextKeys";
import {describe, expect} from "vitest";
import React from "react";
import {useSelectiveContextListenerGroup} from "../../src/hooks/base/useSelectiveContextListenerGroup";
import {SelectiveContextGlobal} from "../../src/creators/selectiveContextCreatorGlobal";
import {SelectiveContextManagerGlobal, useGlobalDispatch, useGlobalListener} from "../../src";
import {defaultFunctionWarningMessage} from "../../src/creators/genericSelectiveContextCreator";


const contextKeys = [ContextKeys.LogContent, ContextKeys.FunctionListenerPrintout];
const MockGroupListener = () => {
    useSelectiveContextListenerGroup(
        contextKeys,
        'sadPath',
        SelectiveContextGlobal.listenersRefContext,
        SelectiveContextGlobal.latestValueRefContext
    )

    return <div></div>
}
const MockListener = () => {
    useGlobalListener({contextKey: ContextKeys.LogContent, listenerKey: 'sadPath', initialValue: 'test'})

    return <div></div>
}

const functionSpy = {spy: (proposedUpdate: unknown) => {/*Not provided yet*/}}

const MockDispatchHookCaller = () => {
    const {dispatchWithoutListen} = useGlobalDispatch(ContextKeys.LogContent);
    dispatchWithoutListen('test')

    return <div></div>
}
const MockDispatchHookSmuggler = () => {
    const {dispatchWithoutListen} = useGlobalDispatch(ContextKeys.LogContent);
    functionSpy.spy = dispatchWithoutListen

    return <div></div>
}

describe('Absence of context when calling listener hook', () => {
    it('should throw an error without the context available for listeners', () => {
        expect(() => render(
            <MockListener></MockListener>
        )).toThrow(Error)
    });

    it('should throw an error without the context available for listener groups', () => {
        expect(() => render(
            <MockGroupListener></MockGroupListener>
        )).toThrow(Error)
    });

    it('should render the listener group and setup its own listener maps', () => {
        const renderedNode = render(
            <SelectiveContextManagerGlobal>
                <MockGroupListener></MockGroupListener>
            </SelectiveContextManagerGlobal>
        );

        expect(renderedNode).toBeDefined()
    });
});

describe('Edge cases of dispatchWithoutListen', () => {

    it('should throw an error trying to call the default function', () => {
        let collectedArgs: [][] = []
        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation((args) => {collectedArgs = [...collectedArgs, args]});
        render(<MockDispatchHookCaller></MockDispatchHookCaller>)
        expect(consoleSpy).toBeCalledTimes(1);
        expect(collectedArgs[0]).toEqual(defaultFunctionWarningMessage)
    });

    it('should throw an error trying to use a functional update when there is no previous value', () => {
        let collectedArgs: [][] = []
        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation((args) => {collectedArgs = [...collectedArgs, args]});
        expect(() => {
                render(
                    <SelectiveContextManagerGlobal>
                        <MockListener></MockListener>
                        <MockDispatchHookSmuggler></MockDispatchHookSmuggler>
                    </SelectiveContextManagerGlobal>
                )
                functionSpy.spy((prev: number) => prev + 1)
            }

        ).toThrowError()
        expect(consoleSpy).toBeCalledTimes(1);
        expect(collectedArgs[0]).toMatch(/no current value/i)
    });
})
