import {MemoizedFunction} from "../types/memoizedFunction";
import {initialFunction, otherFunction} from "./mathFunctions";


function swapMathFunction(memoizedFunction: MemoizedFunction<number, number>) {
    if (memoizedFunction === initialFunction) return otherFunction
    else return initialFunction
}

export const memoizedSwapFunction = {
    memoizedFunction: swapMathFunction
}