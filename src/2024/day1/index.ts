import { readFileSync } from 'fs';
import { join } from 'path';
import { DayOpts } from 'src/day';

function day1(input: string): any {
  const lines = input.split('\n');
  let left: number[] = [];
  let right: number[] = [];

  for (const line of lines) {
    const [ l, r ] = line.split(/ +/).map(Number);
    left.push(l);
    right.push(r);
  }

  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  let sum = 0;
  for (let i = 0; i < left.length; i++) {
    sum += Math.abs(left[i] - right[i]);
  }

  return sum;
}

export function day(input: string): any {
  const lines = input.split('\n');
  let left: number[] = [];
  let right = new Map<number, number>();

  for (const line of lines) {
    const [ l, r ] = line.split(/ +/).map(Number);
    left.push(l);
    right.set(r, (right.get(r) ?? 0) + 1);
  }

  let sum = 0;
  for (const l of left) {
    sum += l * (right.get(l) ?? 0);
  }

  return sum;
}

export const opts: DayOpts = {
  input: readFileSync(join(__dirname, './input.txt')).toString(),
  sampleInput: readFileSync(join(__dirname, './sample.txt')).toString(),
  sampleAnswer: 11,
};
