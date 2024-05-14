import React, {PropsWithChildren} from "react";
import PrintableListenerDiv from "./components/PrintableListenerDiv";
import {ControllerComponent, SelectiveContextManagerGlobal} from "../../src";
import {LogContent, NthTerm} from "./literals/contextKeys";
import {InitialNthValue} from "./literals/constants";
import {ClientWrapper} from "./components/ClientWrapper";
import JsonListener from "./components/JsonListenerDiv";
import ReadAnyButton from "./components/ReadAnyButton";
import ReadAnyDiv from "./components/ReadAnyDiv";
import SubscribeToTwoContexts from "./components/SubscribeToTwoContexts";
import {PageListeners} from "./literals/listenerKeys";


const MemoDiv = React.memo(PrintableListenerDiv)

const someDivClassNames = 'border-2 rounded-lg place-content-center justify-center flex items-center p-1';

export default function Page({children}: PropsWithChildren) {
    return (
        <SelectiveContextManagerGlobal>
            <div className={'flex-col py-8 gap-4'}>
                <ControllerComponent contextKey={LogContent} initialValue={'{}'}/>
                <ControllerComponent
                    contextKey={NthTerm}
                    initialValue={InitialNthValue}
                />
                <h1 className={'text-lg font-semibold drop-shadow border-8 rounded-lg p-4 text-center mx-8 block mb-8'}>Selective
                    Context Demo</h1>
                <div className={"grid gap-2 grid-cols-5 px-16"}>

                    <ClientWrapper>
                        <MemoDiv
                            className={"border-2 text-xl rounded-lg text-right"}
                            contextKey={NthTerm}
                            listenerKey={PageListeners.numberDiv}
                            initialValue={InitialNthValue}
                            data-testid={PageListeners.numberDiv}
                        />
                    </ClientWrapper>
                    <JsonListener
                        className={'border-4 col-span-5 h-[60vh] overflow-y-scroll rounded-lg min-h-8 overflow-hidden bg-[#040000]'}
                        contextKey={LogContent}
                        listenerKey={PageListeners.jsonLogDiv}
                        initialValue={'{}'}
                    />
                    <ReadAnyButton/>
                    <ReadAnyDiv className={someDivClassNames}/>
                    <SubscribeToTwoContexts className={someDivClassNames + ' border-red-300'}/>
                </div>
                {children}
            </div>
        </SelectiveContextManagerGlobal>
    );
}
