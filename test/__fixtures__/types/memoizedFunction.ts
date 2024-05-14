export interface MemoizedFunction<T, U> {
    memoizedFunction: (arg: T) => U;
}

export interface MemoizedSupplier<T> {
    get: () => T
}