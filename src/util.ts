export const echo = console.log;

export function mapFill<T>(length: number, filler: { value: T } | ((index: number) => T)): T[] {
  return Array.from({ length }, (_, i) => (
    'value' in filler ? filler.value : filler(i)
  ));
}

export function range(start: number, end: number): number[] {
  if (start > end) {
    throw new Error('start may not be greater than end');
  }

  return mapFill(end - start, (i) => i + start);
}

export function clamp(value: number, values: { min?: number; max?: number }): number {
  if ('min' in values) {
    value = Math.max(value, values.min);
  }
  if ('max' in values) {
    value = Math.min(value, values.max);
  }

  return value;
}
