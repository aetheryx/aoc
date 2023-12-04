import { readFileSync } from 'fs';
import { join } from 'path';
import { DayOpts } from 'src/day';

export function day(input: string): any {
  const lines = input.split('\n');
  let sum = 0;

  for (const line of lines) {
    const [, sets] = line.split(': ');
    const [_winning, _has] = sets.split(' | ').map(s => s.split(/\s+/g).map(c => Number(c)));

    let points = 0.5;
    const winning = new Set(_winning);

    for (const has of _has) {
      if (winning.has(has)) points *= 2;
    }

    sum += Math.floor(points);
  }

  return sum;
}

export const opts: DayOpts = {
  input: readFileSync(join(__dirname, './input.txt')).toString(),
  sampleInput: readFileSync(join(__dirname, './sample.txt')).toString(),
  sampleAnswer: 13,
};
