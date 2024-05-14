import { renderHook } from '@testing-library/react-hooks';

import { describe, it, expect, vi } from 'vitest';
import {useRenderCounter} from "../__fixtures__/utils/useRenderCounter";

describe('useRenderCounter', () => {
    it('should start with a render count of 1', () => {
        const { result } = renderHook(() => useRenderCounter());

        expect(result.current).toBe(1);
    });

    it('should increment the render count on each re-render', () => {
        const { result, rerender } = renderHook(() => useRenderCounter());

        expect(result.current).toBe(1);

        rerender();
        expect(result.current).toBe(2);

        rerender();
        expect(result.current).toBe(3);
    });

    it('should log the render count to the console', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {/*do nothing*/});

        const {rerender } = renderHook(() => useRenderCounter());

        expect(consoleSpy).toHaveBeenCalledWith(1);

        rerender();
        expect(consoleSpy).toHaveBeenCalledWith(2);

        rerender();
        expect(consoleSpy).toHaveBeenCalledWith(3);

        consoleSpy.mockRestore();
    });
});
