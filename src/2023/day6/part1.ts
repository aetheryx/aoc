import { readFileSync } from 'fs';
import { join } from 'path';
import { DayOpts } from 'src/day';

export function day(input: string): any {
  const [times, distances] = input.split('\n').map(s => s.split(':')[1].trim().split(/\s+/).map(s => Number(s)));
  let sum = 1;

  for (const [i, maxTime] of times.entries()) {
    const minDistance = distances[i];

    let ways = 0;

    for (let timeWaited = 1; timeWaited < maxTime; timeWaited++) {
      const distance = (maxTime - timeWaited) * timeWaited;
      if (distance > minDistance) ways++;
    }

    sum *= ways;
  }

  return sum;
}

export const opts: DayOpts = {
  input: readFileSync(join(__dirname, './input.txt')).toString(),
  sampleInput: readFileSync(join(__dirname, './sample.txt')).toString(),
  sampleAnswer: 0,
};
