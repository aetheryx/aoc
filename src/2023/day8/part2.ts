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

  let currentNodes = [ ...nodes.keys() ].filter(s => s.endsWith('A'));
  let lcm = 0;

  for (let [i, current] of currentNodes.entries()) {
    let count = 0;
    while (!current.endsWith('Z')) {
      for (const step of steps) {
        count++;
        current = nodes.get(current)[step];
      }
    }

    const gcd = (a, b) => a ? gcd(b % a, a) : b;
    lcm ||= count;
    lcm *= count / gcd(lcm, count);
  }

  return lcm;
}

export const opts: DayOpts = {
  input: readFileSync(join(__dirname, './input.txt')).toString(),
  // sampleInput: readFileSync(join(__dirname, './sample.txt')).toString(),
  sampleAnswer: 0,
};
