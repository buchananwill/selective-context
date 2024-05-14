

import { describe, it, expect, vi } from 'vitest';
import {useLogStore} from "../__fixtures__/utils/useLogStore";
import {renderHook} from "@testing-library/react";
import React, {useState, act} from "react";



const {result} = renderHook(() => {
    const [name, setName] = useState('')
    React.useEffect(() => {
        setName('Alice')
    }, [])

    return name
})

expect(result.current).toBe('Alice')


describe('useLogStore', () => {
    it('should initialize with an empty log', () => {
        const { result } = renderHook(() => useLogStore());
        const [, getLog] = result.current;

        expect(getLog.get()).toBe('');
    });

    it('should add logs and retrieve the log correctly', () => {
        const { result } = renderHook(() => useLogStore());
        const [addLog, getLog] = result.current;

        act(() => {
            addLog.memoizedFunction('first log');
        });

        expect(getLog.get()).toBe('first log');

        act(() => {
            addLog.memoizedFunction('second log');
        });

        expect(getLog.get()).toBe('first log,second log');
    });

    it('should include header and footer if provided', () => {
        const { result } = renderHook(() =>
            useLogStore({ header: 'START:', footer: ':END' })
        );
        const [addLog, getLog] = result.current;

        act(() => {
            addLog.memoizedFunction('first log');
        });

        expect(getLog.get()).toBe('START:first log:END');

        act(() => {
            addLog.memoizedFunction('second log');
        });

        expect(getLog.get()).toBe('START:first log,second log:END');
    });

    it('should log to console when adding logs', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {/*do nothing*/});
        const { result } = renderHook(() => useLogStore());
        const [addLog, getLog] = result.current;

        act(() => {
            addLog.memoizedFunction('first log');
        });

        expect(consoleSpy).toHaveBeenCalledWith('');
        expect(getLog.get()).toBe('first log');

        act(() => {
            addLog.memoizedFunction('second log');
        });

        expect(consoleSpy).toHaveBeenCalledWith('first log');
        expect(getLog.get()).toBe('first log,second log');

        consoleSpy.mockRestore();
    });
});
