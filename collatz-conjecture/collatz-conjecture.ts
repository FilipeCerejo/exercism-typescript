export function steps(count: number, step = 0): number {
  
  if(count <= 0) {
    throw new Error('Only positive numbers are allowed')
  }
  
  if(count === 1) {
    return step;
  }

  if(count % 2 === 0) {
    return steps(count / 2, ++step);
  } else {
    return steps(3 * count + 1, ++step);
  }
}
