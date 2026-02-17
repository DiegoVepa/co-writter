const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

async function createCarousel() {
  const pptx = new pptxgen();

  // LinkedIn carousel: 1080x1350 (4:5 ratio)
  pptx.defineLayout({ name: 'LINKEDIN', width: 7.5, height: 9.375 });
  pptx.layout = 'LINKEDIN';
  pptx.author = 'Diego Vences';
  pptx.title = 'Claude Extensions in Action';

  // Brand colors (NO # prefix for PptxGenJS)
  const colors = {
    darkBg: '2D2D2D',
    orange: 'E8611A',
    white: 'FFFFFF',
    gray: '6B6B6B'
  };

  const slidesDir = __dirname + '/slides';

  // ============ SLIDE 1: EXCEL ============
  const slide1 = pptx.addSlide();
  slide1.background = { color: colors.darkBg };

  // Orange accent bar at top
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: 7.5, h: 0.15,
    fill: { color: colors.orange }
  });

  // Tool label
  slide1.addText('EXCEL', {
    x: 0.4, y: 0.4, w: 2, h: 0.5,
    fontSize: 24, bold: true, color: colors.orange,
    fontFace: 'Arial'
  });

  // Main headline
  slide1.addText('FROM CHECKBOXES → TO PATTERNS', {
    x: 0.4, y: 0.9, w: 6.7, h: 0.7,
    fontSize: 28, bold: true, color: colors.white,
    fontFace: 'Arial'
  });

  // Screenshot
  slide1.addImage({
    path: slidesDir + '/excel-screenshot.png',
    x: 0.3, y: 1.8, w: 6.9, h: 4.2
  });

  // Explanatory text box
  slide1.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.3, y: 6.2, w: 6.9, h: 2.2,
    fill: { color: '3D3D3D' },
    line: { color: colors.orange, width: 2 },
    rectRadius: 0.1
  });

  slide1.addText([
    { text: '"I used to track habits in rows.\n', options: { fontSize: 16, color: colors.white } },
    { text: 'Now I see what\'s actually working."', options: { fontSize: 16, color: colors.white, italic: true } }
  ], {
    x: 0.5, y: 6.4, w: 6.5, h: 0.8,
    fontFace: 'Arial'
  });

  slide1.addText([
    { text: '→ ', options: { color: colors.orange, bold: true } },
    { text: '87% consistency visible at a glance\n', options: { color: colors.white } },
    { text: '→ ', options: { color: colors.orange, bold: true } },
    { text: 'Claude summarizes structure automatically', options: { color: colors.white } }
  ], {
    x: 0.5, y: 7.3, w: 6.5, h: 0.9,
    fontSize: 14, fontFace: 'Arial'
  });

  // Handle
  slide1.addText('@DiegoVences', {
    x: 0.4, y: 8.7, w: 3, h: 0.4,
    fontSize: 12, color: colors.gray, fontFace: 'Arial'
  });

  // Swipe indicator
  slide1.addText('>>>', {
    x: 6.2, y: 8.7, w: 1, h: 0.4,
    fontSize: 18, bold: true, color: colors.orange, fontFace: 'Arial'
  });

  // ============ SLIDE 2: POWERPOINT ============
  const slide2 = pptx.addSlide();
  slide2.background = { color: colors.darkBg };

  // Orange accent bar at top
  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: 7.5, h: 0.15,
    fill: { color: colors.orange }
  });

  // Tool label
  slide2.addText('POWERPOINT', {
    x: 0.4, y: 0.4, w: 3, h: 0.5,
    fontSize: 24, bold: true, color: colors.orange,
    fontFace: 'Arial'
  });

  // Main headline
  slide2.addText('FROM MANUAL FORMATTING → TO BRAND LOCK', {
    x: 0.4, y: 0.9, w: 6.7, h: 0.7,
    fontSize: 26, bold: true, color: colors.white,
    fontFace: 'Arial'
  });

  // Screenshot
  slide2.addImage({
    path: slidesDir + '/powerpoint-screenshot.png',
    x: 0.3, y: 1.8, w: 6.9, h: 4.2
  });

  // Explanatory text box
  slide2.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.3, y: 6.2, w: 6.9, h: 2.2,
    fill: { color: '3D3D3D' },
    line: { color: colors.orange, width: 2 },
    rectRadius: 0.1
  });

  slide2.addText([
    { text: '"Same colors. Every deck.\n', options: { fontSize: 16, color: colors.white } },
    { text: 'Without thinking about it."', options: { fontSize: 16, color: colors.white, italic: true } }
  ], {
    x: 0.5, y: 6.4, w: 6.5, h: 0.8,
    fontFace: 'Arial'
  });

  slide2.addText([
    { text: '→ ', options: { color: colors.orange, bold: true } },
    { text: 'Design system checklist in sidebar\n', options: { color: colors.white } },
    { text: '→ ', options: { color: colors.orange, bold: true } },
    { text: 'Orange + dark mode applied automatically', options: { color: colors.white } }
  ], {
    x: 0.5, y: 7.3, w: 6.5, h: 0.9,
    fontSize: 14, fontFace: 'Arial'
  });

  // Handle
  slide2.addText('@DiegoVences', {
    x: 0.4, y: 8.7, w: 3, h: 0.4,
    fontSize: 12, color: colors.gray, fontFace: 'Arial'
  });

  // Swipe indicator
  slide2.addText('>>>', {
    x: 6.2, y: 8.7, w: 1, h: 0.4,
    fontSize: 18, bold: true, color: colors.orange, fontFace: 'Arial'
  });

  // ============ SLIDE 3: CHROME (VAPI) ============
  const slide3 = pptx.addSlide();
  slide3.background = { color: colors.darkBg };

  // Orange accent bar at top
  slide3.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: 7.5, h: 0.15,
    fill: { color: colors.orange }
  });

  // Tool label
  slide3.addText('CHROME', {
    x: 0.4, y: 0.4, w: 2, h: 0.5,
    fontSize: 24, bold: true, color: colors.orange,
    fontFace: 'Arial'
  });

  // Main headline
  slide3.addText('FROM STUCK → TO SOLVED', {
    x: 0.4, y: 0.9, w: 6.7, h: 0.7,
    fontSize: 28, bold: true, color: colors.white,
    fontFace: 'Arial'
  });

  // Screenshot
  slide3.addImage({
    path: slidesDir + '/vapi-screenshot.png',
    x: 0.3, y: 1.8, w: 6.9, h: 4.2
  });

  // Explanatory text box
  slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.3, y: 6.2, w: 6.9, h: 2.2,
    fill: { color: '3D3D3D' },
    line: { color: colors.orange, width: 2 },
    rectRadius: 0.1
  });

  slide3.addText([
    { text: '"1 hour debugging.\n', options: { fontSize: 16, color: colors.white } },
    { text: '5 minutes with Claude."', options: { fontSize: 16, color: colors.white, italic: true } }
  ], {
    x: 0.5, y: 6.4, w: 6.5, h: 0.8,
    fontFace: 'Arial'
  });

  slide3.addText([
    { text: '→ ', options: { color: colors.orange, bold: true } },
    { text: 'Walked me through the Vapi AI fix\n', options: { color: colors.white } },
    { text: '→ ', options: { color: colors.orange, bold: true } },
    { text: 'Claude understands what\'s on screen', options: { color: colors.white } }
  ], {
    x: 0.5, y: 7.3, w: 6.5, h: 0.9,
    fontSize: 14, fontFace: 'Arial'
  });

  // Key takeaway box
  slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 1.5, y: 8.5, w: 4.5, h: 0.6,
    fill: { color: colors.orange },
    rectRadius: 0.3
  });

  slide3.addText('Same work. Less friction.', {
    x: 1.5, y: 8.5, w: 4.5, h: 0.6,
    fontSize: 16, bold: true, color: colors.white,
    fontFace: 'Arial', align: 'center', valign: 'middle'
  });

  // Handle (moved up for slide 3)
  slide3.addText('@DiegoVences', {
    x: 5.5, y: 8.5, w: 2, h: 0.4,
    fontSize: 10, color: colors.gray, fontFace: 'Arial', align: 'right'
  });

  // Save
  const outputPath = __dirname + '/carousel-claude-extensions.pptx';
  await pptx.writeFile({ fileName: outputPath });
  console.log('✅ Carousel created:', outputPath);

  return outputPath;
}

createCarousel().catch(console.error);
