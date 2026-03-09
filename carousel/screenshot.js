const { chromium } = require('playwright');
const path = require('path');
const sharp = require('sharp');

async function captureSlides() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1080 });

  const images = [];
  for (let i = 1; i <= 8; i++) {
    const file = path.join(__dirname, 'slides', `slide${i}.html`);
    await page.goto(`file://${file}`);
    await page.waitForTimeout(500);
    const buf = await page.screenshot({ type: 'png' });
    const outFile = path.join(__dirname, `slide${i}.png`);
    await sharp(buf).resize(1080, 1080).toFile(outFile);
    images.push(outFile);
    console.log(`Captured slide ${i}`);
  }

  // Create thumbnail grid (2x4)
  const thumbSize = 540;
  const cols = 4, rows = 2;
  const composites = [];
  for (let idx = 0; idx < 8; idx++) {
    const r = Math.floor(idx / cols);
    const c = idx % cols;
    composites.push({
      input: await sharp(images[idx]).resize(thumbSize, thumbSize).toBuffer(),
      left: c * thumbSize,
      top: r * thumbSize
    });
  }

  await sharp({ create: { width: cols * thumbSize, height: rows * thumbSize, channels: 3, background: { r: 13, g: 13, b: 13 } } })
    .composite(composites)
    .jpeg({ quality: 90 })
    .toFile(path.join(__dirname, 'thumbnails.jpg'));

  console.log('Saved thumbnails.jpg');
  await browser.close();
}

captureSlides().catch(e => { console.error(e); process.exit(1); });
