import { readFileSync } from 'fs';
import { cloneDeep } from 'lodash';
import { join } from 'path';
import { DayOpts } from 'src/day';

export function day1(input: string): any {
  const lines = input.split('\n');
  let sum = 0;

  const grid: string[][] = [];

  for (const line of lines) {
    grid.push(line.split(''));
  }

  const dirs = [
    [ 0, 1 ],
    [ 0, -1 ],
    [ 1, 0 ],
    [ -1, 0 ],
    [ 1, 1 ],
    [ 1, -1 ],
    [ -1, 1 ],
    [ -1, -1 ],
  ];
  const chars = 'XMAS'.split('');

  const check = (x: number, y: number, dx: number, dy: number): boolean => {
    for (let i = 0; i < 4; i++) {
      const rx = x + (dx * i);
      const ry = y + (dy * i);
      if (grid[ry]?.[rx] !== chars[i]) {
        return false;
      }
    }
    return true;
  };

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      for (const [ dx, dy ] of dirs) {
        if (check(x, y, dx, dy)) {
          sum++;
        }
      }
    }
  }

  return sum;
}

export function day(input: string): any {
  const lines = input.split('\n');
  let sum = 0;

  const grid: string[][] = [];

  for (const line of lines) {
    grid.push(line.split(''));
  }

  const xmas = [
    'M.M'.split(''),
    '.A.'.split(''),
    'S.S'.split(''),
  ];

  const check = (x: number, y: number, mat: string[][]): boolean => {
    for (let dy = 0; dy < mat.length; dy++) {
      for (let dx = 0; dx < mat.length; dx++) {
        if (mat[dy][dx] === '.') continue;
        if (grid[y + dy]?.[x + dx] !== mat[dy][dx]) {
          return false;
        }
      }
    }
    return true;
  };

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      let mat = cloneDeep(xmas);
      for (let r = 0; r <= 3; r++) {
        mat = mat[0].map((_, i) => mat.map(row => row[i]).reverse());
        if (check(x, y, mat)) {
          sum++;
        }
      }
    }
  }

  return sum;
}

export const opts: DayOpts = {
  input: readFileSync(join(__dirname, './input.txt')).toString(),
  sampleInput: readFileSync(join(__dirname, './sample.txt')).toString(),
  sampleAnswer: 9,
};
