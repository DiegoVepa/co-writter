#!/usr/bin/env node
/**
 * validate-metadata.js
 *
 * Validates all metadata.json files in the content-library directory.
 * Checks for:
 * - Missing metadata.json files
 * - Required fields
 * - Valid enum values
 * - Data type correctness
 *
 * Usage: node scripts/validate-metadata.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONTENT_LIBRARY_PATH = path.join(__dirname, '..', 'content-library');

// Valid enum values (must match _comment_schema in template)
const VALID_ENUMS = {
  audience: ['career', 'agency', 'both'],
  theme: ['what-i-built', 'boring-business', 'ai-for-ops'],
  hook_type: ['contrarian', 'what-i-built', 'reframe', 'before-after', 'problem-first', 'counter-intuitive'],
  status: ['draft', 'ready-to-publish', 'published'],
  safety_review: ['passed', 'flagged', 'needs-review']
};

// Required fields
const REQUIRED_FIELDS = [
  'date_created',
  'title',
  'platform',
  'audience',
  'theme',
  'hook_type',
  'status',
  'safety_review'
];

// Results tracking
const results = {
  total: 0,
  valid: 0,
  errors: [],
  warnings: []
};

function isPostDirectory(dirName) {
  // Post directories match pattern: YYYY-MM-DD-slug
  return /^\d{4}-\d{2}-\d{2}-.+$/.test(dirName);
}

function validateMetadata(dirPath, dirName) {
  const metadataPath = path.join(dirPath, 'metadata.json');

  // Check if metadata.json exists
  if (!fs.existsSync(metadataPath)) {
    results.errors.push({
      directory: dirName,
      error: 'Missing metadata.json file'
    });
    return false;
  }

  // Read and parse metadata
  let metadata;
  try {
    const content = fs.readFileSync(metadataPath, 'utf8');
    metadata = JSON.parse(content);
  } catch (err) {
    results.errors.push({
      directory: dirName,
      error: `Invalid JSON: ${err.message}`
    });
    return false;
  }

  let isValid = true;

  // Check required fields
  for (const field of REQUIRED_FIELDS) {
    if (!metadata[field] || metadata[field] === '') {
      results.errors.push({
        directory: dirName,
        error: `Missing required field: ${field}`
      });
      isValid = false;
    }
  }

  // Validate enum values
  for (const [field, validValues] of Object.entries(VALID_ENUMS)) {
    if (metadata[field] && !validValues.includes(metadata[field])) {
      results.errors.push({
        directory: dirName,
        error: `Invalid ${field}: "${metadata[field]}". Valid values: ${validValues.join(', ')}`
      });
      isValid = false;
    }
  }

  // Validate platform is array
  if (metadata.platform && !Array.isArray(metadata.platform)) {
    results.errors.push({
      directory: dirName,
      error: 'platform must be an array'
    });
    isValid = false;
  }

  // Validate date format
  if (metadata.date_created && !/^\d{4}-\d{2}-\d{2}$/.test(metadata.date_created)) {
    results.errors.push({
      directory: dirName,
      error: `Invalid date format: "${metadata.date_created}". Expected: YYYY-MM-DD`
    });
    isValid = false;
  }

  // Check date consistency with folder name
  if (metadata.date_created && !dirName.startsWith(metadata.date_created)) {
    results.warnings.push({
      directory: dirName,
      warning: `Date mismatch: folder "${dirName}" vs metadata date "${metadata.date_created}"`
    });
  }

  // Validate word_count is number or null
  if (metadata.word_count !== null && typeof metadata.word_count !== 'number') {
    results.warnings.push({
      directory: dirName,
      warning: `word_count should be a number, got: ${typeof metadata.word_count}`
    });
  }

  // Check for empty tags
  if (!metadata.tags || metadata.tags.length === 0) {
    results.warnings.push({
      directory: dirName,
      warning: 'No tags specified'
    });
  }

  return isValid;
}

function main() {
  console.log('Content Library Metadata Validator');
  console.log('==================================\n');

  // Get all directories in content-library
  const entries = fs.readdirSync(CONTENT_LIBRARY_PATH, { withFileTypes: true });
  const postDirs = entries.filter(e => e.isDirectory() && isPostDirectory(e.name));

  results.total = postDirs.length;
  console.log(`Found ${results.total} post directories\n`);

  // Validate each directory
  for (const dir of postDirs) {
    const dirPath = path.join(CONTENT_LIBRARY_PATH, dir.name);
    const isValid = validateMetadata(dirPath, dir.name);
    if (isValid) {
      results.valid++;
    }
  }

  // Output results
  console.log('Results');
  console.log('-------');
  console.log(`Total posts: ${results.total}`);
  console.log(`Valid: ${results.valid}`);
  console.log(`Errors: ${results.errors.length}`);
  console.log(`Warnings: ${results.warnings.length}`);

  if (results.errors.length > 0) {
    console.log('\nErrors:');
    for (const err of results.errors) {
      console.log(`  [${err.directory}] ${err.error}`);
    }
  }

  if (results.warnings.length > 0) {
    console.log('\nWarnings:');
    for (const warn of results.warnings) {
      console.log(`  [${warn.directory}] ${warn.warning}`);
    }
  }

  // Exit with error code if there are errors
  if (results.errors.length > 0) {
    console.log('\n Validation failed with errors');
    process.exit(1);
  } else if (results.warnings.length > 0) {
    console.log('\n Validation passed with warnings');
    process.exit(0);
  } else {
    console.log('\n All metadata validated successfully!');
    process.exit(0);
  }
}

main();
