#!/usr/bin/env node
/**
 * create-post.js
 *
 * Scaffolds a new post folder with metadata.json and content file.
 * Ensures consistent structure across all posts.
 *
 * Usage:
 *   node scripts/create-post.js --title "My Post Title" --audience career --theme what-i-built
 *
 * Options:
 *   --title      (required) Title of the post
 *   --audience   (required) Target audience: career | agency | both
 *   --theme      (required) Content theme: what-i-built | boring-business | ai-for-ops
 *   --platform   Platform (default: linkedin)
 *   --hook       Hook type: contrarian | what-i-built | reframe | before-after | problem-first
 *   --date       Date override (default: today, format: YYYY-MM-DD)
 *   --dry-run    Show what would be created without writing
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONTENT_LIBRARY_PATH = path.join(__dirname, '..', 'content-library');

// Valid values
const VALID = {
  audience: ['career', 'agency', 'both'],
  theme: ['what-i-built', 'boring-business', 'ai-for-ops'],
  hook_type: ['contrarian', 'what-i-built', 'reframe', 'before-after', 'problem-first', 'counter-intuitive'],
  platform: ['linkedin', 'twitter', 'substack']
};

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    title: null,
    audience: null,
    theme: null,
    platform: 'linkedin',
    hook: 'contrarian',
    date: new Date().toISOString().split('T')[0],
    dryRun: false
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--title':
        options.title = args[++i];
        break;
      case '--audience':
        options.audience = args[++i];
        break;
      case '--theme':
        options.theme = args[++i];
        break;
      case '--platform':
        options.platform = args[++i];
        break;
      case '--hook':
        options.hook = args[++i];
        break;
      case '--date':
        options.date = args[++i];
        break;
      case '--dry-run':
        options.dryRun = true;
        break;
    }
  }

  return options;
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
}

function validate(options) {
  const errors = [];

  if (!options.title) {
    errors.push('--title is required');
  }
  if (!options.audience) {
    errors.push('--audience is required (career | agency | both)');
  } else if (!VALID.audience.includes(options.audience)) {
    errors.push(`Invalid audience: "${options.audience}". Valid: ${VALID.audience.join(', ')}`);
  }
  if (!options.theme) {
    errors.push('--theme is required (what-i-built | boring-business | ai-for-ops)');
  } else if (!VALID.theme.includes(options.theme)) {
    errors.push(`Invalid theme: "${options.theme}". Valid: ${VALID.theme.join(', ')}`);
  }
  if (!VALID.platform.includes(options.platform)) {
    errors.push(`Invalid platform: "${options.platform}". Valid: ${VALID.platform.join(', ')}`);
  }
  if (!VALID.hook_type.includes(options.hook)) {
    errors.push(`Invalid hook: "${options.hook}". Valid: ${VALID.hook_type.join(', ')}`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(options.date)) {
    errors.push(`Invalid date format: "${options.date}". Expected: YYYY-MM-DD`);
  }

  return errors;
}

function generateMetadata(options) {
  return JSON.stringify({
    date_created: options.date,
    title: options.title,
    platform: [options.platform],
    audience: options.audience,
    theme: options.theme,
    hook_type: options.hook,
    status: "draft",
    published_date: null,
    published_url: null,
    performance: {
      views: null,
      likes: null,
      comments: null,
      shares: null,
      inbound_dms: null,
      notes: ""
    },
    assets: [],
    tags: [],
    safety_review: "needs-review",
    word_count: null,
    language_variants: {
      primary: "en",
      available: ["en"],
      files: {
        en: `${options.platform}-post.md`
      }
    }
  }, null, 2);
}

function generateContentTemplate(options) {
  const platformTitles = {
    linkedin: 'LinkedIn Post',
    twitter: 'X/Twitter Thread',
    substack: 'Substack Essay'
  };

  const audienceDescriptions = {
    career: 'Segment A (Career Pivot - Product/Marketing Hiring Managers)',
    agency: 'Segment B (Agency Build - SMB Owners in Trades)',
    both: 'Both Audiences'
  };

  const themeDescriptions = {
    'what-i-built': 'What I Built - Problem → Build → Results → Lesson',
    'boring-business': 'Boring Business - ROI-focused, plain language, "helping friends" framing',
    'ai-for-ops': 'AI for Ops & GTM - Operational insights, systems thinking'
  };

  return `# ${options.title}

**Date:** ${options.date}
**Theme:** ${themeDescriptions[options.theme]}
**Audience:** ${audienceDescriptions[options.audience]}
**Content Type:** ${platformTitles[options.platform]}
**Status:** Draft

---

## Hook Options

### Option A: ${options.hook.charAt(0).toUpperCase() + options.hook.slice(1)} (Recommended)
\`\`\`
[Your hook here]
\`\`\`

### Option B: Alternative
\`\`\`
[Alternative hook]
\`\`\`

---

## Problem/Setup

[What pain point are you addressing? What's the relatable situation?]

---

## Build/What You Did

[What did you create, discover, or implement?]

---

## Results (Quantified)

[Specific outcomes with numbers]

- Time saved: X hours → Y hours
- Metric improved: X% → Y%
- ROI: $X saved/earned

---

## Lesson/Insight

[What's the transferable insight? The key takeaway?]

---

## Engagement Question

[End with a question that invites discussion]

---

## Visual Asset Ideas

1. [Describe potential visual]
2. [Another visual option]

---

## Full Draft

\`\`\`
[Write your complete post here]
\`\`\`

---

## Safety Review Checklist

- [ ] No mention of clients, agency, or paid work
- [ ] Framed as personal project / helping friends / university work
- [ ] No "DM me" or service offering language
- [ ] Could be explained to employer as skill building

---

**Notes:**
[Any additional context or considerations]
`;
}

function main() {
  console.log('Content Post Scaffolder');
  console.log('=======================\n');

  const options = parseArgs();

  // Show help if no args
  if (process.argv.length <= 2) {
    console.log(`Usage: node scripts/create-post.js --title "My Title" --audience career --theme what-i-built

Options:
  --title      (required) Title of the post
  --audience   (required) Target audience: career | agency | both
  --theme      (required) Content theme: what-i-built | boring-business | ai-for-ops
  --platform   Platform (default: linkedin)
  --hook       Hook type (default: contrarian)
  --date       Date override (default: today, format: YYYY-MM-DD)
  --dry-run    Show what would be created without writing

Example:
  node scripts/create-post.js --title "Building an AI Co-Writer" --audience career --theme what-i-built --hook contrarian
`);
    process.exit(0);
  }

  // Validate
  const errors = validate(options);
  if (errors.length > 0) {
    console.error('Validation errors:');
    errors.forEach(e => console.error(`  - ${e}`));
    process.exit(1);
  }

  // Generate paths
  const slug = slugify(options.title);
  const dirName = `${options.date}-${slug}`;
  const dirPath = path.join(CONTENT_LIBRARY_PATH, dirName);
  const metadataPath = path.join(dirPath, 'metadata.json');
  const contentPath = path.join(dirPath, `${options.platform}-post.md`);
  const assetsPath = path.join(dirPath, 'assets');

  console.log('Configuration:');
  console.log(`  Title:    ${options.title}`);
  console.log(`  Audience: ${options.audience}`);
  console.log(`  Theme:    ${options.theme}`);
  console.log(`  Platform: ${options.platform}`);
  console.log(`  Hook:     ${options.hook}`);
  console.log(`  Date:     ${options.date}`);
  console.log('');

  // Check if directory already exists
  if (fs.existsSync(dirPath)) {
    console.error(`Error: Directory already exists: ${dirName}`);
    process.exit(1);
  }

  // Generate content
  const metadata = generateMetadata(options);
  const content = generateContentTemplate(options);

  console.log('Will create:');
  console.log(`  ${dirPath}/`);
  console.log(`  ${metadataPath}`);
  console.log(`  ${contentPath}`);
  console.log(`  ${assetsPath}/`);
  console.log('');

  if (options.dryRun) {
    console.log('DRY RUN - Would create metadata.json:');
    console.log(metadata);
    console.log('\nDRY RUN - Would create content template (first 50 lines):');
    console.log(content.split('\n').slice(0, 50).join('\n'));
    console.log('...');
  } else {
    // Create directory structure
    fs.mkdirSync(dirPath, { recursive: true });
    fs.mkdirSync(assetsPath, { recursive: true });

    // Write files
    fs.writeFileSync(metadataPath, metadata);
    fs.writeFileSync(contentPath, content);

    console.log('Post scaffolded successfully!');
    console.log('');
    console.log('Next steps:');
    console.log(`  1. Edit content:     ${contentPath}`);
    console.log(`  2. Add visual assets: ${assetsPath}/`);
    console.log(`  3. Validate:          node scripts/validate-metadata.js`);
    console.log(`  4. Update README:     node scripts/generate-readme.js`);
  }
}

main();
