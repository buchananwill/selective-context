"use client";


import React from "react";
import {SelectiveContextParams} from "../../../src/types";
import {useGlobalListener} from "../../../src";
import {useRenderCounter} from "../utils/useRenderCounter";
import {JSONTree} from "react-json-tree";
import ReRenderListener from "./ReRenderListener";

export type GenericDivProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;

export const theme = {
    scheme: 'monokai',
    author: 'Will Buchanan',
    base00: '#040000',
    base01: '#1e293b',
    base02: '#3f3f46',
    base03: '#52525b',
    base04: '#a1a1aa',
    base05: '#a8a29e',
    base06: '#e5e5e5',
    base07: '#ffffff',
    base08: '#ef4444',
    base09: '#fb923c',
    base0A: '#fde047',
    base0B: '#6ee7b7',
    base0C: '#67e8f9',
    base0D: '#93c5fd',
    base0E: '#d8b4fe',
    base0F: '#fda4af',
};

export default function JsonListenerDiv({
                                            contextKey,
                                            listenerKey,
                                            initialValue,
                                            children,
                                            ...divProps
                                        }: SelectiveContextParams<string> & GenericDivProps) {
    const {currentState} = useGlobalListener({
        contextKey,
        listenerKey,
        initialValue,
    });
    const renderCounter = useRenderCounter();

    let data;

    try {
        data = JSON.parse(currentState)
    } catch (e) {
        console.warn(e)
    }

    return (
        <div {...divProps}>
            <div className={'w-full min-h-fit h-full drop-shadow-md '}>
                {data && <JSONTree data={data} invertTheme={false} theme={{
                    extend: theme,
                    tree: {
                        padding: "1rem",
                        // borderRadius: "8px",
                        margin: "0px"
                    }
                }}/>}
                {children}
                <ReRenderListener
                    parentComponent={`JSON-listener-div:${contextKey}:${listenerKey}`}
                    renderCount={renderCounter}
                />
            </div>
        </div>
    );
}
