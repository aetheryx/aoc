import { readFileSync } from 'fs';
import { join } from 'path';
import { DayOpts } from 'src/day';

type Card = {
  id: number;
  winning: Set<number>;
  numbers: number[];
  copies: number;
}

export function day(input: string): any {
  const lines = input.split('\n');

  const cards: Card[] = [];

  for (const line of lines) {
    const [_id, sets] = line.split(': ');
    const [_winning, _has] = sets.split(' | ').map(s => s.split(/\s+/g).map(c => Number(c)));

    const id = Number(_id.split(' ')[1]);
    const winning = new Set(_winning);
    const card: Card = {
      id,
      winning,
      numbers: _has,
      copies: 1
    };

    cards.push(card);
  }

  for (const [i, card] of cards.entries()) {
    const points = card.numbers.filter(n => card.winning.has(n)).length;

    for (let j = 0; j < points; j++) {
      cards[i + j + 1].copies += card.copies;
    }
  }

  return cards.reduce((a, b) => a + b.copies, 0);
}

export const opts: DayOpts = {
  input: readFileSync(join(__dirname, './input.txt')).toString(),
  sampleInput: readFileSync(join(__dirname, './sample.txt')).toString(),
  sampleAnswer: 30,
};
