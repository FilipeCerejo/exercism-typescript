export const square = (place: number, grains = 1n): bigint => {
  if(place < 1 || place > 64) throw new Error();
  if(place === 1) return grains;
  return square(place - 1, grains * 2n);
}

export const total = (place = 64, grains = 1n, sum = 0n): bigint => {
  if(place === 0) return sum;
  return total(place - 1, grains * 2n, sum + grains);
}
