const problemRgx = /^What is(.*)\?$/;
const digitRgx = /-?[0-9]+/;
const opertionRgx = /^(plus|minus|multiplied by|divided by)/;

export const answer = (question: string) => {
  let matches = question.match(problemRgx);
  if (!matches) {
    throw new Error('Unknown operation');
  }

  let problem = matches[1].trim();
  return solve(problem);
}

const solve = (problem: string, sum = 0, operation = 'plus'): number => {
  let digit = problem.match(digitRgx);
  if (!digit || digit.index !== 0) {
    throw new Error('Syntax error');
  } else {
    let number = Number(digit[0]);

    switch (operation) {
      case 'plus':
        sum += Number(number);
        break;
      case 'minus':
        sum -= Number(number);
        break;
      case 'multiplied by':
        sum *= Number(number);
        break;
      case 'divided by':
        sum /= Number(number);
        break;
      default:
        throw new Error('Syntax error');
    }

    let sliceProblem = problem.slice(digit[0].length + 1);

    if (sliceProblem) {
      let nextDigitIdx = sliceProblem.match(digitRgx)
        ? sliceProblem.match(digitRgx)!.index
        : sliceProblem.length;

      let operation = sliceProblem.substring(0, nextDigitIdx).trim();
      if(!operation) {
        throw new Error('Syntax error');
      } else if(!opertionRgx.test(operation)) {
        throw new Error('Unknown operation');
      }

      return solve(
        sliceProblem.slice(nextDigitIdx),
        sum,
        operation
      );
    } else {
      return sum;
    }
  }
};