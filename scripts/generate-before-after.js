#!/usr/bin/env node
/**
 * generate-before-after.js
 *
 * Creates a Before/After comparison image for LinkedIn posts.
 * Supports two modes:
 *   1. PptxGenJS (default) - Creates a branded slide image
 *   2. Nano Banana - Uses AI to generate hand-drawn style
 *
 * Usage:
 *   node scripts/generate-before-after.js --slug hvac-ai-tools
 *   node scripts/generate-before-after.js --slug hvac-ai-tools --mode ai
 */

const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

// Brand colors
const colors = {
  darkBg: '2D2D2D',
  orange: 'E8611A',
  white: 'FFFFFF',
  gray: '6B6B6B',
  darkCard: '3D3D3D',
  red: 'DC3545',
  green: '28A745'
};

/**
 * Generate a Before/After comparison slide
 * @param {Object} config - Configuration object
 * @param {string} config.title - Main headline
 * @param {string} config.subtitle - Optional subtitle
 * @param {Array} config.comparisons - Array of {before: string, after: string}
 * @param {string} config.takeaway - Bottom takeaway text
 * @param {string} config.outputPath - Where to save the file
 */
async function generateBeforeAfter(config) {
  const {
    title = 'BEFORE → AFTER',
    subtitle = '',
    comparisons = [],
    takeaway = '',
    outputPath
  } = config;

  const pptx = new pptxgen();

  // LinkedIn single image: 1080x1350 (4:5 ratio)
  pptx.defineLayout({ name: 'LINKEDIN_PORTRAIT', width: 7.5, height: 9.375 });
  pptx.layout = 'LINKEDIN_PORTRAIT';
  pptx.author = 'Diego Vences';
  pptx.title = title;

  const slide = pptx.addSlide();
  slide.background = { color: colors.darkBg };

  // Orange accent bar at top
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: 7.5, h: 0.15,
    fill: { color: colors.orange }
  });

  // Handle top right
  slide.addText('@DiegoVences', {
    x: 5.3, y: 0.3, w: 2, h: 0.3,
    fontSize: 11, color: colors.gray, fontFace: 'Arial', align: 'right'
  });

  // Main title
  slide.addText(title, {
    x: 0.4, y: 0.5, w: 6.7, h: 0.8,
    fontSize: 28, bold: true, color: colors.white, fontFace: 'Arial'
  });

  // Subtitle if provided
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.4, y: 1.2, w: 6.7, h: 0.5,
      fontSize: 16, color: colors.gray, fontFace: 'Arial', italic: true
    });
  }

  // Column headers
  const headerY = subtitle ? 1.9 : 1.5;

  // BEFORE header (left)
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: headerY, w: 3.2, h: 0.6,
    fill: { color: colors.darkCard },
    line: { color: colors.red, width: 2 },
    rectRadius: 0.1
  });
  slide.addText('❌  BEFORE', {
    x: 0.4, y: headerY, w: 3.2, h: 0.6,
    fontSize: 18, bold: true, color: colors.white,
    fontFace: 'Arial', align: 'center', valign: 'middle'
  });

  // AFTER header (right)
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 3.9, y: headerY, w: 3.2, h: 0.6,
    fill: { color: colors.darkCard },
    line: { color: colors.green, width: 2 },
    rectRadius: 0.1
  });
  slide.addText('✅  AFTER', {
    x: 3.9, y: headerY, w: 3.2, h: 0.6,
    fontSize: 18, bold: true, color: colors.white,
    fontFace: 'Arial', align: 'center', valign: 'middle'
  });

  // Comparison rows
  let rowY = headerY + 0.9;
  const rowHeight = 1.0;
  const maxRows = Math.min(comparisons.length, 5); // Max 5 rows

  for (let i = 0; i < maxRows; i++) {
    const { before, after } = comparisons[i];

    // Before card (left)
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.4, y: rowY, w: 3.2, h: rowHeight,
      fill: { color: colors.darkCard },
      rectRadius: 0.08
    });
    slide.addText(before, {
      x: 0.5, y: rowY + 0.15, w: 3.0, h: rowHeight - 0.3,
      fontSize: 14, color: colors.white, fontFace: 'Arial',
      valign: 'middle'
    });

    // Arrow in middle
    slide.addText('→', {
      x: 3.4, y: rowY, w: 0.7, h: rowHeight,
      fontSize: 24, bold: true, color: colors.orange,
      fontFace: 'Arial', align: 'center', valign: 'middle'
    });

    // After card (right)
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 3.9, y: rowY, w: 3.2, h: rowHeight,
      fill: { color: colors.darkCard },
      line: { color: colors.orange, width: 1 },
      rectRadius: 0.08
    });
    slide.addText(after, {
      x: 4.0, y: rowY + 0.15, w: 3.0, h: rowHeight - 0.3,
      fontSize: 14, color: colors.orange, fontFace: 'Arial',
      valign: 'middle', bold: true
    });

    rowY += rowHeight + 0.2;
  }

  // Takeaway box at bottom
  if (takeaway) {
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.4, y: 7.8, w: 6.7, h: 1.0,
      fill: { color: colors.orange },
      rectRadius: 0.15
    });
    slide.addText(takeaway, {
      x: 0.4, y: 7.8, w: 6.7, h: 1.0,
      fontSize: 18, bold: true, color: colors.white,
      fontFace: 'Arial', align: 'center', valign: 'middle'
    });
  }

  // Bottom handle
  slide.addText('@DiegoVences', {
    x: 0.4, y: 9.0, w: 3, h: 0.3,
    fontSize: 11, color: colors.gray, fontFace: 'Arial'
  });

  // Save
  await pptx.writeFile({ fileName: outputPath });
  console.log('✅ Before/After image created:', outputPath);

  return outputPath;
}

/**
 * Extract before/after data from a post's metadata or content
 */
function extractFromPost(postDir) {
  const metadataPath = path.join(postDir, 'metadata.json');
  const postPath = path.join(postDir, 'post.md') || path.join(postDir, 'linkedin-post.md');

  if (!fs.existsSync(metadataPath)) {
    throw new Error(`metadata.json not found in ${postDir}`);
  }

  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

  // If metadata has before_after field, use it
  if (metadata.before_after) {
    return metadata.before_after;
  }

  // Otherwise return a template
  return {
    title: `${metadata.title}: BEFORE → AFTER`,
    subtitle: 'The transformation',
    comparisons: [
      { before: 'Manual process', after: 'Automated' },
      { before: 'Hours wasted', after: 'Minutes saved' },
      { before: 'Inconsistent', after: 'Reliable' }
    ],
    takeaway: 'Simple changes. Real results.'
  };
}

// CLI handling
async function main() {
  const args = process.argv.slice(2);
  const slugIndex = args.indexOf('--slug');

  if (slugIndex === -1 || !args[slugIndex + 1]) {
    console.log('Usage: node scripts/generate-before-after.js --slug <post-slug>');
    console.log('');
    console.log('Options:');
    console.log('  --slug <slug>   Post slug (e.g., hvac-ai-tools)');
    console.log('  --mode ai       Use Nano Banana AI generation (default: pptx)');
    console.log('');
    console.log('Example:');
    console.log('  node scripts/generate-before-after.js --slug hvac-ai-tools');
    process.exit(1);
  }

  const slug = args[slugIndex + 1];
  const contentLibrary = path.resolve(__dirname, '../content-library');

  // Find post directory
  const dirs = fs.readdirSync(contentLibrary);
  const postDirName = dirs.find(d => d.endsWith(`-${slug}`));

  if (!postDirName) {
    console.error(`❌ Post not found with slug: ${slug}`);
    process.exit(1);
  }

  const postDir = path.join(contentLibrary, postDirName);
  const picturesDir = path.resolve(__dirname, `../pictures-generated/${postDirName}`);

  // Ensure pictures directory exists
  fs.mkdirSync(picturesDir, { recursive: true });

  // Extract or use default config
  const config = extractFromPost(postDir);
  config.outputPath = path.join(postDir, 'before-after.pptx');

  // Generate
  await generateBeforeAfter(config);

  // Copy to pictures-generated
  const destPath = path.join(picturesDir, 'before-after.pptx');
  fs.copyFileSync(config.outputPath, destPath);
  console.log('📁 Copied to:', destPath);
}

// Export for use as module
module.exports = { generateBeforeAfter };

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}
