'use client'
import {useGlobalController} from "../hooks/derived/v2/useGlobalController";


export function ControllerComponent<T>({contextKey, listenerKey = 'controller', initialValue}:{contextKey: string, listenerKey?: string, initialValue: T}) {
    useGlobalController<T>({contextKey , listenerKey, initialValue})

    return null

}