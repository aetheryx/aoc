import { readFileSync } from 'fs';
import { join } from 'path';
import { DayOpts } from 'src/day';

const NUMBERS = [
  'one', 'two', 'three', 'four', 'five',
  'six', 'seven', 'eight', 'nine'
];

export function day(input: string): any {
  const lines = input.split('\n');
  let sum = 0;

  for (const line of lines) {
    let first = '';
    let last = '';
    let lastIdx = -1;

    const onDigit = (digit: string, index: number): void => {
      first ||= digit;

      if (!last || index > lastIdx) {
        last = digit;
        lastIdx = index;
      }
    };

    for (let i = 0; i < line.length; i++) {
      const digit = line[i];

      if (!isNaN(Number(digit))) {
        onDigit(digit, i);
        continue;
      }

      for (const [idx, num] of NUMBERS.entries()) {
        if (line.slice(i, i + num.length) === num) {
          onDigit((idx + 1).toString(), i);
        }
      }
    }

    const num = Number(first + last);
    sum += num;
  }

  return sum;
}

export const opts: DayOpts = {
  input: readFileSync(join(__dirname, './input.txt')).toString(),
  sampleInput: readFileSync(join(__dirname, './sample.txt')).toString(),
  sampleAnswer: 281,
};

