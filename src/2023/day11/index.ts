import { readFileSync } from 'fs';
import { join } from 'path';
import { DayOpts } from 'src/day';

type Point = { x: number; y: number };

export function day(input: string): any {
  const grid = input.split('\n').map(r => r.trim().split(''));
  let sum = 0;

  const cols = new Set<number>();
  const rows = new Set<number>();

  for (let x = 0; x < grid[0].length; x++) {
    cols.add(x);
  }

  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    if (row.every(s => s === '.')) {
      rows.add(y);
    }

    for (let x = 0; x < grid[0].length; x++) {
      if (row[x] !== '.') cols.delete(x);
    }
  }

  const galaxies: Point[] = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === '#') {
        galaxies.push({ x, y });
      }
    }
  }

  for (let i = 0; i < galaxies.length; i++) {
    const galaxy = galaxies[i];
    for (let j = i + 1; j < galaxies.length; j++) {

      const other = galaxies[j];
      let minx = Math.min(galaxy.x, other.x);
      let maxx = Math.max(galaxy.x, other.x);
      let miny = Math.min(galaxy.y, other.y);
      let maxy = Math.max(galaxy.y, other.y);

      let len = 0;
      for (let x = minx; x <= maxx; x++) {
        len++;
        if (cols.has(x)) len += 1000000 - 1;
      }

      for (let y = miny; y <= maxy; y++) {
        len++;
        if (rows.has(y)) len += 1000000 - 1;
      }

      sum += (len - 2);
    }
  }

  return sum;
}

export const opts: DayOpts = {
  input: readFileSync(join(__dirname, './input.txt')).toString(),
  sampleInput: readFileSync(join(__dirname, './sample.txt')).toString(),
  sampleAnswer: 374,
};
