interface iNucleotide {
  [l: string]: number;
}

export function nucleotideCounts(nucleotide: string) {
  const count: iNucleotide = { A: 0, C: 0, G: 0, T: 0 };

  for(let i = 0; i < nucleotide.length; i++) {
    if(nucleotide[i] in count) {
      count[nucleotide[i]] += 1;
    } else {
      throw new Error('Invalid nucleotide in strand');
    }
  }

  return count;
}
