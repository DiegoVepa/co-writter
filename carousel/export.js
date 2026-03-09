const { chromium } = require('playwright');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

async function exportSlides() {
  const browser = await chromium.launch();
  // Use a viewport that matches the pt-based body dimensions
  // 540pt = 720px at 96dpi (1pt = 1.333px)
  const page = await browser.newPage();
  await page.setViewportSize({ width: 720, height: 720 });

  const outDir = path.join(__dirname, 'export');
  fs.mkdirSync(outDir, { recursive: true });

  const pngBuffers = [];

  for (let i = 1; i <= 8; i++) {
    const file = path.join(__dirname, 'slides', `slide${i}.html`);
    await page.goto(`file://${file}`);
    await page.waitForTimeout(500);
    // Screenshot just the body element to get exact content area
    const buf = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 720, height: 720 } });
    // Upscale to 1080x1080 for LinkedIn
    const pngBuf = await sharp(buf).resize(1080, 1080, { kernel: 'lanczos3' }).png().toBuffer();
    const outFile = path.join(outDir, `slide${i}.png`);
    await sharp(pngBuf).toFile(outFile);
    pngBuffers.push(pngBuf);
    console.log(`Exported slide ${i} PNG`);
  }

  // Create PDF
  const slidesHtml = [];
  for (let i = 1; i <= 8; i++) {
    const file = path.join(outDir, `slide${i}.png`);
    const imgData = fs.readFileSync(file).toString('base64');
    slidesHtml.push(`<div style="width:1080px;height:1080px;page-break-after:always;margin:0;padding:0;"><img src="data:image/png;base64,${imgData}" style="width:1080px;height:1080px;display:block;"></div>`);
  }

  const combinedHtml = `<!DOCTYPE html><html><head><style>@page{size:1080px 1080px;margin:0;}body{margin:0;padding:0;}</style></head><body>${slidesHtml.join('')}</body></html>`;
  const htmlFile = path.join(outDir, 'combined.html');
  fs.writeFileSync(htmlFile, combinedHtml);

  const pdfPage = await browser.newPage();
  await pdfPage.setViewportSize({ width: 1080, height: 1080 });
  await pdfPage.goto(`file://${htmlFile}`);
  await pdfPage.waitForTimeout(500);
  await pdfPage.pdf({
    path: path.join(outDir, 'smb-decision-speed-carousel.pdf'),
    width: '1080px',
    height: '1080px',
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    printBackground: true
  });
  console.log('Exported PDF');

  fs.unlinkSync(htmlFile);
  await browser.close();
  console.log(`\nAll files saved to: ${outDir}`);
}

exportSlides().catch(e => { console.error(e); process.exit(1); });
