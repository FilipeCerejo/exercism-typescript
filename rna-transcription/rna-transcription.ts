const DNAtoRNA = {
  G:'C',C:'G',T:'A',A:'U'
}

type DNA = keyof typeof DNAtoRNA;

export function toRna(dna: string): string {
  let keys: string[] = Object.keys(DNAtoRNA);
return dna.split('').map((d: string) => {
      if(!keys.includes(d)) {
        throw new Error('Invalid input DNA.');
      }
      return DNAtoRNA[d as DNA];
    }).join('');
  
}
