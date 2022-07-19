export const largestProduct = (sDigits: string, spanLength: number): number => {
    if (spanLength > sDigits.length) throw new Error('Span must be smaller than string length');
    if (!/^[0-9]*$/.test(sDigits)) throw new Error('Digits input must only contain digits');
    if (spanLength < 0) throw new Error('Span must be greater than zero');

    let maxSpan = -1;

    for (let idx = 0; idx <= sDigits.length - spanLength; idx++) {
        let span = sDigits
            .substring(idx, idx + spanLength)
            .split('')
            .map((d) => Number(d))
            .reduce((acc: number, cur: number) => {
                acc *= cur;
                return acc;
            }, 1);
        maxSpan = span > maxSpan ? span : maxSpan;
    }

    return maxSpan;
};
