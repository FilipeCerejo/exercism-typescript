type MoveType = [number, number];

export class TwoBucket {
    private _moves: number = 0;
    private _goalBucket: string = '';
    private _otherBucket: number = 0;

    constructor(private _buckOne: number, private _buckTwo: number, private _goal: number, private _starterBuck: string) {
        this.calculateMoves(_starterBuck === 'one' ? _buckOne : 0, _starterBuck === 'two' ? _buckTwo : 0);
    }

    private calculateMoves(
        one: number,
        two: number,
        count = 1,
        sequence: MoveType[] = []
    ): void {
        //both empty
        if (one === 0 && two === 0) return;
        //both full and the objective isn't that
        if (one === this._buckOne && one !== this._goal && two === this._buckTwo && two !== this._goal) return;
      //ignore the opposite of the initial state
        if (this._starterBuck === 'one' && one === 0 && two === this._buckTwo) return;
        if (this._starterBuck === 'two' && two === 0 && one === this._buckOne) return;
        //already in the sequence
        if (sequence.some((move) => move[0] === one && move[1] === two)) return;

        if (one === this._goal) {
            if (!this._moves || (this._moves && count <= this._moves)) {
                this._moves = count;
                this._goalBucket = 'one';
                this._otherBucket = two;
            }
            return;
        }
        if (two === this._goal) {
            if (!this._moves || (this._moves && count <= this._moves)) {
                this._otherBucket = one;
                this._goalBucket = 'two';
                this._moves = count;
            }
            return;
        }

        sequence.push([one, two]);

        //empty one
        this.calculateMoves(0, two, count + 1, sequence);
        //empty two
        this.calculateMoves(one, 0, count + 1, sequence);
        //fill one
        this.calculateMoves(this._buckOne, two, count + 1, sequence);
        //fill two
        this.calculateMoves(one, this._buckTwo, count + 1, sequence);
        //transfer one -> two
        let twoAfterMove = one > this._buckTwo - two ? this._buckTwo : one + two;
        this.calculateMoves(one - (twoAfterMove - two), twoAfterMove, count + 1, sequence);
        //transfer two -> one
        let oneAfterMove = two > this._buckOne - one ? this._buckOne : two + one;
        this.calculateMoves(oneAfterMove, two - (oneAfterMove - one), count + 1, sequence);
    }

    moves() {
        if (this._moves) {
            return this._moves;
        }

        throw new Error();
    }

    get goalBucket(): string {
        return this._goalBucket;
    }

    get otherBucket(): number {
        return this._otherBucket;
    }
}
