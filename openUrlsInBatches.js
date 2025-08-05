const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const open = require('open');
const { apps } = require('open');

const readline = require('readline-sync');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .option('start', {
    alias: 's',
    type: 'number',
    description: 'The row number (pair) to start from',
    default: 1
  })
  .argv;

// ⚠️ Update the CSV_FILE path as needed
  const CSV_FILE = './data/Native IFPs and their Legacy Versions - 7-5-25.csv';

function readCsv(filePath) {
  const csvData = fs.readFileSync(filePath);
  return parse(csvData, {
    columns: true,
    skip_empty_lines: true
  });
}

async function openPairsInNewWindows(rows) {
  const browserOptions = {
    chrome: { app: { name: apps.chrome, arguments: ['--new-window'] } },
    firefox: { app: { name: apps.firefox, arguments: ['--new-window'] } },
    edge: { app: { name: apps.edge, arguments: ['--new-window'] } },
  };

  const startFromIndex = argv.start - 1;
  if (startFromIndex < 0 || startFromIndex >= rows.length) {
    console.error(`Invalid starting row. Choose between 1 and ${rows.length}.`);
    return;
  }

  console.log(`Total URL pairs found: ${rows.length}`);
  if (argv.start > 1) {
    console.log(`Starting from pair number ${argv.start}.`);
  }

  for (let i = startFromIndex; i < rows.length; i++) {
    const { websiteUrl: nativeRaw, oldWebsiteUrl: legacyRaw, planName } = rows[i];
    const native = nativeRaw?.trim();
    const legacy = legacyRaw?.trim();
    const name = planName?.trim() || 'N/A';

    if (!native || !legacy) continue;

    console.log(`\nOpening pair ${i + 1}: ${name}`);
    console.log(`  Native: ${native}`);
    console.log(`  Legacy: ${legacy}`);

    try {
      await open(native, browserOptions.chrome);
      await open(legacy, browserOptions.chrome);
    } catch (err) {
      console.error('Error opening browser:', err);
      return;
    }

    if (i < rows.length - 1) {
      readline.question('Press Enter to open the next pair...');
    }
  }

  console.log('\nAll pairs have been opened.');
}

const csvPath = path.join(__dirname, CSV_FILE);
const rows = readCsv(csvPath);
openPairsInNewWindows(rows);
