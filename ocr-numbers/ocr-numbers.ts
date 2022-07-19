const NUMBERS = [
    [' _ ', '| |', '|_|'],
    ['   ', '  |', '  |'],
    [' _ ', ' _|', '|_ '],
    [' _ ', ' _|', ' _|'],
    ['   ', '|_|', '  |'],
    [' _ ', '|_ ', ' _|'],
    [' _ ', '|_ ', '|_|'],
    [' _ ', '  |', '  |'],
    [' _ ', '|_|', '|_|'],
    [' _ ', '|_|', ' _|'],
];

function checkValidInput(grid: string[]): boolean {
    //has values
    if (!grid[0]) return false;
    //first line has 3-width grid
    if (grid[0].length % 3 !== 0) return false;
    //all lines same size
    if (grid.some((line: string) => line.length !== grid[0].length)) return false;
    //4-height columns
    if (grid.length % 4 !== 0) return false;
    //4th line always blank spaces
    for (let c = 3; c < grid.length; c += 4) {
        if (' '.repeat(grid[0].length) !== grid[c]) return false;
    }

    return true;
}

export function convert(g: string): string {
    let grid = g.split('\n');
    let result = '';

    if (!checkValidInput(grid)) throw new Error('Invalid input');

    for (let row = 0; row < grid.length; row += 4) {
        for (let col = 0; col < grid[0].length; col += 3) {
            let possibleNumbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

            //first row intersecpted with NUMBERS
            possibleNumbers = possibleNumbers.filter((nbr: number) =>
                [...numbersAccepted(grid[row].substring(col, col + 3), 0)].includes(nbr)
            );

            //second row intersecpted with NUMBERS
            possibleNumbers = possibleNumbers.filter((nbr: number) =>
                [...numbersAccepted(grid[row + 1].substring(col, col + 3), 1)].includes(nbr)
            );

            //thrid row intersecpted with NUMBERS
            possibleNumbers = possibleNumbers.filter((nbr: number) =>
                [...numbersAccepted(grid[row + 2].substring(col, col + 3), 2)].includes(nbr)
            );

            result += possibleNumbers.length === 1 ? possibleNumbers[0] : '?';
        }
        result += ',';
    }

    return result.substring(0, result.length - 1);
}

function numbersAccepted(digitRow: string, vertical: number): number[] {
    let accepted: number[] = [];

    NUMBERS.forEach((nbr: string[], idx: number) => {
        if (digitRow === nbr[vertical]) accepted.push(idx);
    });

    return accepted;
}