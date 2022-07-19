export function classify(initial: number): string {

  if(isNaN(initial) || initial <= 0) {
    throw new Error('Classification is only possible for natural numbers.')
  }

  let sum = 0;
  for(let i = Math.floor(initial / 2); i >= 0; i--) {
    if(initial % i === 0) sum += i;
  }
    
    if(sum < initial) return 'deficient';
    if(sum > initial) return 'abundant';
  return 'perfect';
}
