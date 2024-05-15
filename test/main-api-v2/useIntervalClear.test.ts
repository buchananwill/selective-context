import {renderHook} from "@testing-library/react";
import {useRef} from "react";
import {useIntervalToClearValuesWithNoListeners} from "../../src/hooks/base/useIntervalToClearValuesWithNoListeners";
import {ListenersRefInterface} from "../../src/types";
import {expect, vi} from "vitest";

function prepareTestVariables() {
    const {result: {current: valueMapRef}} = renderHook(() => useRef(new Map<string, string>()));
    const {result: {current: listenerMapRef}} = renderHook(() => useRef<ListenersRefInterface<unknown>>(new Map()));
    const {result: {current: intervalClearRef}} = renderHook(() => useRef(undefined));
    const key = 'test-context';
    const value = 'test-value';
    valueMapRef.current.set(key, value)
    return {valueMapRef, listenerMapRef, intervalClearRef, key, value};
}

describe('useIntervalToClearValuesWithNoListeners', () => {
    it('should clear the stored value after the given interval because the listener map is undefined', () => {
        vi.useFakeTimers()
        const {valueMapRef, listenerMapRef, intervalClearRef, key, value} = prepareTestVariables();

        expect(valueMapRef.current.get(key)).toBe(value)

        const timeoutValue = 1;
        renderHook(() => {
            return useIntervalToClearValuesWithNoListeners(
                listenerMapRef,
                valueMapRef,
                intervalClearRef,
                timeoutValue // 1ms
            );
        });

        vi.advanceTimersByTime(timeoutValue)

        expect(valueMapRef.current.get(key)).toBeUndefined()


    });

    const listenerMap = new Map();
    it('should clear the stored value after the given interval because the listener map is empty', () => {
        vi.useFakeTimers()

        const {intervalClearRef, value, key, listenerMapRef, valueMapRef} = prepareTestVariables();

        listenerMapRef.current.set(key, listenerMap)

        expect(valueMapRef.current.get(key)).toBe(value)

        const timeoutValue = 1;
        renderHook(() => {
            return useIntervalToClearValuesWithNoListeners(
                listenerMapRef,
                valueMapRef,
                intervalClearRef,
                timeoutValue // 1ms
            );
        });

        vi.advanceTimersByTime(timeoutValue)

        expect(valueMapRef.current.get(key)).toBeUndefined()


    });

    it('should NOT clear the stored value after the given interval because the listener map has an entry', () => {
        vi.useFakeTimers()
        const mockCallback = vi.fn();

        const {intervalClearRef, value, key, listenerMapRef, valueMapRef} = prepareTestVariables();

        listenerMapRef.current.set(key, listenerMap)

        listenerMap.set('test-listener', mockCallback)

        expect(valueMapRef.current.get(key)).toBe(value)

        const timeoutValue = 1;
        renderHook(() => {
            return useIntervalToClearValuesWithNoListeners(
                listenerMapRef,
                valueMapRef,
                intervalClearRef,
                timeoutValue // 1ms
            );
        });

        vi.advanceTimersByTime(timeoutValue)

        expect(valueMapRef.current.get(key)).toBe(value)
        vi.useRealTimers()

    });
});