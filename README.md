# QA URL Pair Opener

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)


## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or later) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Supported Browser**: Chrome, Firefox, or Microsoft Edge

### System Requirements

| Platform | Minimum Version | Recommended |
|----------|----------------|-------------|
| Node.js  | 14.0.0         | 18.0.0+     |
| npm      | 6.0.0          | 8.0.0+      |
| Memory   | 512MB          | 1GB+        |

## 🔧 Installation & Setup

### 1. Project Setup

```bash
# Clone or create your project directory
mkdir qa-url-opener
cd qa-url-opener

# Initialize if starting fresh
npm init -y
```

### 2. Install Dependencies

```bash
npm install csv-parse@^5.5.6 open@^8.4.2 readline-sync@^1.4.10 yargs@^17.7.2
```

### 3. Verify Installation

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Verify dependencies
npm list
```

### Starting from a Specific Row

You can resume testing from any row in your CSV file using the `--start` (or `-s`) flag. This is particularly useful for:
- **Resuming interrupted sessions** after system crashes or breaks
- **Targeted testing** of specific data ranges
- **Performance optimization** by processing smaller batches

#### Command Syntax

```bash
npm run start -- --start <row_number>
# or using the short flag
npm run start -- -s <row_number>
```

> **Note**: The `--` is required to pass arguments through npm to the underlying script.

#### Examples

```bash
# Start from row 25
npm run start -- --start 25

# Using short flag syntax
npm run start -- -s 25

# Start from the beginning (default behavior)
npm run start
```

#### Interactive Output

When you run the command, you'll see progress information and interactive prompts:

```
Total URL pairs found: 700
▶️  Starting from pair number 25.

🔎 Opening pair 25 of 700:
   📄 Plan Name: My Awesome Plan Name
   ➡️  Native: https://native-url.com/page
   ⬅️  Legacy: https://legacy-url.com/page

Press Enter to open the next pair...
```





Create a CSV file named `ifp_native_vs_legacy_mapping.csv` in your project directory with the following structure:

| Column Name | Description | Required | Example |
|-------------|-------------|----------|---------|
| `planName` | Descriptive name for the plan/page | Yes | "Premium Health Plan" |
| `websiteUrl` | Native/new website URL | Yes | "https://new-site.com/plan-1" |
| `oldWebsiteUrl` | Legacy/old website URL | Yes | "https://old-site.com/plan-1" |

```csv
planName,websiteUrl,oldWebsiteUrl
Premium Health Plan,https://native.site/premium,https://legacy.site/premium
Basic Coverage Plan,https://native.site/basic,https://legacy.site/basic
Family Plan Plus,https://native.site/family,https://legacy.site/family
```


## 🎮 Usage

### Basic Usage

Start from the beginning of your CSV file:

```bash
npm run start
```


#### Start from Specific Row

```bash
# Start from row 25
npm run start -- --start 25

# Using short flag
npm run start -- -s 25
```

#### Command Line Options

| Option | Short | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `--start` | `-s` | number | 1 | Row number to start processing from |

Once running, the script provides these controls:

- **Enter**: Proceed to next URL pair
- **Ctrl+C**: Exit the application
- **Browser Windows**: Manually close when done comparing

### Example Output

```
Total URL pairs found: 150
▶️  Starting from pair number 25.

🔎 Opening pair 25 of 150:
   📄 Plan Name: Premium Health Plan
   ➡️  Native: https://native.site/premium
   ⬅️  Legacy: https://legacy.site/premium

Press Enter to open the next pair...
```

