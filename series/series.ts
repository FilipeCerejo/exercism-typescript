type SlicesType = number[][];

export class Series {
    constructor(private _series: string) {}

    slices(sliceLength: number): SlicesType | never {
        
        if (!sliceLength) throw new Error('slice length cannot be zero');
        if (sliceLength < 0) throw new Error('slice length cannot be negative');
        if (!this._series.length) throw new Error('series cannot be empty');
      if (sliceLength > this._series.length) throw new Error('slice length cannot be greater than series length');

        let slices: number[][] = [];
        for (let idx = 0; idx + sliceLength <= this._series.length; idx++) {
            slices.push(
                this._series
                    .substring(idx, idx + sliceLength)
                    .split('')
                    .map((digit: string) => Number(digit))
            );
        }

        return slices;
    }
}