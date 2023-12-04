import { Promisable } from 'type-fest';
import chalk from 'chalk';


export type DayFn = (input: string) => Promisable<any>;
export type DayOpts = {
  sampleInput?: string;
  sampleAnswer?: any;
  input?: string;
};

export type Day = {
  day: DayFn;
  opts: DayOpts;
};

export async function runDay(day: Day) {
  if (typeof day.opts.sampleInput === 'string') {
    const output = await day.day(day.opts.sampleInput);
    if (output !== undefined) {
      console.log('Sample output:');
      console.log(output);
      if (day.opts.sampleAnswer) {
        const passes = output === day.opts.sampleAnswer;
        console.log('Passes:', passes ? chalk.green.bold`true` : chalk.red.bold`false`);
      }
    }
  }

  if (typeof day.opts.input === 'string') {
    const output = await day.day(day.opts.input);
    if (output !== undefined) {
      console.log('\nReal output:');
      console.log(output);
    }
  }

  console.log('');
}
