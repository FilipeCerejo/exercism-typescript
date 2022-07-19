function englishNbr(n: number): string {
    switch (n) {
        case 1:
            return 'one';
        case 2:
            return 'two';
        case 3:
            return 'three';
        case 4:
            return 'four';
        case 5:
            return 'five';
        case 6:
            return 'six';
        case 7:
            return 'seven';
        case 8:
            return 'eight';
        case 9:
            return 'nine';
        default:
            return '';
    }
}

function englishNbrDozensUnder20(n: number): string {
    switch (n) {
        case 10:
            return 'ten';
        case 11:
            return 'eleven';
        case 12:
            return 'twelve';
        case 13:
            return 'thirteen';
        case 14:
            return 'fourteen';
        case 15:
            return 'fifteen';
        case 16:
            return 'sixteen';
        case 17:
            return 'seventeen';
        case 18:
            return 'eighteen';
        case 19:
            return 'nineteen';
        default:
            return '';
    }
}

function englishNbrDozensAbove20(n: number): string {
    let units = n % 10;

    if (n >= 90) {
        return `ninety${units ? '-' + englishNbr(units) : ''}`;
    } else if (n >= 80) {
        return `eighty${units ? '-' + englishNbr(units) : ''}`;
    } else if (n >= 70) {
        return `seventy${units ? '-' + englishNbr(units) : ''}`;
    } else if (n >= 60) {
        return `sixty${units ? '-' + englishNbr(units) : ''}`;
    } else if (n >= 50) {
        return `fifty${units ? '-' + englishNbr(units) : ''}`;
    } else if (n >= 40) {
        return `forty${units ? '-' + englishNbr(units) : ''}`;
    } else if (n >= 30) {
        return `thirty${units ? '-' + englishNbr(units) : ''}`;
    } else if (n >= 20) {
        return `twenty${units ? '-' + englishNbr(units) : ''}`;
    } else {
        return '';
    }
}

function numberToArray(n: number, arr: number[] = []): number[] {
    if (!n) return arr;
    arr.unshift(n % 1000);
    return numberToArray(Math.floor(n / 1000), arr);
}

function threeDigits(h: number, word?: string): string {
    let inEng = '';

    if (h > 99) {
        inEng += `${englishNbr(Math.floor(h / 100))} hundred`;
    }

    let dozens = Math.floor(h % 100);

    if (dozens) {
        if (dozens < 10) {
            inEng += `${h > 99 ? ' ' : ''}${englishNbr(dozens)}`;
        } else if (dozens < 20) {
            inEng += `${h > 99 ? ' ' : ''}${englishNbrDozensUnder20(dozens)}`;
        } else {
            inEng += `${h > 99 ? ' ' : ''}${englishNbrDozensAbove20(dozens)}`;
        }
    }

    return inEng + (inEng && word ? ' ' + word : '');
}

export function sayInEnglish(n: number): string | never {
    if (n < 0 || n >= 1000000000000) {
        throw new Error('Number must be between 0 and 999,999,999,999.');
    }

    let inEnglish: string[] = [];
    let arrayNumber = numberToArray(n);

    if (arrayNumber.length > 3 && arrayNumber[arrayNumber.length - 4])
        inEnglish.push(threeDigits(arrayNumber[arrayNumber.length - 4], 'billion'));
    if (arrayNumber.length > 2 && arrayNumber[arrayNumber.length - 3])
        inEnglish.push(threeDigits(arrayNumber[arrayNumber.length - 3], 'million'));
    if (arrayNumber.length > 1 && arrayNumber[arrayNumber.length - 2])
        inEnglish.push(threeDigits(arrayNumber[arrayNumber.length - 2], 'thousand'));
    if (arrayNumber.length > 0 && arrayNumber[arrayNumber.length - 1])
        inEnglish.push(threeDigits(arrayNumber[arrayNumber.length - 1]));
    if (!arrayNumber.length) inEnglish.push('zero');

    return inEnglish.join(' ');
}