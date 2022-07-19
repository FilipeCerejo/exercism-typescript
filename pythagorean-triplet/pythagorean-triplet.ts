type Options = {
  minFactor?: number
  maxFactor?: number
  sum: number
}

export function triplets({ sum, minFactor, maxFactor }: Options): Triplet[] {
  if (sum < 6) throw new Error('');
  const triplets: Triplet[] = [];

  let a = minFactor ?? 1;
  let b: number;
  let c: number;

  do {
    b = a + 1;
    do {
      c = sum - a - b;

      if(maxFactor && c > maxFactor) continue;

      if (c <= b) break;

      if (a ** 2 + b ** 2 === c ** 2) {
        triplets.push(new Triplet(a, b, c));
      }
    } while (++b < c - 1);
  } while (++a < b);

  return triplets;
}

class Triplet {
  private _a: number;
  private _b: number;
  private _c: number;

  constructor(a: number, b: number, c: number) {
    this._a = a;
    this._b = b;
    this._c = c;
  }

  toArray(): [number, number, number] {
    return [this._a, this._b, this._c];
  }
}