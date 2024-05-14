import {describe, expect} from "vitest";
import {initialFunction, otherFunction} from "../__fixtures__/utils/mathFunctions";
import {memoizedSwapFunction} from "../__fixtures__/utils/swapMathFunction";


describe('math functions', () => {
    it('should advance to the next odd collatz term', () => {
        expect(otherFunction.memoizedFunction(27)).toEqual(41)
    })

    it('should increment by one', () => {
        expect(initialFunction.memoizedFunction(1)).toEqual(2)
    })

    it('should return the other function', () => {
        expect(memoizedSwapFunction.memoizedFunction(initialFunction)).toEqual(otherFunction)
    });

    it('should return the initial function', () => {
        expect(memoizedSwapFunction.memoizedFunction(
            memoizedSwapFunction.memoizedFunction(
                initialFunction
            )
        )).toEqual(initialFunction)
    });


})