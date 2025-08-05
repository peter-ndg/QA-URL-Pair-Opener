const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const { default: open, apps } = require('open');
const readline = require('readline-sync');
// NEW: Import the yargs library
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// --- NEW: Setup command-line argument handling ---
const argv = yargs(hideBin(process.argv))
  .option('start', {
    alias: 's',
    type: 'number',
    // CHANGED: Description translated to English
    description: 'The row number (pair) to start from',
    default: 1 // Default is to start from the first line
  })
  .argv;

const CSV_FILE = './Native IFPs and their Legacy Versions - Sheet2.csv';

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

  const selectedBrowser = browserOptions.chrome;

  // --- CHANGED: Use the --start argument to define the starting index ---
  // Subtract 1 because arrays are 0-indexed
  const startFromIndex = argv.start - 1;

  if (startFromIndex < 0 || startFromIndex >= rows.length) {
    // CHANGED: Messages translated to English
    console.error(`❌ Invalid starting row. Please choose a number between 1 and ${rows.length}.`);
    return;
  }
  
  // CHANGED: Messages translated to English
  console.log(`Total URL pairs found: ${rows.length}`);
  if (argv.start > 1) {
    console.log(`▶️  Starting from pair number ${argv.start}.`);
  }

  // --- CHANGED: The loop now starts from the specified index ---
  for (let i = startFromIndex; i < rows.length; i++) {
    const row = rows[i];
    const native = row.websiteUrl?.trim();
    const legacy = row.oldWebsiteUrl?.trim();
    // NEW: Get the planName from the row
    const planName = row.planName?.trim();

    if (native && legacy) {
      // --- CHANGED: Console output is now in English and includes planName ---
      console.log(`\n🔎 Opening pair ${i + 1} of ${rows.length}:`);
      console.log(`   📄 Plan Name: ${planName || 'N/A'}`); // Display planName, or 'N/A' if it's empty
      console.log(`   ➡️  Native: ${native}`);
      console.log(`   ⬅️  Legacy: ${legacy}`);

      try {
        await open(native, selectedBrowser);
        await open(legacy, selectedBrowser);
      } catch (error) {
        // CHANGED: Message translated to English
        console.error('❌ Error trying to open the browser.', error);
        return;
      }
      
      if (i < rows.length - 1) {
        // CHANGED: Message translated to English
        readline.question('Press Enter to open the next pair...');
      }
    }
  }

  // CHANGED: Message translated to English
  console.log('\n✅ All pairs have been opened.');
}

const csvPath = path.join(__dirname, CSV_FILE);
const rows = readCsv(csvPath);
openPairsInNewWindows(rows);