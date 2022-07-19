export function clean(phoneNr: string): string | never {
  if (/[A-Za-z]/g.test(phoneNr)) {
    throw new Error('Letters not permitted');
  }

  if (/[?@;:!]/g.test(phoneNr)) {
    throw new Error('Punctuations not permitted');
  }

  let justDigits = phoneNr.replace(/\D/g, '');
  if (justDigits.length < 10) {
    throw new Error('Incorrect number of digits');
  }
  if (justDigits.length > 11) {
    throw new Error('More than 11 digits');
  }
  
  if (justDigits.length === 11) {
    if (justDigits[0] !== '1') {
      throw new Error('11 digits must start with 1');
    }

    justDigits = justDigits.slice(1);
  }

  if (Number(justDigits[0]) < 2) {
    throw new Error(
      `Area code cannot start with ${justDigits[0] === '0' ? 'zero' : 'one'}`
    );
  }

  if (Number(justDigits[3]) < 2) {
    throw new Error(
      `Exchange code cannot start with ${
        justDigits[3] === '0' ? 'zero' : 'one'
      }`
    );
  }

  return justDigits;
}
