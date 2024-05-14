import {render, screen} from "@testing-library/react";
import Page from "../__fixtures__/Page";
import React from "react";
import {expect} from "vitest";
import '@testing-library/jest-dom/vitest'
import PrintableListenerDiv from "../__fixtures__/components/PrintableListenerDiv";
import {ContextKeys} from "../__fixtures__/literals/contextKeys";
import {setup} from "../setup";
import {chaoticLabel, initialFunctionLabel} from "../__fixtures__/components/FunctionListenerDiv";
import {ClientWrapperListeners, PageListeners, SubscribeToTwoContextsKey} from "../__fixtures__/literals/listenerKeys";
import {InitialNthValue} from "../__fixtures__/literals/constants";
import {collatzCompressed, increment} from "../../dist/test/__fixtures__/utils/mathFunctions";
import {CreateLogEntry} from "../__fixtures__/components/ReRenderListener";

interface UseProfilerJson {
    name: string
    logEntries: UseProfilerEntry[]
}

interface UseProfilerEntry {
    id: string;
    phase: "mount" | "update" | "nested-update";
    actualDuration: number;
    baseDuration: number;
    startTime: number;
    commitTime: number
}


export const UseProfiler = 'useProfiler';

const setupPage = () => setup(
    <Page>
        <PrintableListenerDiv contextKey={ContextKeys.LogContent} listenerKey={spyDivTestId} initialValue={''}
                              data-testid={spyDivTestId}/>

    </Page>
);

const spyDivTestId = 'spy-div';
describe('Selective Context Demo Page', () => {
    it('should render the root page.', () => {

        const result = render(<Page/>);
        expect(result).toBeDefined()

        const heading = screen.getByRole('heading');
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent(/selective context/i)

    });

    it('should contain the current log JSON', async () => {
        // process.env.REACT_APP_LOG_STYLE = CreateLogEntry;
        const {user} = setupPage()
        const updateLogButton = screen.getByTestId(ClientWrapperListeners.updateLogButton);
        await user.click(updateLogButton)
        const testDiv = screen.getByTestId(spyDivTestId);

        expect(testDiv).toHaveTextContent(/logentries/i)
    });

    it('should swap the function label', async () => {
        const {user} = setupPage();
        const functionTypeLabel = screen.getByTestId(ClientWrapperListeners.functionalListenerDiv);

        expect(functionTypeLabel).toHaveTextContent(initialFunctionLabel)
        const swapFunctionButton = screen.getByTestId(ClientWrapperListeners.swapFunctionButton);
        await user.click(swapFunctionButton)

        expect(functionTypeLabel).toHaveTextContent(chaoticLabel)
    });

    it('should apply the initial function, then the other function, to the initial value', async () => {
        const {user} = setupPage();
        const numberDiv = screen.getByTestId(PageListeners.numberDiv);

        // initial
        let comparisonValue = InitialNthValue
        expect(numberDiv).toHaveTextContent(`${comparisonValue}`)

        // first mutation
        comparisonValue = increment(comparisonValue)
        const applyMathFunction = screen.getByTestId(ClientWrapperListeners.applyFunctionButton);
        await user.click(applyMathFunction)
        expect(numberDiv).toHaveTextContent(`${comparisonValue}`)

        // other mutation
        comparisonValue = collatzCompressed(comparisonValue)
        const swapFunctionButton = screen.getByTestId(ClientWrapperListeners.swapFunctionButton);
        await user.click(swapFunctionButton)
        await user.click(applyMathFunction)
        expect(numberDiv).toHaveTextContent(`${comparisonValue}`)
    });

    it('should re-render SubscribeToToContexts on the swap and apply button presses', async () => {
        process.env.REACT_APP_LOG_STYLE = UseProfiler;
        const {user} = setupPage();
        const spyDiv = screen.getByTestId(spyDivTestId);

        // get buttons
        const applyMathFunction = screen.getByTestId(ClientWrapperListeners.applyFunctionButton);
        const swapFunctionButton = screen.getByTestId(ClientWrapperListeners.swapFunctionButton);
        // click them
        await user.click(swapFunctionButton)
        await user.click(applyMathFunction)

        // Update the log
        const updateLogButton = screen.getByTestId(ClientWrapperListeners.updateLogButton);
        await user.click(updateLogButton)

        console.log(spyDiv.textContent)

        const logJson: UseProfilerJson = JSON.parse(spyDiv.textContent ?? '');
        const useProfilerEntries = logJson.logEntries.filter(entry => entry.id === SubscribeToTwoContextsKey);

        console.log(logJson)

        expect(useProfilerEntries).length(3) // Initial, swap, apply.
    });


});