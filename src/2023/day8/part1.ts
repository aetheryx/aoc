import { readFileSync } from 'fs';
import { join } from 'path';
import { DayOpts } from 'src/day';

type Step = 'L' | 'R';
type Steps = Record<Step, string>;

export function day(input: string): any {
  const [_step, ...edges] = input.split('\n');
  const nodes = new Map<string, Steps>();

  for (const edge of edges.slice(1)) {
    const [name, _neighbors] = edge.split(' = ');
    const [L, R] = _neighbors.slice(1, -1).split(', ');

    nodes.set(name, { L, R });
  }

  const steps = _step.split('') as Step[];

  let sum = 0;
  let current = 'AAA';

  while (current !== 'ZZZ') {
    for (const step of steps) {
      sum++;
      current = nodes.get(current)[step];
    }
  }
  
  return sum;
}

export const opts: DayOpts = {
  input: readFileSync(join(__dirname, './input.txt')).toString(),
  // sampleInput: readFileSync(join(__dirname, './sample.txt')).toString(),
  sampleAnswer: 0,
};
