interface Input {
    maxFactor: number;
    minFactor: number;
}
type FactorType = [number, number];
type PalindromeType = {
    value: number | null;
    factors: FactorType[];
};
type FoundPalindromesType = {
    smallest: PalindromeType;
    largest: PalindromeType;
};

export function generate(params: Input): FoundPalindromesType {
    if (params.minFactor > params.maxFactor) throw new Error('min must be <= max');

    let result: FoundPalindromesType = {
        smallest: { value: null, factors: [] },
        largest: { value: null, factors: [] },
    };

    for (let f1 = params.minFactor; f1 <= params.maxFactor; f1++) {
        for (let f2 = f1; f2 <= params.maxFactor; f2++) {
            let nbr = f1 * f2;
            if (isPalindrome(nbr)) {
                if (!result.smallest.value || nbr < result.smallest.value) {
                    result.smallest.value = nbr;
                    result.largest.factors = [];
                }
                if (nbr === result.smallest.value) {
                    result.smallest.factors.push([f1, f2]);
                }

                if (!result.largest.value || nbr > result.largest.value) {
                    result.largest.value = nbr;
                    result.largest.factors = [];
                }
                if (nbr === result.largest.value) {
                    result.largest.factors.push([f1, f2]);
                }
            }
        }
    }

    return result;
}

function isPalindrome(nbr: number): boolean {
    let strNbr = String(nbr);
    for (let i = 0; i < Math.floor(strNbr.length / 2); i++) {
        if (strNbr[i] !== strNbr[strNbr.length - 1 - i]) return false;
    }
    return true;
}