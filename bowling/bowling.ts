type FrameType = 'normal' | 'spare' | 'strike';
type FrameRoolsType = [number?, number?, number?];

class Frame {
    private _seqNumber: number;
    private _rolls: FrameRoolsType;
    private _frameType: FrameType;

    constructor(seqNumber: number) {
        this._seqNumber = seqNumber;

        this._rolls = [];
        this._frameType = 'normal';
    }

    public get lastFrame(): boolean {
        return this._seqNumber === 10;
    }

    public get frameType(): FrameType {
        return this._frameType;
    }

    public get firstRoll(): number | undefined {
        return this._rolls[0];
    }

    public get sum2Rolls(): number {
        return this._rolls[0]! + (this._rolls[1] || 0);
    }

    public get sumRolls(): number {
        return this._rolls[0]! + (this._rolls[1] || 0) + (this._rolls[2] || 0);
    }

    public addRoll(pins: number): boolean {
        if (pins < 0) throw new Error('Negative roll is invalid');
        if (pins > 10) throw new Error('Pin count exceeds pins on the lane');

        if (this._rolls.length === 0) {
            this._rolls.push(pins);
            if (pins === 10) {
                this._frameType = 'strike';
            }
            if (!this.lastFrame && pins === 10) {
                return true;
            }
            return false;
        } else if (this._rolls.length === 1) {
            if (!this.lastFrame && this._rolls[0]! + pins > 10) throw new Error('Pin count exceeds pins on the lane');

            this._rolls.push(pins);
            if (this._rolls[0]! + pins === 10) {
                this._frameType = 'spare';
            }
            if (!this.lastFrame || this._frameType === 'normal') {
                return true;
            }
            return false;
        } else if (this.lastFrame && this._rolls.length === 2) {
            let pendingPins = (this._rolls[0]! + this._rolls[1]!) % 10;
            if (pendingPins + pins > 10) throw new Error('Pin count exceeds pins on the lane');
            this._rolls.push(pins);
            return true;
        } else {
            throw new Error('Can´t roll on this frame anymore');
        }
    }
}

export class Bowling {
    private ended: boolean = false;
    private currentFrame: number;
    private frames: Frame[] = [];

    constructor() {
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((_, idx: number) => {
            this.frames.push(new Frame(idx + 1));
        });
        this.ended = false;
        this.currentFrame = 0;
    }

    public roll(pins: number): void {
        if (this.ended) {
            throw new Error('Cannot roll after game is over');
        }
        if (this.frames[this.currentFrame].addRoll(pins)) {
            this.currentFrame++;
            if (this.currentFrame === 10) {
                this.ended = true;
            }
        }
    }

    public score(): number {
        if (!this.ended) {
            throw new Error('Score cannot be taken until the end of the game');
        }

        let score = 0;

        this.frames.forEach((frame: Frame, idx: number) => {
            if (!frame.lastFrame) {
                switch (frame.frameType) {
                    case 'normal':
                        score += frame.sum2Rolls;
                        break;
                    case 'spare':
                        score += 10 + this.frames[idx + 1].firstRoll!;
                        break;
                    case 'strike':
                        let scoreAux = 0;
                        if (this.frames[idx + 1].frameType === 'strike') {
                            if (this.frames[idx + 2]) {
                                scoreAux += 20 + this.frames[idx + 2].firstRoll!;
                            } else {
                                scoreAux += 10 + this.frames[idx + 1].sum2Rolls!;
                            }
                        } else {
                            scoreAux += 10 + this.frames[idx + 1].sum2Rolls!;
                        }
                        score += scoreAux;
                        break;
                }
            } else {
                score += frame.sumRolls;
            }
        });

        return score;
    }
}