export function convert(digits: number[], inputBase: number, outputBase: number): number[] {
    if (inputBase < 2 || inputBase % 1 !== 0) throw new Error('Wrong input base');
    if (outputBase < 2 || outputBase % 1 !== 0) throw new Error('Wrong output base');

    //test input
    if (digits.length === 0) throw new Error('Input has wrong format');
    if (digits[0] === 0 && digits.length > 1) throw new Error('Input has wrong format');
    digits.forEach((d) => {
        if (d < 0 || d >= inputBase) throw new Error('Input has wrong format');
    });

    //universal 
    if (digits[0] === 0 && digits.length === 1) return digits;

    let decimalNbr = digits.reduce((acc, cur, idx, arr) => {
        acc += cur * inputBase ** (arr.length - 1 - idx);
        return acc;
    }, 0);

    let outputNbr: number[] = [];
    while (decimalNbr > 0) {
        outputNbr.unshift(decimalNbr % outputBase);
        decimalNbr = Math.floor(decimalNbr / outputBase);
    }
    return outputNbr;
}
