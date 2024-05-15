import {render, screen, waitFor} from "@testing-library/react";
import Page from "../__fixtures__/Page";
import React, {ReactNode} from "react";
import {expect} from "vitest";
import '@testing-library/jest-dom/vitest'
import PrintableListenerDiv from "../__fixtures__/components/PrintableListenerDiv";
import {ContextKeys, NthTerm} from "../__fixtures__/literals/contextKeys";
import {setup} from "../setup";
import {chaoticLabel, initialFunctionLabel} from "../__fixtures__/components/FunctionListenerDiv";
import {ClientWrapperListeners, PageListeners, SubscribeToTwoContextsKey} from "../__fixtures__/literals/listenerKeys";
import {InitialNthValue} from "../__fixtures__/literals/constants";
import {collatzCompressed, increment} from "../__fixtures__/utils/mathFunctions";
import {CreateLogJson, UseProfilerJson} from "./logTypes";
import {choicesArray, readAnyDropdown} from "../__fixtures__/components/ReadAnyButton";
import {headerButton} from "../__fixtures__/components/HeaderResetsPage";


export const UseProfiler = 'useProfiler';
const spyDivTestId = 'spy-div';

const setupPage = (AdditionalSpy?: () => ReactNode) => setup(
    <Page>
        <PrintableListenerDiv contextKey={ContextKeys.LogContent} listenerKey={spyDivTestId} initialValue={''}
                              data-testid={spyDivTestId}/>
        {AdditionalSpy && <AdditionalSpy/>}
    </Page>
);


function getUserProfilerJson(spyDiv: HTMLElement) {
    const logJson: UseProfilerJson = JSON.parse(spyDiv.textContent ?? '');
    return logJson;
}

function getCreateLogJson(spyDiv: HTMLElement) {
    const logJson: CreateLogJson = JSON.parse(spyDiv.textContent ?? '');
    return logJson;
}

function getMathButtons() {
    // get buttons
    const applyMathFunction = screen.getByTestId(ClientWrapperListeners.applyFunctionButton);
    const swapFunctionButton = screen.getByTestId(ClientWrapperListeners.swapFunctionButton);
    return {applyMathFunction, swapFunctionButton};
}

describe('Selective Context Demo Page', () => {
    it('should render the root page.', () => {

        const result = render(<Page/>);
        expect(result).toBeDefined()

        const heading = screen.getByTestId(headerButton);
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent(/selective context/i)

    });

    it('should contain the current log JSON', async () => {
        // process.env.VITE_LOG_STYLE = CreateLogEntry;
        const {user} = setupPage()
        const updateLogButton = screen.getByTestId(ClientWrapperListeners.updateLogButton);
        await user.click(updateLogButton)
        const testDiv = screen.getByTestId(spyDivTestId);
        getCreateLogJson(testDiv);
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
        const numberInput = screen.getByTestId(PageListeners.numberDiv) as HTMLInputElement;

        const currentNumber = () => {
            return parseInt(numberInput.value, 10)
        }


        // initial
        let comparisonValue = InitialNthValue
        expect(currentNumber()).toEqual(comparisonValue)

        // first mutation
        comparisonValue = increment(comparisonValue)
        const applyMathFunction = screen.getByTestId(ClientWrapperListeners.applyFunctionButton);
        await user.click(applyMathFunction)
        expect(currentNumber()).toEqual(comparisonValue)

        // other mutation
        comparisonValue = collatzCompressed(comparisonValue)
        const swapFunctionButton = screen.getByTestId(ClientWrapperListeners.swapFunctionButton);
        await user.click(swapFunctionButton)
        await user.click(applyMathFunction)
        expect(currentNumber()).toEqual(comparisonValue)
    });

    it('should re-render SubscribeToToContexts on the swap and apply button presses', async () => {
        const {user} = setupPage();
        const spyDiv = screen.getByTestId(spyDivTestId);
        const updateLogButton = screen.getByTestId(ClientWrapperListeners.updateLogButton);

        // Initial,
        // Update the log
        await user.click(updateLogButton)
        let logJson = getUserProfilerJson(spyDiv);
        let useProfilerEntries = logJson.logEntries.filter(entry => entry.id === SubscribeToTwoContextsKey);
        expect(useProfilerEntries).length(2) // Mount, update with retrieved subscriptions
        const {applyMathFunction, swapFunctionButton} = getMathButtons();
        // click them

        // swap,
        await user.click(swapFunctionButton)
        await user.click(updateLogButton)
        logJson = getUserProfilerJson(spyDiv);
        useProfilerEntries = logJson.logEntries.filter(entry => entry.id === SubscribeToTwoContextsKey);
        expect(useProfilerEntries).length(3) // First re-render

        // apply.
        await user.click(applyMathFunction)
        await user.click(updateLogButton)
        logJson = getUserProfilerJson(spyDiv);
        useProfilerEntries = logJson.logEntries.filter(entry => entry.id === SubscribeToTwoContextsKey);
        expect(useProfilerEntries).length(4) // Second re-render
    });

    it('should display the number value in the ReadAny div', async () => {

        
        const {user} = setupPage();
        const numberInput = screen.getByTestId(PageListeners.numberDiv) as HTMLInputElement;
        const readAnyDiv = screen.getByTestId(PageListeners.readAnyDiv);
        const readAnyDropdownButton = screen.getByTestId(readAnyDropdown);

        // click the dropdown
        await user.click(readAnyDropdownButton)

        // Find the options
        const options = screen.getAllByRole('option');

        expect(options.length).toBe(choicesArray.length)

        // Find the nthTermOption
        const nthTermOption = options.find(option => option.id === NthTerm);

        if (nthTermOption) {
            await user.selectOptions(readAnyDropdownButton, nthTermOption)

            // Check if the correct option is selected
            await waitFor(() => {
                expect((nthTermOption as HTMLOptionElement).selected).toBe(true);
            });
        } else {
            throw new Error('could not find nthTerm option')
        }

        // Ensure the select element now has the right value selected
        const selectedOption = screen.getByRole('option', { selected: true });

        // Check if the correct option is selected
        expect(selectedOption.id).toEqual(NthTerm);

        // Verify the change in div content value as well
        await waitFor(() => {
            expect(readAnyDiv.textContent).toEqual(numberInput.value)
        })

    });

    it('should reset the log content, number value and math function.', async () => {
        const {user} = setupPage();
        const heading = screen.getByTestId(headerButton);
        const updateLogButton = screen.getByTestId(ClientWrapperListeners.updateLogButton);
        const numberInput = screen.getByTestId(PageListeners.numberDiv) as HTMLInputElement;
        const spyDiv = screen.getByTestId(spyDivTestId);
        const functionTypeLabel = screen.getByTestId(ClientWrapperListeners.functionalListenerDiv);
        const {applyMathFunction, swapFunctionButton} = getMathButtons();

        const currentNumber = () => {
            return parseInt(numberInput.value, 10)
        }

        await user.click(updateLogButton)
        await user.click(swapFunctionButton)
        await user.click(applyMathFunction)
        await user.click(heading)

        expect(currentNumber()).toEqual(InitialNthValue)
        expect(spyDiv.textContent).toBe('{}')
        expect(functionTypeLabel.textContent).toBe(initialFunctionLabel)


    });


});