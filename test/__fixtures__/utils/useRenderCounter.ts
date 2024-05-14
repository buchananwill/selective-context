import {useEffect, useRef} from "react";

export function useRenderCounter() {
    const mutableRefObject = useRef(0);

    useEffect(() => {
        mutableRefObject.current++
    })
    return mutableRefObject.current
}