export function compute(left: string, right: string): number {
  if(left.length !== right.length) {
    throw new Error('DNA strands must be of equal length.');
  }

  let count = 0;

  for(let idx = 0; idx < left.length; idx++) {
    if(left[idx] !== right[idx]) count++;
  }

  return count;
}
