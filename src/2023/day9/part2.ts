import { readFileSync } from 'fs';
import { join } from 'path';
import { DayOpts } from 'src/day';

export function day(input: string): any {
  const lines = input.split('\n');
  let sum = 0;
  const histories: number[][] = [];

  for (const line of lines) {
    const row = line.split(' ').map(s => Number(s));
    histories.push(row);
  }

  for (const history of histories) {
    let levels: number[][] = [history];
    const prev = () => levels.at(-1);
    
    while (prev().some(v => v !== 0)) {
      const nextLevel = Array.from({ length: prev().length - 1 }, (_, i) => {
        return prev()[i + 1] - prev()[i]
      });

      levels.push(nextLevel);
    }

    console.log('pre', levels);

    prev().unshift(0);

    for (let i = levels.length - 2; i >= 0; i--) {
      const prev = levels[i + 1];
      levels[i].unshift(levels[i][0] - prev[0]);
      console.log(i, levels);
    }

    sum += levels[0][0]
  }

  return sum;
}

export const opts: DayOpts = {
  input: readFileSync(join(__dirname, './input.txt')).toString(),
  sampleInput: readFileSync(join(__dirname, './sample.txt')).toString(),
  sampleAnswer: 0,
};
