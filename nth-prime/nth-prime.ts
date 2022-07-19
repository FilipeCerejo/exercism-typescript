export function nth(nthPrime: number): number {
    if (nthPrime < 1) throw new Error('Prime is not possible');

    let count = 0;

    for (let nbr = 2; ; nbr++) {
        let prime = true;
        for (let test = 2; test < nbr; test++) {
            if (nbr % test === 0) {
                prime = false;
                break;
            }
        }
        if (prime) count++;
        if (count === nthPrime) return nbr;
    }
}
