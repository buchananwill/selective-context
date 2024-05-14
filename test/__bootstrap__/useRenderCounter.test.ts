

import { describe, it, expect, vi } from 'vitest';
import {useRenderCounter} from "../__fixtures__/utils/useRenderCounter";
import {renderHook} from "@testing-library/react";

describe('useRenderCounter', () => {
    it('should start with a render count of 1', () => {
        const { result } = renderHook(() => useRenderCounter());

        expect(result.current).toBe(0);
    });

    it('should increment the render count on each re-render', () => {
        const { result, rerender } = renderHook(() => useRenderCounter());

        expect(result.current).toBe(0);

        rerender();
        expect(result.current).toBe(1);

        rerender();
        expect(result.current).toBe(2);
    });


});
