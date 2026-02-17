#!/usr/bin/env node
/**
 * generate-screenshot-carousel.js
 *
 * Creates branded carousel slides from screenshots.
 * Screenshots should be placed in the post's /slides folder.
 *
 * Usage:
 *   node scripts/generate-screenshot-carousel.js --slug hvac-ai-tools
 *
 * Expected structure:
 *   content-library/2026-02-16-hvac-ai-tools/
 *     slides/
 *       01-screenshot.png
 *       02-screenshot.png
 *       03-screenshot.png
 *     screenshots.json (optional - slide metadata)
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
  darkCard: '3D3D3D'
};

/**
 * Generate a screenshot carousel
 */
async function generateScreenshotCarousel(config) {
  const {
    title,
    slides,
    outputPath,
    screenshotsDir
  } = config;

  const pptx = new pptxgen();

  // LinkedIn carousel: 1080x1350 (4:5 ratio)
  pptx.defineLayout({ name: 'LINKEDIN', width: 7.5, height: 9.375 });
  pptx.layout = 'LINKEDIN';
  pptx.author = 'Diego Vences';
  pptx.title = title;

  for (let i = 0; i < slides.length; i++) {
    const slideData = slides[i];
    const slide = pptx.addSlide();
    slide.background = { color: colors.darkBg };

    // Orange accent bar at top
    slide.addShape(pptx.shapes.RECTANGLE, {
      x: 0, y: 0, w: 7.5, h: 0.15,
      fill: { color: colors.orange }
    });

    // Tool/Step label (top left)
    if (slideData.label) {
      slide.addText(slideData.label.toUpperCase(), {
        x: 0.4, y: 0.4, w: 3, h: 0.5,
        fontSize: 18, bold: true, color: colors.orange, fontFace: 'Arial'
      });
    }

    // Handle (top right)
    slide.addText('@DiegoVences', {
      x: 5.3, y: 0.4, w: 2, h: 0.3,
      fontSize: 11, color: colors.gray, fontFace: 'Arial', align: 'right'
    });

    // Main headline with FROM → TO format
    if (slideData.headline) {
      slide.addText(slideData.headline, {
        x: 0.4, y: 0.9, w: 6.7, h: 0.8,
        fontSize: 24, bold: true, color: colors.white, fontFace: 'Arial'
      });
    }

    // Screenshot frame
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.25, y: 1.9, w: 7.0, h: 4.4,
      fill: { type: 'none' },
      line: { color: colors.orange, width: 3 },
      rectRadius: 0.12
    });

    // Screenshot image (if exists)
    const screenshotPath = path.join(screenshotsDir, slideData.image);
    if (fs.existsSync(screenshotPath)) {
      slide.addImage({
        path: screenshotPath,
        x: 0.35, y: 2.0, w: 6.8, h: 4.2
      });
    } else {
      // Placeholder text if no image
      slide.addText('[ Screenshot: ' + slideData.image + ' ]', {
        x: 0.35, y: 3.5, w: 6.8, h: 1,
        fontSize: 16, color: colors.gray, fontFace: 'Arial',
        align: 'center', valign: 'middle'
      });
    }

    // Annotation callouts (if provided)
    if (slideData.annotations && slideData.annotations.length > 0) {
      let annotY = 6.5;
      slideData.annotations.forEach((annotation, idx) => {
        // Number circle
        slide.addShape(pptx.shapes.OVAL, {
          x: 0.4, y: annotY, w: 0.4, h: 0.4,
          fill: { color: colors.orange }
        });
        slide.addText(String(idx + 1), {
          x: 0.4, y: annotY, w: 0.4, h: 0.4,
          fontSize: 14, bold: true, color: colors.white,
          fontFace: 'Arial', align: 'center', valign: 'middle'
        });

        // Annotation text
        slide.addText(annotation, {
          x: 0.95, y: annotY, w: 6.1, h: 0.4,
          fontSize: 14, color: colors.white, fontFace: 'Arial',
          valign: 'middle'
        });

        annotY += 0.5;
      });
    }

    // Explanatory text box (if provided)
    if (slideData.description) {
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 0.3, y: 6.4, w: 6.9, h: 1.8,
        fill: { color: colors.darkCard },
        line: { color: colors.orange, width: 2 },
        rectRadius: 0.1
      });

      slide.addText(slideData.description, {
        x: 0.5, y: 6.6, w: 6.5, h: 1.4,
        fontSize: 14, color: colors.white, fontFace: 'Arial'
      });
    }

    // Key takeaway pill (if provided)
    if (slideData.takeaway) {
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 1.0, y: 8.3, w: 5.5, h: 0.6,
        fill: { color: colors.orange },
        rectRadius: 0.3
      });

      slide.addText(slideData.takeaway, {
        x: 1.0, y: 8.3, w: 5.5, h: 0.6,
        fontSize: 14, bold: true, color: colors.white,
        fontFace: 'Arial', align: 'center', valign: 'middle'
      });
    }

    // Swipe indicator (not on last slide)
    if (i < slides.length - 1) {
      slide.addText('>>>', {
        x: 6.2, y: 8.9, w: 1, h: 0.3,
        fontSize: 18, bold: true, color: colors.orange, fontFace: 'Arial'
      });
    } else {
      // Final slide: show handle
      slide.addText('@DiegoVences', {
        x: 5.5, y: 8.9, w: 1.8, h: 0.3,
        fontSize: 11, color: colors.gray, fontFace: 'Arial', align: 'right'
      });
    }
  }

  await pptx.writeFile({ fileName: outputPath });
  console.log('✅ Screenshot carousel created:', outputPath);
  return outputPath;
}

/**
 * Load slide configuration from screenshots.json or generate from files
 */
function loadSlideConfig(postDir) {
  const configPath = path.join(postDir, 'screenshots.json');
  const slidesDir = path.join(postDir, 'slides');

  // If config exists, use it
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    return {
      ...config,
      screenshotsDir: slidesDir
    };
  }

  // Otherwise, auto-detect from slides folder
  if (!fs.existsSync(slidesDir)) {
    // Create slides folder and return template
    fs.mkdirSync(slidesDir, { recursive: true });

    const templateConfig = {
      title: 'Screenshot Walkthrough',
      slides: [
        {
          label: 'Step 1',
          headline: 'FROM manual → TO automated',
          image: '01-screenshot.png',
          description: 'Add your screenshot to the slides/ folder',
          takeaway: 'Key insight here'
        }
      ]
    };

    // Write template config
    fs.writeFileSync(configPath, JSON.stringify(templateConfig, null, 2));
    console.log('📝 Created template:', configPath);
    console.log('   Add screenshots to:', slidesDir);

    return {
      ...templateConfig,
      screenshotsDir: slidesDir
    };
  }

  // Auto-generate from existing files
  const files = fs.readdirSync(slidesDir)
    .filter(f => /\.(png|jpg|jpeg)$/i.test(f))
    .sort();

  if (files.length === 0) {
    console.log('⚠️  No screenshots found in:', slidesDir);
    console.log('   Add PNG/JPG files to generate carousel');
    process.exit(1);
  }

  const slides = files.map((file, i) => ({
    label: `Step ${i + 1}`,
    headline: `Screenshot ${i + 1}`,
    image: file,
    description: '',
    takeaway: ''
  }));

  return {
    title: 'Screenshot Walkthrough',
    slides,
    screenshotsDir: slidesDir
  };
}

// CLI handling
async function main() {
  const args = process.argv.slice(2);
  const slugIndex = args.indexOf('--slug');

  if (slugIndex === -1 || !args[slugIndex + 1]) {
    console.log('Usage: node scripts/generate-screenshot-carousel.js --slug <post-slug>');
    console.log('');
    console.log('Setup:');
    console.log('  1. Create a /slides folder in your post directory');
    console.log('  2. Add screenshots: 01-screenshot.png, 02-screenshot.png, etc.');
    console.log('  3. Optionally create screenshots.json for custom labels/descriptions');
    console.log('');
    console.log('Example screenshots.json:');
    console.log(JSON.stringify({
      title: 'Tool Walkthrough',
      slides: [{
        label: 'Excel',
        headline: 'FROM checkboxes → TO patterns',
        image: '01-excel.png',
        description: '"I used to track habits in rows. Now I see what\'s working."',
        annotations: ['Pattern recognition', 'Auto-generated insights'],
        takeaway: 'Same data. Better visibility.'
      }]
    }, null, 2));
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

  fs.mkdirSync(picturesDir, { recursive: true });

  const config = loadSlideConfig(postDir);
  config.outputPath = path.join(postDir, 'screenshot-carousel.pptx');

  await generateScreenshotCarousel(config);

  // Copy to pictures-generated
  const destPath = path.join(picturesDir, 'screenshot-carousel.pptx');
  fs.copyFileSync(config.outputPath, destPath);
  console.log('📁 Copied to:', destPath);
}

module.exports = { generateScreenshotCarousel };

if (require.main === module) {
  main().catch(console.error);
}
