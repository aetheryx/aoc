import { readFileSync } from 'fs';
import { join } from 'path';
import { DayOpts } from 'src/day';

export function day(input: string): any {
  const [maxTime, minDistance] = input.split('\n').map(s => Number(s.split(':')[1].trim().split(/\s+/).join('')));

  let sum = 0;

  for (let timeWaited = 1; timeWaited < maxTime; timeWaited++) {
    const distance = (maxTime - timeWaited) * timeWaited;
    if (distance > minDistance) sum++;
  }

  return sum;
}

export const opts: DayOpts = {
  input: readFileSync(join(__dirname, './input.txt')).toString(),
  sampleInput: readFileSync(join(__dirname, './sample.txt')).toString(),
  sampleAnswer: 0,
};
