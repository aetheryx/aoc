const DAY = '2024/day3';
// read file and -w from argv

import { runDay } from './day';
import chokidar from 'chokidar';

async function run(clear: boolean): Promise<void> {
  for (const key of Object.keys(require.cache)) {
    if (key.includes(__dirname)) {
      delete require.cache[key];
    }
  }

  try {
    if (clear) {
      console.clear();
    }

    console.log(`Running at ${new Date().toLocaleString()}`);
    const day = require(`./${DAY}`);
    await runDay(day);
  } catch (err) {
    console.error('errored', err);
  }
}

chokidar.watch(__dirname, {
  ignoreInitial: true,
})
  .on('change', () => run(true));

run(false);
