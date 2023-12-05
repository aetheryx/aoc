import { DayOpts } from 'src/day';
import { readFileSync } from 'fs';
import { join } from 'path';

type Range = {
  start: number;
  end: number;
}

type Mapping = {
  src: Range;
  dest: Range;
}

function parse(input: string): {
  seedRanges: Range[];
  mappingGroups: Mapping[][];
} {
  const seedRanges: Range[] = [];
  const mappingGroups: Mapping[][] = [];

  const [_seeds, ..._mappings] = input.split('\n\n');
  const seeds = _seeds.split(': ')[1].split(' ').map(c => Number(c));
  for (let i = 0; i < seeds.length; i += 2) {
    seedRanges.push({
      start: seeds[i],
      end: seeds[i] + seeds[i + 1] - 1
    });
  }

  for (const _mapping of _mappings) {
    const [_name, _ranges] = _mapping.split(':\n');
    const group: Mapping[] = [];
    mappingGroups.push(group);

    for (const _range of _ranges.split('\n')) {
      const [dest, src, length] = _range.split(' ').map(s => Number(s));
      group.push({
        src: { start: src, end: src + length },
        dest: { start: dest, end: dest + length },
      });
    }
  }

  return { seedRanges, mappingGroups };
}

export function day(input: string): any {
  const { mappingGroups, seedRanges } = parse(input);

  const locations: Range[] = [];

  for (const seedRange of seedRanges) {
    let outer: Range[] = [seedRange];
    
    for (const mappings of mappingGroups) {
      let inner: Range[] = [];

      while (outer.length !== 0) {
        const range = outer.pop();
        let matched = false;
        for (const mapping of mappings) {
          matched ||= calculateOverlap(range, mapping, inner, outer);
        }

        if (!matched) {
          inner.push(range);
        }
      }

      outer = inner.filter(s => s.end !== null);
    }

    locations.push(...outer);
  }

  return Math.min(...locations.map(l => l.start));
}


function calculateOverlap(
  range: Range,
  mapping: Mapping,
  inner: Range[],
  outer: Range[],
): boolean {
  // no overlap
  if (range.start >= mapping.src.end || range.end < mapping.src.start) return false;

  const inside: Range = {
    start: mapping.dest.start,
    end: null,
  };
  inner.push(inside);

  // fully covered
  if (range.start >= mapping.src.start && range.end < mapping.src.end) {
    inside.start += range.start - mapping.src.start;
    inside.end = inside.start + (range.end - range.start);
    return true;
  }

  // start falls outside
  if (range.start < mapping.src.start) {
    inside.end = inside.start + (range.end - mapping.src.start)
    outer.push({
      start: range.start,
      end: mapping.src.start - 1
    });
  }

  // end falls outside
  if (range.end > mapping.src.end) {
    inside.start += (range.start - mapping.src.start);
    inside.end = mapping.dest.end - 1;
    outer.push({
      start: mapping.src.end,
      end: range.end
    });
  }

  return inside.end !== null;
}

export const opts: DayOpts = {
  input: readFileSync(join(__dirname, './input.txt')).toString(),
  sampleInput: readFileSync(join(__dirname, './sample.txt')).toString(),
  sampleAnswer: 46
}
