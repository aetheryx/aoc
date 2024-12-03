import { readFileSync } from 'fs';
import { join } from 'path';
import { DayOpts } from 'src/day';

const isLevelSafe = (level: number[]) => {
  let pos = level[0] > level[1];
  for (let i = 0; i < level.length; i++) {
    const curr = level[i];
    const next = level[i + 1];
    const diff = pos ? (curr - next) : (next - curr);
    if (diff < 1 || diff > 3) {
      return false;
    }
  }

  return true;
};

function day1(input: string): any {
  const lines = input.split('\n');
  let sum = 0;
  const levels: number[][] = [];

  for (const line of lines) {
    levels.push(line.split(' ').map(Number));
  }

  for (const level of levels) {
    if (isLevelSafe(level)) {
      sum++;
    }
  }

  return sum;
}

export function day(input: string): any {
  const lines = input.split('\n');
  let sum = 0;
  const levels: number[][] = [];

  for (const line of lines) {
    levels.push(line.split(' ').map(Number));
  }

  for (const level of levels) {
    let safe = isLevelSafe(level);

    for (let i = 0; i <= level.length; i++) {
      const l2 = [ ...level ];
      l2.splice(i, 1);
      safe ||= isLevelSafe(l2);
    }

    if (safe) {
      sum++;
    }
  }

  return sum;
}

export const opts: DayOpts = {
  input: readFileSync(join(__dirname, './input.txt')).toString(),
  sampleInput: readFileSync(join(__dirname, './sample.txt')).toString(),
  sampleAnswer: 4,
};
