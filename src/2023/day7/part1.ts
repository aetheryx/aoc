import { readFileSync } from 'fs';
import { join } from 'path';
import { DayOpts } from 'src/day';

const HANDS = [
  'A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'
];

type Card = {
  hand: string[];
  bid: number;
}

export function day(input: string): any {
  const lines = input.split('\n');
  let sum = 0;

  const cards: Card[] = [];

  for (const line of lines) {
    const [_hand, _bid] = line.split(' ');
    const card: Card = {
      hand: _hand.split(''),
      bid: Number(_bid),
    };

    cards.push(card);
  }

  const getType = (card: Card): number => {
    const freq: Record<string, number> = {};
    for (const hand of card.hand) {
      freq[hand] ??= 0;
      freq[hand]++;
    }

    const k = Object.keys(freq);
    const v = Object.values(freq);
    let num = k.length;

    if (num === 2 && v.includes(1)) return num;
    if (num === 2 && v.includes(2)) num += 0.5;
    if (num === 3 && !v.includes(3)) num += 0.5;

    return num;
  };

  const compare = (a: Card, b: Card): number => {
    const aType = getType(a);
    const bType = getType(b);

    if (aType < bType) return 1;
    if (aType > bType) return -1;

    for (let i = 0; i < 5; i++) {
      const aRank = HANDS.indexOf(a.hand[i]);
      const bRank = HANDS.indexOf(b.hand[i]);
      if (aRank < bRank) return 1;
      if (aRank > bRank) return -1;
    }

    return 0;
  };

  cards.sort((a, b) => compare(a, b));

  for (const [i, card] of cards.entries()) {
    sum += card.bid * (i + 1);
  }

  return sum;
}

export const opts: DayOpts = {
  input: readFileSync(join(__dirname, './input.txt')).toString(),
  sampleInput: readFileSync(join(__dirname, './sample.txt')).toString(),
  sampleAnswer: 6440,
};
