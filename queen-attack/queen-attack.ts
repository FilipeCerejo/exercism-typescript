type Position = readonly [number, number];

type Positions = {
  white: Position;
  black: Position;
};

export class QueenAttack {
  public readonly black: Position;
  public readonly white: Position;

  // white: [whiteRow, whiteColumn]
  // black: [blackRow, blackColumn]
  constructor({ white, black }: Partial<Positions> = {}) {
    if (black) {
      if (this.hasValidPosition(black)) {
        this.black = black;
      } else {
        throw new Error('Queen must be placed on the board');
      }
    } else {
      this.black = [0, 3];
    }

    if (white) {
      if (this.hasValidPosition(white)) {
        this.white = white;
      } else {
        throw new Error('Queen must be placed on the board');
      }
    } else {
      this.white = [7, 3];
    }

    if (white && black && this.isEqualArray(white, black)) {
      throw new Error('Queens cannot share the same space');
    }
  }

  private hasValidPosition(piece: Position) {
    return 0 <= piece[0] && piece[0] <= 7 && 0 <= piece[1] && piece[1] <= 7;
  }

  private isEqualArray(arrW: Position, arrB: Position): boolean {
    if (arrW.length !== arrB.length) return false;
    return arrW.every((valA: number, idxA: number) => valA === arrB[idxA]);
  }

  toString() {
    return Array.from({ length: 8 }).map((r, row) => {
      if (row === this.white[0]) {
        return Array.from({ length: 8 })
          .map((c, col) => {
            if (col === this.white[1]) {
              return 'W';
            } else {
              return '_';
            }
          })
          .join(' ');
      }
      if (row === this.black[0]) {
        return Array.from({ length: 8 })
          .map((c, col) => {
            if (col === this.black[1]) {
              return 'B';
            } else {
              return '_';
            }
          })
          .join(' ');
      }
      return '_ _ _ _ _ _ _ _';
    }).join('\n');
  }

  get canAttack(): boolean {
     //horizontal
    if (this.black[0] === this.white[0]) return true;

    //vertical
    if (this.black[1] === this.white[1]) return true;

    //diagonal
    let attackPositions = this.getAttackPositions(this.white);
    return attackPositions.some((p) => this.isEqualArray(p, this.black));
  }

  private getAttackPositions(
    queen: Position,
    iteration = 1,
    attackPositions: Position[] = []
  ): Position[] {
    let currentLength = attackPositions.length;

    let upleft: Position = [queen[0] - iteration, queen[1] - iteration];
    if (this.hasValidPosition(upleft)) {
      attackPositions.push(upleft);
    }
    let downleft: Position = [queen[0] + iteration, queen[1] - iteration];
    if (this.hasValidPosition(downleft)) {
      attackPositions.push(downleft);
    }
    let upright: Position = [queen[0] - iteration, queen[1] + iteration];
    if (this.hasValidPosition(upright)) {
      attackPositions.push(upright);
    }
    let downright: Position = [queen[0] + iteration, queen[1] + iteration];
    if (this.hasValidPosition(downright)) {
      attackPositions.push(downright);
    }

    if (currentLength !== attackPositions.length) {
      return this.getAttackPositions(queen, iteration + 1, attackPositions);
    }
    return attackPositions;
  }
}