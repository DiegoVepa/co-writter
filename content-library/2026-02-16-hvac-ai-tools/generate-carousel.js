const pptxgen = require('pptxgenjs');
const path = require('path');

async function createCarousel() {
  const pptx = new pptxgen();

  // LinkedIn carousel: 1080x1350 (4:5 ratio)
  pptx.defineLayout({ name: 'LINKEDIN', width: 7.5, height: 9.375 });
  pptx.layout = 'LINKEDIN';
  pptx.author = 'Diego Vences';
  pptx.title = '5 AI Tools HVAC Contractors Are Using';

  // Brand colors (NO # prefix for PptxGenJS)
  const colors = {
    darkBg: '2D2D2D',
    orange: 'E8611A',
    white: 'FFFFFF',
    gray: '6B6B6B',
    darkCard: '3D3D3D'
  };

  const photosDir = path.resolve(__dirname, '../../assets/photos');

  // ============ SLIDE 1: TITLE ============
  const slide1 = pptx.addSlide();
  slide1.background = { color: colors.darkBg };

  // Orange accent bar at top
  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: 7.5, h: 0.15,
    fill: { color: colors.orange }
  });

  // Decorative stars (orange dots)
  slide1.addText('✦ ✦ ✦', {
    x: 0.3, y: 0.3, w: 1.5, h: 0.4,
    fontSize: 14, color: colors.orange, fontFace: 'Arial'
  });

  // Handle top right
  slide1.addText('@DiegoVences', {
    x: 5.5, y: 0.3, w: 1.8, h: 0.3,
    fontSize: 11, color: colors.gray, fontFace: 'Arial', align: 'right'
  });

  // Main headline
  slide1.addText([
    { text: '5 AI TOOLS ', options: { color: colors.white, bold: true } },
    { text: 'HVAC', options: { color: colors.orange, bold: true } },
    { text: '\nCONTRACTORS ARE USING', options: { color: colors.white, bold: true } },
    { text: '\nTO SAVE ', options: { color: colors.white, bold: true } },
    { text: '10+ HOURS/WEEK', options: { color: colors.orange, bold: true } }
  ], {
    x: 0.4, y: 1.0, w: 6.7, h: 2.0,
    fontSize: 32, fontFace: 'Arial', lineSpacing: 42
  });

  // Subtitle
  slide1.addText('The best AI opportunities are in businesses nobody talks about.', {
    x: 0.4, y: 3.2, w: 6.5, h: 0.6,
    fontSize: 16, color: colors.gray, fontFace: 'Arial', italic: true
  });

  // Key stats box
  slide1.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 4.0, w: 6.7, h: 3.0,
    fill: { color: colors.orange },
    rectRadius: 0.15
  });

  slide1.addText([
    { text: 'WHAT\'S INSIDE:\n\n', options: { fontSize: 18, bold: true } },
    { text: '→ 5 tools saving real time & money\n', options: { fontSize: 15 } },
    { text: '→ Exact costs and setup times\n', options: { fontSize: 15 } },
    { text: '→ ROI that shows up in week one', options: { fontSize: 15 } }
  ], {
    x: 0.6, y: 4.2, w: 6.3, h: 2.6,
    color: colors.white, fontFace: 'Arial', valign: 'top'
  });

  // Diego photo (if available)
  try {
    slide1.addImage({
      path: photosDir + '/diego-cutout.jpg',
      x: 5.0, y: 7.2, w: 2.3, h: 2.0
    });
  } catch (e) {
    console.log('Photo not found, skipping...');
  }

  // Bottom handle
  slide1.addText('@DiegoVences', {
    x: 0.4, y: 8.9, w: 3, h: 0.3,
    fontSize: 11, color: colors.gray, fontFace: 'Arial'
  });

  // Swipe indicator
  slide1.addText('>>>', {
    x: 6.2, y: 8.9, w: 1, h: 0.3,
    fontSize: 18, bold: true, color: colors.orange, fontFace: 'Arial'
  });

  // ============ SLIDE 2: THE PROBLEM ============
  const slide2 = pptx.addSlide();
  slide2.background = { color: colors.darkBg };

  // Orange border
  slide2.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.2, y: 0.2, w: 7.1, h: 8.95,
    fill: { type: 'none' },
    line: { color: colors.orange, width: 2 },
    rectRadius: 0.15
  });

  // Headline
  slide2.addText([
    { text: 'Most HVAC businesses are\n', options: { color: colors.white, bold: true } },
    { text: 'DROWNING', options: { color: colors.orange, bold: true } },
    { text: ' in manual work', options: { color: colors.white, bold: true } }
  ], {
    x: 0.5, y: 0.6, w: 6.5, h: 1.2,
    fontSize: 28, fontFace: 'Arial'
  });

  // Problem list
  const problems = [
    { icon: '📞', text: 'Missed calls while on the job' },
    { icon: '🚫', text: 'No-shows eating into revenue' },
    { icon: '💸', text: 'Chasing unpaid invoices weekly' },
    { icon: '🔁', text: 'Phone tag with customers' }
  ];

  let yPos = 2.2;
  problems.forEach((problem) => {
    slide2.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: yPos, w: 6.5, h: 1.1,
      fill: { color: colors.darkCard },
      line: { color: colors.orange, width: 1 },
      rectRadius: 0.1
    });

    slide2.addText(problem.icon + '  ' + problem.text, {
      x: 0.7, y: yPos + 0.25, w: 6.1, h: 0.6,
      fontSize: 18, color: colors.white, fontFace: 'Arial', valign: 'middle'
    });

    yPos += 1.3;
  });

  // Takeaway pill
  slide2.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 1.5, y: 7.8, w: 4.5, h: 0.7,
    fill: { color: colors.orange },
    rectRadius: 0.35
  });

  slide2.addText('ROI sitting on the table.', {
    x: 1.5, y: 7.8, w: 4.5, h: 0.7,
    fontSize: 18, bold: true, color: colors.white,
    fontFace: 'Arial', align: 'center', valign: 'middle'
  });

  // Swipe indicator
  slide2.addText('>>>', {
    x: 6.2, y: 8.7, w: 1, h: 0.3,
    fontSize: 18, bold: true, color: colors.orange, fontFace: 'Arial'
  });

  // ============ SLIDE 3: TOOL #1 - 24/7 VIRTUAL AGENT ============
  const slide3 = pptx.addSlide();
  slide3.background = { color: colors.darkBg };

  // Orange border
  slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.2, y: 0.2, w: 7.1, h: 8.95,
    fill: { type: 'none' },
    line: { color: colors.orange, width: 2 },
    rectRadius: 0.15
  });

  // Tool number
  slide3.addText('TOOL #1', {
    x: 0.5, y: 0.5, w: 2, h: 0.5,
    fontSize: 16, bold: true, color: colors.orange, fontFace: 'Arial'
  });

  // Headline
  slide3.addText([
    { text: '24/7 Virtual Agent\n', options: { color: colors.white, bold: true, fontSize: 28 } },
    { text: 'Never miss a ', options: { color: colors.gray, fontSize: 18 } },
    { text: 'LEAD', options: { color: colors.orange, bold: true, fontSize: 18 } },
    { text: ' again', options: { color: colors.gray, fontSize: 18 } }
  ], {
    x: 0.5, y: 1.1, w: 6.5, h: 1.4,
    fontFace: 'Arial'
  });

  // Features box
  slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 2.8, w: 6.5, h: 3.0,
    fill: { color: colors.darkCard },
    line: { color: colors.orange, width: 1 },
    rectRadius: 0.1
  });

  slide3.addText([
    { text: 'What it does:\n\n', options: { bold: true, fontSize: 16 } },
    { text: '→ ', options: { color: colors.orange } },
    { text: 'Takes calls/texts at 3am\n', options: {} },
    { text: '→ ', options: { color: colors.orange } },
    { text: 'Books appointments automatically\n', options: {} },
    { text: '→ ', options: { color: colors.orange } },
    { text: 'Answers FAQs (pricing, availability)', options: {} }
  ], {
    x: 0.7, y: 3.0, w: 6.1, h: 2.6,
    fontSize: 16, color: colors.white, fontFace: 'Arial'
  });

  // Stats
  slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 6.2, w: 3.0, h: 1.5,
    fill: { color: colors.orange },
    rectRadius: 0.1
  });

  slide3.addText([
    { text: 'COST\n', options: { fontSize: 12 } },
    { text: '$50-150', options: { fontSize: 28, bold: true } },
    { text: '/month', options: { fontSize: 14 } }
  ], {
    x: 0.5, y: 6.3, w: 3.0, h: 1.4,
    color: colors.white, fontFace: 'Arial', align: 'center', valign: 'middle'
  });

  slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 4.0, y: 6.2, w: 3.0, h: 1.5,
    fill: { color: colors.darkCard },
    line: { color: colors.orange, width: 1 },
    rectRadius: 0.1
  });

  slide3.addText([
    { text: 'ROI\n', options: { fontSize: 12, color: colors.orange } },
    { text: '20-30%', options: { fontSize: 28, bold: true, color: colors.orange } },
    { text: '\nmore leads captured', options: { fontSize: 12, color: colors.gray } }
  ], {
    x: 4.0, y: 6.3, w: 3.0, h: 1.4,
    color: colors.white, fontFace: 'Arial', align: 'center', valign: 'middle'
  });

  // Swipe
  slide3.addText('>>>', {
    x: 6.2, y: 8.7, w: 1, h: 0.3,
    fontSize: 18, bold: true, color: colors.orange, fontFace: 'Arial'
  });

  // ============ SLIDE 4: TOOL #2 - SCHEDULING ============
  const slide4 = pptx.addSlide();
  slide4.background = { color: colors.darkBg };

  slide4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.2, y: 0.2, w: 7.1, h: 8.95,
    fill: { type: 'none' },
    line: { color: colors.orange, width: 2 },
    rectRadius: 0.15
  });

  slide4.addText('TOOL #2', {
    x: 0.5, y: 0.5, w: 2, h: 0.5,
    fontSize: 16, bold: true, color: colors.orange, fontFace: 'Arial'
  });

  slide4.addText([
    { text: 'Smart Scheduling & Dispatch\n', options: { color: colors.white, bold: true, fontSize: 26 } },
    { text: 'Stop the ', options: { color: colors.gray, fontSize: 18 } },
    { text: 'SCHEDULING', options: { color: colors.orange, bold: true, fontSize: 18 } },
    { text: ' chaos', options: { color: colors.gray, fontSize: 18 } }
  ], {
    x: 0.5, y: 1.1, w: 6.5, h: 1.4,
    fontFace: 'Arial'
  });

  slide4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 2.8, w: 6.5, h: 2.6,
    fill: { color: colors.darkCard },
    line: { color: colors.orange, width: 1 },
    rectRadius: 0.1
  });

  slide4.addText([
    { text: 'What it does:\n\n', options: { bold: true, fontSize: 16 } },
    { text: '→ ', options: { color: colors.orange } },
    { text: 'Auto-builds daily routes\n', options: {} },
    { text: '→ ', options: { color: colors.orange } },
    { text: 'Optimizes technician assignments\n', options: {} },
    { text: '→ ', options: { color: colors.orange } },
    { text: 'Reshuffles when jobs cancel', options: {} }
  ], {
    x: 0.7, y: 3.0, w: 6.1, h: 2.4,
    fontSize: 16, color: colors.white, fontFace: 'Arial'
  });

  // Tools mentioned
  slide4.addText('Tools: ServiceTitan Atlas, Quantra, Housecall Pro', {
    x: 0.5, y: 5.6, w: 6.5, h: 0.5,
    fontSize: 13, color: colors.gray, fontFace: 'Arial', italic: true
  });

  // Time saved pill
  slide4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 1.5, y: 6.5, w: 4.5, h: 1.2,
    fill: { color: colors.orange },
    rectRadius: 0.15
  });

  slide4.addText([
    { text: '4-6 HOURS/WEEK\n', options: { fontSize: 26, bold: true } },
    { text: 'back in your schedule', options: { fontSize: 14 } }
  ], {
    x: 1.5, y: 6.5, w: 4.5, h: 1.2,
    color: colors.white, fontFace: 'Arial', align: 'center', valign: 'middle'
  });

  slide4.addText('>>>', {
    x: 6.2, y: 8.7, w: 1, h: 0.3,
    fontSize: 18, bold: true, color: colors.orange, fontFace: 'Arial'
  });

  // ============ SLIDE 5: TOOL #3 - APPOINTMENT REMINDERS ============
  const slide5 = pptx.addSlide();
  slide5.background = { color: colors.darkBg };

  slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.2, y: 0.2, w: 7.1, h: 8.95,
    fill: { type: 'none' },
    line: { color: colors.orange, width: 2 },
    rectRadius: 0.15
  });

  slide5.addText('TOOL #3', {
    x: 0.5, y: 0.5, w: 2, h: 0.5,
    fontSize: 16, bold: true, color: colors.orange, fontFace: 'Arial'
  });

  slide5.addText([
    { text: 'Appointment Reminders\n', options: { color: colors.white, bold: true, fontSize: 28 } },
    { text: 'Cut ', options: { color: colors.gray, fontSize: 18 } },
    { text: 'NO-SHOWS', options: { color: colors.orange, bold: true, fontSize: 18 } },
    { text: ' by 60%', options: { color: colors.gray, fontSize: 18 } }
  ], {
    x: 0.5, y: 1.1, w: 6.5, h: 1.4,
    fontFace: 'Arial'
  });

  slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 2.8, w: 6.5, h: 2.6,
    fill: { color: colors.darkCard },
    line: { color: colors.orange, width: 1 },
    rectRadius: 0.1
  });

  slide5.addText([
    { text: 'How it works:\n\n', options: { bold: true, fontSize: 16 } },
    { text: '→ ', options: { color: colors.orange } },
    { text: 'Automated text 24hrs before\n', options: {} },
    { text: '→ ', options: { color: colors.orange } },
    { text: 'Second text 2hrs before\n', options: {} },
    { text: '→ ', options: { color: colors.orange } },
    { text: 'Flags non-confirmations', options: {} }
  ], {
    x: 0.7, y: 3.0, w: 6.1, h: 2.4,
    fontSize: 16, color: colors.white, fontFace: 'Arial'
  });

  // Stats boxes
  slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 5.8, w: 3.0, h: 1.4,
    fill: { color: colors.orange },
    rectRadius: 0.1
  });

  slide5.addText([
    { text: 'COST\n', options: { fontSize: 12 } },
    { text: '~$15', options: { fontSize: 28, bold: true } },
    { text: '/month', options: { fontSize: 14 } }
  ], {
    x: 0.5, y: 5.9, w: 3.0, h: 1.3,
    color: colors.white, fontFace: 'Arial', align: 'center', valign: 'middle'
  });

  slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 4.0, y: 5.8, w: 3.0, h: 1.4,
    fill: { color: colors.darkCard },
    line: { color: colors.orange, width: 1 },
    rectRadius: 0.1
  });

  slide5.addText([
    { text: 'SETUP\n', options: { fontSize: 12, color: colors.orange } },
    { text: '45 min', options: { fontSize: 28, bold: true, color: colors.orange } }
  ], {
    x: 4.0, y: 5.9, w: 3.0, h: 1.3,
    color: colors.white, fontFace: 'Arial', align: 'center', valign: 'middle'
  });

  // Result callout
  slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 1.0, y: 7.5, w: 5.5, h: 0.8,
    fill: { color: colors.darkCard },
    line: { color: colors.orange, width: 2 },
    rectRadius: 0.1
  });

  slide5.addText('Result: Save $2K+/month in wasted trips', {
    x: 1.0, y: 7.5, w: 5.5, h: 0.8,
    fontSize: 15, bold: true, color: colors.white,
    fontFace: 'Arial', align: 'center', valign: 'middle'
  });

  slide5.addText('>>>', {
    x: 6.2, y: 8.7, w: 1, h: 0.3,
    fontSize: 18, bold: true, color: colors.orange, fontFace: 'Arial'
  });

  // ============ SLIDE 6: TOOL #4 - QUOTE & INVOICE ============
  const slide6 = pptx.addSlide();
  slide6.background = { color: colors.darkBg };

  slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.2, y: 0.2, w: 7.1, h: 8.95,
    fill: { type: 'none' },
    line: { color: colors.orange, width: 2 },
    rectRadius: 0.15
  });

  slide6.addText('TOOL #4', {
    x: 0.5, y: 0.5, w: 2, h: 0.5,
    fontSize: 16, bold: true, color: colors.orange, fontFace: 'Arial'
  });

  slide6.addText([
    { text: 'Quote & Invoice Follow-ups\n', options: { color: colors.white, bold: true, fontSize: 26 } },
    { text: 'Stop ', options: { color: colors.gray, fontSize: 18 } },
    { text: 'CHASING', options: { color: colors.orange, bold: true, fontSize: 18 } },
    { text: ' payments', options: { color: colors.gray, fontSize: 18 } }
  ], {
    x: 0.5, y: 1.1, w: 6.5, h: 1.4,
    fontFace: 'Arial'
  });

  slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 2.8, w: 6.5, h: 2.8,
    fill: { color: colors.darkCard },
    line: { color: colors.orange, width: 1 },
    rectRadius: 0.1
  });

  slide6.addText([
    { text: 'What it does:\n\n', options: { bold: true, fontSize: 16 } },
    { text: '→ ', options: { color: colors.orange } },
    { text: 'Auto-reminder at 3, 7, 14 days\n', options: {} },
    { text: '→ ', options: { color: colors.orange } },
    { text: 'Quote follow-ups before they go cold\n', options: {} },
    { text: '→ ', options: { color: colors.orange } },
    { text: 'Late payment escalation', options: {} }
  ], {
    x: 0.7, y: 3.0, w: 6.1, h: 2.6,
    fontSize: 16, color: colors.white, fontFace: 'Arial'
  });

  // Revenue pill
  slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 1.0, y: 6.0, w: 5.5, h: 1.5,
    fill: { color: colors.orange },
    rectRadius: 0.15
  });

  slide6.addText([
    { text: 'REVENUE RECOVERED\n', options: { fontSize: 14 } },
    { text: '$2K+', options: { fontSize: 36, bold: true } },
    { text: '/month', options: { fontSize: 16 } }
  ], {
    x: 1.0, y: 6.0, w: 5.5, h: 1.5,
    color: colors.white, fontFace: 'Arial', align: 'center', valign: 'middle'
  });

  slide6.addText('>>>', {
    x: 6.2, y: 8.7, w: 1, h: 0.3,
    fontSize: 18, bold: true, color: colors.orange, fontFace: 'Arial'
  });

  // ============ SLIDE 7: TOOL #5 - AI DIAGNOSTICS ============
  const slide7 = pptx.addSlide();
  slide7.background = { color: colors.darkBg };

  slide7.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.2, y: 0.2, w: 7.1, h: 8.95,
    fill: { type: 'none' },
    line: { color: colors.orange, width: 2 },
    rectRadius: 0.15
  });

  slide7.addText('TOOL #5', {
    x: 0.5, y: 0.5, w: 2, h: 0.5,
    fontSize: 16, bold: true, color: colors.orange, fontFace: 'Arial'
  });

  slide7.addText([
    { text: 'AI-Powered Diagnostics\n', options: { color: colors.white, bold: true, fontSize: 28 } },
    { text: 'Troubleshoot ', options: { color: colors.gray, fontSize: 18 } },
    { text: 'FASTER', options: { color: colors.orange, bold: true, fontSize: 18 } }
  ], {
    x: 0.5, y: 1.1, w: 6.5, h: 1.4,
    fontFace: 'Arial'
  });

  slide7.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 2.8, w: 6.5, h: 2.8,
    fill: { color: colors.darkCard },
    line: { color: colors.orange, width: 1 },
    rectRadius: 0.1
  });

  slide7.addText([
    { text: 'How it works:\n\n', options: { bold: true, fontSize: 16 } },
    { text: '→ ', options: { color: colors.orange } },
    { text: 'MeasureQuick captures real-time data\n', options: {} },
    { text: '→ ', options: { color: colors.orange } },
    { text: 'AI pinpoints system issues\n', options: {} },
    { text: '→ ', options: { color: colors.orange } },
    { text: 'Guides techs through repairs', options: {} }
  ], {
    x: 0.7, y: 3.0, w: 6.1, h: 2.6,
    fontSize: 16, color: colors.white, fontFace: 'Arial'
  });

  // Result box
  slide7.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 6.0, w: 6.5, h: 1.5,
    fill: { color: colors.darkCard },
    line: { color: colors.orange, width: 2 },
    rectRadius: 0.1
  });

  slide7.addText([
    { text: 'RESULT\n', options: { fontSize: 14, color: colors.orange, bold: true } },
    { text: 'Faster fixes. Fewer callbacks.\n', options: { fontSize: 18, bold: true } },
    { text: 'Happy customers.', options: { fontSize: 18, bold: true } }
  ], {
    x: 0.5, y: 6.0, w: 6.5, h: 1.5,
    color: colors.white, fontFace: 'Arial', align: 'center', valign: 'middle'
  });

  slide7.addText('>>>', {
    x: 6.2, y: 8.7, w: 1, h: 0.3,
    fontSize: 18, bold: true, color: colors.orange, fontFace: 'Arial'
  });

  // ============ SLIDE 8: SUMMARY/CTA ============
  const slide8 = pptx.addSlide();
  slide8.background = { color: colors.darkBg };

  slide8.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.2, y: 0.2, w: 7.1, h: 8.95,
    fill: { type: 'none' },
    line: { color: colors.orange, width: 2 },
    rectRadius: 0.15
  });

  // Main headline
  slide8.addText([
    { text: 'BORING', options: { color: colors.orange, bold: true } },
    { text: ' automation\nthat pays for itself', options: { color: colors.white, bold: true } }
  ], {
    x: 0.5, y: 0.6, w: 6.5, h: 1.2,
    fontSize: 32, fontFace: 'Arial'
  });

  // Summary stats
  const summaryItems = [
    { label: 'Total investment:', value: '$100-300/month' },
    { label: 'Time saved:', value: '10+ hours/week' },
    { label: 'ROI:', value: 'Shows up in week one' }
  ];

  let summaryY = 2.2;
  summaryItems.forEach((item) => {
    slide8.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: summaryY, w: 6.5, h: 1.0,
      fill: { color: colors.darkCard },
      line: { color: colors.orange, width: 1 },
      rectRadius: 0.1
    });

    slide8.addText([
      { text: item.label + '  ', options: { color: colors.gray, fontSize: 16 } },
      { text: item.value, options: { color: colors.orange, fontSize: 20, bold: true } }
    ], {
      x: 0.7, y: summaryY, w: 6.1, h: 1.0,
      fontFace: 'Arial', valign: 'middle'
    });

    summaryY += 1.2;
  });

  // Closing statement
  slide8.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 5.8, w: 6.5, h: 1.6,
    fill: { color: colors.orange },
    rectRadius: 0.15
  });

  slide8.addText('These aren\'t cutting-edge AI experiments.\nThey\'re simple tools that free you to focus\non what matters: running your business.', {
    x: 0.5, y: 5.8, w: 6.5, h: 1.6,
    fontSize: 15, color: colors.white, fontFace: 'Arial',
    align: 'center', valign: 'middle'
  });

  // CTA
  slide8.addText('What would you automate first?', {
    x: 0.5, y: 7.7, w: 6.5, h: 0.6,
    fontSize: 20, bold: true, color: colors.white,
    fontFace: 'Arial', align: 'center'
  });

  // Handle
  slide8.addText('@DiegoVences', {
    x: 0.5, y: 8.6, w: 3, h: 0.4,
    fontSize: 12, color: colors.gray, fontFace: 'Arial'
  });

  // Source
  slide8.addText('Sources: ACHR News, Housecall Pro, ServiceTitan', {
    x: 3.5, y: 8.6, w: 3.5, h: 0.4,
    fontSize: 10, color: colors.gray, fontFace: 'Arial', align: 'right'
  });

  // Save
  const outputPath = __dirname + '/carousel-hvac-ai-tools.pptx';
  await pptx.writeFile({ fileName: outputPath });
  console.log('✅ Carousel created:', outputPath);

  return outputPath;
}

createCarousel().catch(console.error);
