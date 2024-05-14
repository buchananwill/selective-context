
import {MemoizedFunction, MemoizedSupplier} from "../types/memoizedFunction";
import {useMemo} from "react";


function csvLogCollector(prev: string, next: string) {
    return prev.length > 0 ? `${prev},${next}` : next;
}

export function useLogStore(wrapper?: {
    header: string;
    footer: string
}): [MemoizedFunction<string, void>, MemoizedSupplier<string>] {
    return useMemo(() => {
        let log = ''
        const addLog: MemoizedFunction<string, void> = {
            memoizedFunction: (nextLog: string) => {
                log = csvLogCollector(log, nextLog);
            },
        };
        const getLog: MemoizedSupplier<string> = {
            get: () => `${wrapper? wrapper.header : ''}${log}${wrapper ? wrapper.footer : ''}`
        };
        return [addLog, getLog]
    }, [wrapper])
} 