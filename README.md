# QA URL Pair Opener

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A robust Node.js utility designed to streamline Quality Assurance (QA) testing by systematically opening pairs of "legacy" and "native" URLs from CSV data. This tool enables efficient side-by-side comparison of old and new web implementations through automated browser window management.

## 🚀 Features

- **📊 CSV Data Processing**: Reads URL pairs from local CSV files with robust parsing
- **🌐 Multi-Browser Support**: Opens URLs in separate browser windows (Chrome, Firefox, Edge)
- **📋 Plan Context Display**: Shows plan names and metadata for better testing context
- **⏯️ Interactive Control**: User-controlled progression through URL pairs
- **🎯 Flexible Starting Point**: Begin testing from any specified row in the dataset
- **🛡️ Error Handling**: Comprehensive error detection and graceful failure handling
- **📈 Progress Tracking**: Real-time progress indicators and completion status

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

#### Error Handling & Edge Cases

The script includes robust validation:

- **Invalid row numbers**: Automatically validates range (1 to total rows)
- **Out-of-bounds values**: Displays helpful error messages with valid range
- **Non-numeric input**: Gracefully handles invalid input types
- **Empty CSV files**: Prevents execution with appropriate warnings

```bash
# Example error output for invalid row
❌ Invalid starting row. Please choose a number between 1 and 700.
```

#### Performance Considerations

- **Memory efficiency**: Starting from later rows reduces initial memory load
- **Browser resource management**: Fewer total windows opened when resuming
- **CSV parsing optimization**: Full file is still parsed, but processing is optimized
- **Interrupt handling**: Use `Ctrl+C` to safely exit at any time

### 4. Project Structure

```
qa-url-opener/
├── openUrlsInBatches.js          # Main script
├── package.json                  # Project configuration
├── package-lock.json             # Dependency lock file
├── ifp_native_vs_legacy_mapping.csv  # URL data (create this)
└── README.md                     # This file
```

## 📁 Data Preparation

### CSV File Requirements

Create a CSV file named `ifp_native_vs_legacy_mapping.csv` in your project directory with the following structure:

| Column Name | Description | Required | Example |
|-------------|-------------|----------|---------|
| `planName` | Descriptive name for the plan/page | Yes | "Premium Health Plan" |
| `websiteUrl` | Native/new website URL | Yes | "https://new-site.com/plan-1" |
| `oldWebsiteUrl` | Legacy/old website URL | Yes | "https://old-site.com/plan-1" |

### Example CSV Content

```csv
planName,websiteUrl,oldWebsiteUrl
Premium Health Plan,https://native.site/premium,https://legacy.site/premium
Basic Coverage Plan,https://native.site/basic,https://legacy.site/basic
Family Plan Plus,https://native.site/family,https://legacy.site/family
```

### Data Validation

The script automatically validates:
- ✅ CSV file existence and readability
- ✅ Required column presence
- ✅ URL format validation
- ✅ Empty row handling

## 🎮 Usage

### Basic Usage

Start from the beginning of your CSV file:

```bash
npm run startQA
```

### Advanced Usage

#### Start from Specific Row

```bash
# Start from row 25
npm run startQA -- --start 25

# Using short flag
npm run startQA -- -s 25
```

#### Command Line Options

| Option | Short | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `--start` | `-s` | number | 1 | Row number to start processing from |

### Interactive Controls

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

## ⚙️ Configuration

### Browser Selection

The script defaults to Chrome but can be configured for other browsers:

```javascript
// In openUrlsInBatches.js, modify the selectedBrowser variable:
const selectedBrowser = browserOptions.firefox; // or .edge
```

### CSV File Path

To use a different CSV file:

```javascript
// Modify the CSV_FILE constant:
const CSV_FILE = './your-custom-file.csv';
```

## 🚨 Error Handling & Troubleshooting

### Common Issues

#### CSV File Not Found
```
❌ Error: ENOENT: no such file or directory
```
**Solution**: Ensure `ifp_native_vs_legacy_mapping.csv` exists in the project directory.

#### Invalid Starting Row
```
❌ Invalid starting row. Please choose a number between 1 and 150.
```
**Solution**: Use a valid row number within your CSV range.

#### Browser Launch Failure
```
❌ Error trying to open the browser.
```
**Solutions**:
- Ensure your default browser is installed
- Try a different browser configuration
- Check system permissions

#### Memory Issues
```
JavaScript heap out of memory
```
**Solutions**:
- Process smaller CSV files
- Increase Node.js memory: `node --max-old-space-size=4096 openUrlsInBatches.js`

### Debug Mode

For detailed logging, modify the script to include debug information:

```javascript
// Add at the top of openUrlsInBatches.js
const DEBUG = process.env.DEBUG === 'true';

// Use throughout the script
if (DEBUG) console.log('Debug info:', data);
```

Run with debug mode:
```bash
DEBUG=true npm run startQA
```

## 🔧 Performance Optimization

### Best Practices

1. **CSV Size Management**
   - Keep CSV files under 10MB for optimal performance
   - Use streaming for larger datasets

2. **Memory Usage**
   - Close browser windows when done with comparisons
   - Process in smaller batches for large datasets

3. **Browser Performance**
   - Limit concurrent browser windows (recommended: 2-4)
   - Close unused tabs regularly

### Performance Monitoring

Monitor resource usage:

```bash
# Check memory usage
node --trace-warnings openUrlsInBatches.js

# Profile performance
node --prof openUrlsInBatches.js
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] CSV file loads correctly
- [ ] URLs open in separate windows
- [ ] Plan names display accurately
- [ ] Starting row parameter works
- [ ] Error handling functions properly
- [ ] Progress tracking is accurate

### Automated Testing

Create a test CSV file:

```bash
# Create test data
echo "planName,websiteUrl,oldWebsiteUrl" > test.csv
echo "Test Plan,https://example.com,https://example.org" >> test.csv

# Test with small dataset
CSV_FILE=./test.csv npm run startQA
```

## 🤝 Contributing

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Style

- Use consistent indentation (2 spaces)
- Add comments for complex logic
- Follow Node.js best practices
- Include error handling

### Reporting Issues

When reporting bugs, include:
- Node.js version
- Operating system
- CSV file structure (anonymized)
- Error messages
- Steps to reproduce

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [CSV Parse Library](https://csv.js.org/parse/)
- [Open Library](https://github.com/sindresorhus/open)
- [Yargs Documentation](https://yargs.js.org/)

## 📞 Support

For support and questions:
- Create an issue in the project repository
- Check the troubleshooting section above
- Review the [Node.js community resources](https://nodejs.org/en/get-involved/)

---

**Made with ❤️ for QA teams everywhere**
