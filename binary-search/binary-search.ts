export function find(haystack: number[], needle: number): number | never {
  return findRecursive(haystack, needle, 0, haystack.length);
}

function findRecursive(haystack: number[], needle: number, i: number, f: number): number | never {
  let middle = Math.floor((i + f) / 2);

  if(middle === i) {
    if(haystack[middle] === needle) {
      return middle;
    } else {
      throw new Error('Value not in array');
    }
  }

  if(needle > haystack[middle]) {
    return findRecursive(haystack, needle, middle, f);
  } else if(needle < haystack[middle]) {
    return findRecursive(haystack, needle, i, middle);
  } else {
    return middle;
  }
}
