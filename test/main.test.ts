import {expect, test} from "vitest";

describe('selectiveContextCreatorGlobal', () => {
    it('should equal 16', () => {
        expect(Math.pow(2,4)).toBe(16)
    })
});

test('selectiveContextCreatorGlobal', () => {
    expect(1+1).toBe(2)
})