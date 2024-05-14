function removeTrailingZeros(output: number) {
    while (output % 2 === 0) {
        output = output / 2;
    }
    return output;
}

function rotateBase(output: number) {
    return 3 * output + 1;
}

function validateNaturalNumber(input: number) {
    if (Math.floor(input) !== input) throw Error(`${input} is not an integer`);
    if (input <= 0) throw Error(`${input} is not greater than 0.`);
}

function collatzCompressed(input: number) {
    validateNaturalNumber(input);

    let output = input;
    output = removeTrailingZeros(output);

    output = rotateBase(output);

    return removeTrailingZeros(output);
}

function increment(input: number) {
    validateNaturalNumber(input);
    return input + 1;
}

export const initialFunction = {
    memoizedFunction: increment,
};

export const otherFunction = {
    memoizedFunction: collatzCompressed,
};

