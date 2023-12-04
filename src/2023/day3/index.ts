import { readFileSync } from 'fs';
import { join } from 'path';
import { DayOpts } from 'src/day';

export function day(input: string): any {
  const lines = input.split('\n');
  let sum = 0;

  const gears: Record<string, number[]> = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let start: number | null = null;

    for (let j = 0; j < line.length + 1; j++) {
      const char = line[j];
      const isNumber = !isNaN(Number(char));
      if (isNumber && start === null) {
        start = j;
        continue;
      }

      if (!isNumber && start !== null) {
        const num = line.slice(start, j);

        const handleGear = (x: number, y: number): void => {
          // console.log('gear', x, y, num);
          gears[`${x},${y}`] ??= [];
          gears[`${x},${y}`].push(Number(num));
        }

        if (lines[i][start - 1] === '*') {
          handleGear(start - 1, i);
        }
        if (lines[i][j] === '*') {
          handleGear(j, i);
        }
        if (lines[i - 1]) {
          const prev = lines[i - 1];
          for (let k = Math.max(start - 1, 0); k < j + 1; k++) {
            if (prev[k] === '*') {
              handleGear(k, i - 1);
            }
          }
        }
        if (lines[i + 1]) {
          const next = lines[i + 1];
          for (let k = Math.max(start - 1, 0); k < j + 1; k++) {
            if (next[k] === '*') {
              handleGear(k, i + 1);
            }
          }
        }

        // let around = '';
        // around += lines[i - 1]?.slice(Math.max(start - 1, 0), j + 1) ?? ''; // above
        // around += lines[i + 1]?.slice(Math.max(start - 1, 0), j + 1) ?? ''; // below
        // around += lines[i][start - 1] ?? '';  // left
        // around += lines[i][j] ?? '';  // right

        // if ([...around].some(s => s !== '.')) {
        //   sum += Number(num);
        // }
        //   console.log('counting', sum, around);
        // } else {
        //   console.log('not counting', num, i);
        // }

        start = null;
      }
    }
  }

  for (const p of Object.values(gears)) {
    if (p.length === 2) {
      sum += p[0] * p[1];
    }
  }

  // console.log(gears);

  return sum;
}

export const opts: DayOpts = {
  input: readFileSync(join(__dirname, './input.txt')).toString(),
  sampleInput: readFileSync(join(__dirname, './sample.txt')).toString(),
  sampleAnswer: 467835,
};
