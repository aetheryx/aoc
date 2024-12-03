import { readFileSync } from 'fs';
import { join } from 'path';
import { DayOpts } from 'src/day';

export function day(input: string): any {
  const lines = input.split('\n');
  let sum = 0;

  let doing = true;

  for (let line of lines) {
    const matches = line.match(/(mul\((\d+),(\d+)\))|(do\(\))|(don't\(\))/g);
    for (const match of matches ?? []) {
      if (match === 'do()') {
        doing = true;
      } else if (match === 'don\'t()') {
        doing = false;
      }

      if (match.startsWith('mul') && doing) {
        const [ _, a, b ] = match.match(/mul\((\d+),(\d+)\)/);
        sum += Number(a) * Number(b);
      }
    }
  }

  return sum;
}

export const opts: DayOpts = {
  input: readFileSync(join(__dirname, './input.txt')).toString(),
  sampleInput: readFileSync(join(__dirname, './sample.txt')).toString(),
  sampleAnswer: 48,
};
