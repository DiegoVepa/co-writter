/**
 * HVAC AI Tools Carousel v2 - Data-Rich Value-Adding Version
 *
 * Format: PPTX → PDF (LinkedIn carousel)
 * Dimensions: 1080x1350 px (4:5 ratio)
 * Template: Dark mode
 */

import PptxGenJS from 'pptxgenjs';

// Brand Colors
const colors = {
  darkBg: '2D2D2D',
  orange: 'E8611A',
  white: 'FFFFFF',
  gray: '6B6B6B',
  darkCard: '3D3D3D',
  lightGray: 'AAAAAA'
};

// Create presentation
const pptx = new PptxGenJS();

// LinkedIn carousel dimensions (4:5 ratio)
pptx.defineLayout({ name: 'LINKEDIN_CAROUSEL', width: 7.5, height: 9.375 });
pptx.layout = 'LINKEDIN_CAROUSEL';
pptx.author = 'Diego Vences';
pptx.title = 'HVAC AI Tools - 5 Tools to Save 10+ Hours/Week';

// ============================================
// HELPER FUNCTIONS
// ============================================

function addSlideBase(slide, showChevrons = true) {
  // Dark background
  slide.background = { color: colors.darkBg };

  // Orange accent bar at top
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: 7.5, h: 0.12,
    fill: { color: colors.orange }
  });

  // Decorative stars top-left
  slide.addText('✦  ✦  ✦', {
    x: 0.3, y: 0.25, w: 1.5, h: 0.35,
    fontSize: 12, color: colors.orange, fontFace: 'Arial'
  });

  // Handle top-right
  slide.addText('@DiegoVences', {
    x: 5.2, y: 0.25, w: 2, h: 0.35,
    fontSize: 11, color: colors.gray, fontFace: 'Arial', align: 'right'
  });

  // Chevrons bottom-right (for swipe indication)
  if (showChevrons) {
    slide.addText('>>>', {
      x: 6.0, y: 8.85, w: 1.2, h: 0.4,
      fontSize: 20, bold: true, color: colors.orange, fontFace: 'Arial', align: 'right'
    });
  }
}

function addToolBadge(slide, toolNum, yPos = 0.7) {
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: yPos, w: 1.3, h: 0.45,
    fill: { color: colors.orange },
    rectRadius: 0.08
  });
  slide.addText(`TOOL #${toolNum}`, {
    x: 0.4, y: yPos, w: 1.3, h: 0.45,
    fontSize: 12, bold: true, color: colors.white, fontFace: 'Arial', align: 'center', valign: 'middle'
  });
}

function addDataCard(slide, content, x, y, w, h, options = {}) {
  const { headerBg = colors.orange, bodyBg = colors.darkCard } = options;

  // Card background
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h,
    fill: { color: bodyBg },
    line: { color: colors.orange, width: 1.5 },
    rectRadius: 0.1
  });

  return slide;
}

// ============================================
// SLIDE 1: HOOK (Shocking Stat)
// ============================================

const slide1 = pptx.addSlide();
addSlideBase(slide1);

// Main stat - HUGE
slide1.addText('$108K', {
  x: 0.4, y: 1.5, w: 6.7, h: 2.0,
  fontSize: 96, bold: true, color: colors.orange, fontFace: 'Arial', align: 'center'
});

slide1.addText('/YEAR', {
  x: 0.4, y: 3.3, w: 6.7, h: 0.8,
  fontSize: 48, bold: true, color: colors.white, fontFace: 'Arial', align: 'center'
});

// Subhead
slide1.addText("That's what the average HVAC contractor\nloses to missed calls alone.", {
  x: 0.4, y: 4.4, w: 6.7, h: 1.0,
  fontSize: 20, color: colors.lightGray, fontFace: 'Arial', align: 'center', italic: true
});

// Source badge
slide1.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 1.5, y: 5.6, w: 4.5, h: 0.5,
  fill: { color: colors.darkCard },
  line: { color: colors.gray, width: 1 },
  rectRadius: 0.08
});
slide1.addText('Based on study of 1,200+ contractors', {
  x: 1.5, y: 5.6, w: 4.5, h: 0.5,
  fontSize: 11, color: colors.gray, fontFace: 'Arial', align: 'center', valign: 'middle'
});

// CTA box
slide1.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.6, y: 6.8, w: 6.3, h: 1.6,
  fill: { color: colors.orange },
  rectRadius: 0.12
});

slide1.addText('5 AI TOOLS HVAC CONTRACTORS\nARE USING TO FIX THIS', {
  x: 0.6, y: 6.95, w: 6.3, h: 1.0,
  fontSize: 22, bold: true, color: colors.white, fontFace: 'Arial', align: 'center'
});

slide1.addText('Swipe to see the ROI breakdown →', {
  x: 0.6, y: 7.95, w: 6.3, h: 0.4,
  fontSize: 14, color: colors.white, fontFace: 'Arial', align: 'center', italic: true
});

// ============================================
// SLIDE 2: THE MATH (Revenue Calculator)
// ============================================

const slide2 = pptx.addSlide();
addSlideBase(slide2);

// Headline
slide2.addText('THE REVENUE LEAK', {
  x: 0.4, y: 0.8, w: 6.7, h: 0.6,
  fontSize: 32, bold: true, color: colors.orange, fontFace: 'Arial', align: 'center'
});

slide2.addText("Here's the math most contractors don't run:", {
  x: 0.4, y: 1.4, w: 6.7, h: 0.4,
  fontSize: 16, color: colors.lightGray, fontFace: 'Arial', align: 'center', italic: true
});

// Calculator card
slide2.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 2.0, w: 6.5, h: 4.2,
  fill: { color: colors.darkCard },
  line: { color: colors.orange, width: 2 },
  rectRadius: 0.12
});

// Calculator rows
const calcRows = [
  { label: '50 missed calls/month', value: '', icon: '📞' },
  { label: '× $180 avg call value', value: '', icon: '💰' },
  { label: '× 85% won\'t call back', value: '', icon: '❌' },
];

let calcY = 2.3;
calcRows.forEach(row => {
  slide2.addText(row.icon, {
    x: 0.8, y: calcY, w: 0.6, h: 0.5,
    fontSize: 18, fontFace: 'Arial'
  });
  slide2.addText(row.label, {
    x: 1.4, y: calcY, w: 5.2, h: 0.5,
    fontSize: 18, color: colors.white, fontFace: 'Arial'
  });
  calcY += 0.6;
});

// Divider line
slide2.addShape(pptx.shapes.RECTANGLE, {
  x: 0.8, y: calcY + 0.1, w: 5.9, h: 0.03,
  fill: { color: colors.orange }
});

// Results
slide2.addText('= $7,650/month LOST', {
  x: 0.8, y: calcY + 0.4, w: 5.9, h: 0.6,
  fontSize: 24, bold: true, color: colors.orange, fontFace: 'Arial'
});

slide2.addText('= $91,800/year', {
  x: 0.8, y: calcY + 1.0, w: 5.9, h: 0.5,
  fontSize: 20, bold: true, color: colors.white, fontFace: 'Arial'
});

// Question callout
slide2.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 1.0, y: 6.6, w: 5.5, h: 0.9,
  fill: { color: colors.orange },
  rectRadius: 0.1
});

slide2.addText("What's YOUR number?", {
  x: 1.0, y: 6.6, w: 5.5, h: 0.9,
  fontSize: 22, bold: true, color: colors.white, fontFace: 'Arial', align: 'center', valign: 'middle'
});

// Bottom note
slide2.addText('The good news: These leaks are fixable.', {
  x: 0.4, y: 7.8, w: 6.7, h: 0.4,
  fontSize: 14, color: colors.lightGray, fontFace: 'Arial', align: 'center', italic: true
});

// ============================================
// SLIDE 3: TOOL #1 - 24/7 Virtual Agent
// ============================================

const slide3 = pptx.addSlide();
addSlideBase(slide3);
addToolBadge(slide3, 1);

// Headline
slide3.addText([
  { text: 'Never ', options: { color: colors.white } },
  { text: 'SLEEP THROUGH REVENUE', options: { color: colors.orange } },
  { text: ' Again', options: { color: colors.white } }
], {
  x: 0.4, y: 1.3, w: 6.7, h: 0.9,
  fontSize: 26, bold: true, fontFace: 'Arial', align: 'center'
});

slide3.addText('24/7 Virtual Agent', {
  x: 0.4, y: 2.1, w: 6.7, h: 0.4,
  fontSize: 16, color: colors.lightGray, fontFace: 'Arial', align: 'center'
});

// ROI Box
slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 2.7, w: 6.5, h: 2.0,
  fill: { color: colors.darkCard },
  line: { color: colors.orange, width: 2 },
  rectRadius: 0.12
});

// ROI header
slide3.addShape(pptx.shapes.RECTANGLE, {
  x: 0.5, y: 2.7, w: 6.5, h: 0.5,
  fill: { color: colors.orange }
});
slide3.addText('THE ROI', {
  x: 0.5, y: 2.7, w: 6.5, h: 0.5,
  fontSize: 14, bold: true, color: colors.white, fontFace: 'Arial', align: 'center', valign: 'middle'
});

slide3.addText('INVESTMENT:  $100/month', {
  x: 0.8, y: 3.35, w: 5.9, h: 0.4,
  fontSize: 16, color: colors.white, fontFace: 'Arial'
});
slide3.addText('RETURN:  $2,000+ in captured leads', {
  x: 0.8, y: 3.75, w: 5.9, h: 0.4,
  fontSize: 16, color: colors.white, fontFace: 'Arial'
});
slide3.addText('ROI:  20x', {
  x: 0.8, y: 4.15, w: 5.9, h: 0.4,
  fontSize: 18, bold: true, color: colors.orange, fontFace: 'Arial'
});

// Quote box
slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 5.0, w: 6.5, h: 2.0,
  fill: { color: '1A1A1A' },
  line: { color: colors.orange, width: 1 },
  rectRadius: 0.1
});

slide3.addText('"', {
  x: 0.7, y: 5.0, w: 0.5, h: 0.6,
  fontSize: 48, color: colors.orange, fontFace: 'Georgia'
});

slide3.addText("I was literally sleeping through $80,000/month in emergency revenue. People's AC breaks at 9 PM in 105-degree weather—they're not waiting until morning.", {
  x: 0.9, y: 5.3, w: 5.9, h: 1.2,
  fontSize: 13, color: colors.lightGray, fontFace: 'Arial', italic: true
});

slide3.addText('— HVAC Company Owner, Dallas', {
  x: 0.9, y: 6.5, w: 5.9, h: 0.35,
  fontSize: 11, color: colors.orange, fontFace: 'Arial'
});

// What it does
slide3.addText('Takes calls/texts 24/7  •  Books appointments  •  Answers FAQs', {
  x: 0.4, y: 7.5, w: 6.7, h: 0.4,
  fontSize: 12, color: colors.gray, fontFace: 'Arial', align: 'center'
});

// ============================================
// SLIDE 4: TOOL #2 - Smart Scheduling
// ============================================

const slide4 = pptx.addSlide();
addSlideBase(slide4);
addToolBadge(slide4, 2);

// Headline
slide4.addText([
  { text: 'Get ', options: { color: colors.white } },
  { text: '12 HOURS/WEEK', options: { color: colors.orange } },
  { text: ' Back', options: { color: colors.white } }
], {
  x: 0.4, y: 1.3, w: 6.7, h: 0.7,
  fontSize: 28, bold: true, fontFace: 'Arial', align: 'center'
});

slide4.addText('Smart Scheduling & Dispatch', {
  x: 0.4, y: 2.0, w: 6.7, h: 0.4,
  fontSize: 16, color: colors.lightGray, fontFace: 'Arial', align: 'center'
});

// Time breakdown table
slide4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 2.6, w: 6.5, h: 3.5,
  fill: { color: colors.darkCard },
  line: { color: colors.orange, width: 2 },
  rectRadius: 0.12
});

// Table header
slide4.addShape(pptx.shapes.RECTANGLE, {
  x: 0.5, y: 2.6, w: 6.5, h: 0.55,
  fill: { color: colors.orange }
});

slide4.addText('TASK', {
  x: 0.7, y: 2.65, w: 2.5, h: 0.45,
  fontSize: 12, bold: true, color: colors.white, fontFace: 'Arial', valign: 'middle'
});
slide4.addText('BEFORE', {
  x: 3.3, y: 2.65, w: 1.5, h: 0.45,
  fontSize: 12, bold: true, color: colors.white, fontFace: 'Arial', align: 'center', valign: 'middle'
});
slide4.addText('AFTER', {
  x: 4.9, y: 2.65, w: 1.5, h: 0.45,
  fontSize: 12, bold: true, color: colors.white, fontFace: 'Arial', align: 'center', valign: 'middle'
});

// Table rows
const timeRows = [
  ['Manual routing', '6 hrs', '0'],
  ['Dispatch calls', '3 hrs', '30 min'],
  ['Rescheduling', '2 hrs', 'Auto'],
  ['Paperwork', '1 hr', '10 min'],
];

let rowY = 3.25;
timeRows.forEach((row, i) => {
  const bgColor = i % 2 === 0 ? colors.darkCard : '353535';
  slide4.addShape(pptx.shapes.RECTANGLE, {
    x: 0.55, y: rowY - 0.05, w: 6.4, h: 0.55,
    fill: { color: bgColor }
  });

  slide4.addText(row[0], {
    x: 0.7, y: rowY, w: 2.5, h: 0.45,
    fontSize: 13, color: colors.white, fontFace: 'Arial', valign: 'middle'
  });
  slide4.addText(row[1], {
    x: 3.3, y: rowY, w: 1.5, h: 0.45,
    fontSize: 13, color: colors.lightGray, fontFace: 'Arial', align: 'center', valign: 'middle'
  });
  slide4.addText(row[2], {
    x: 4.9, y: rowY, w: 1.5, h: 0.45,
    fontSize: 13, bold: true, color: colors.orange, fontFace: 'Arial', align: 'center', valign: 'middle'
  });
  rowY += 0.55;
});

// Total row
slide4.addShape(pptx.shapes.RECTANGLE, {
  x: 0.55, y: rowY, w: 6.4, h: 0.6,
  fill: { color: colors.orange }
});
slide4.addText('TOTAL SAVED', {
  x: 0.7, y: rowY + 0.05, w: 2.5, h: 0.5,
  fontSize: 13, bold: true, color: colors.white, fontFace: 'Arial', valign: 'middle'
});
slide4.addText('12 hrs', {
  x: 3.3, y: rowY + 0.05, w: 1.5, h: 0.5,
  fontSize: 13, bold: true, color: colors.white, fontFace: 'Arial', align: 'center', valign: 'middle'
});
slide4.addText('40 min', {
  x: 4.9, y: rowY + 0.05, w: 1.5, h: 0.5,
  fontSize: 13, bold: true, color: colors.white, fontFace: 'Arial', align: 'center', valign: 'middle'
});

// Stat badge
slide4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 1.2, y: 6.5, w: 5.1, h: 0.7,
  fill: { color: colors.darkCard },
  line: { color: colors.orange, width: 1.5 },
  rectRadius: 0.08
});

slide4.addText('22% less drive time (ServiceTitan data)', {
  x: 1.2, y: 6.5, w: 5.1, h: 0.7,
  fontSize: 14, bold: true, color: colors.orange, fontFace: 'Arial', align: 'center', valign: 'middle'
});

// Investment
slide4.addText('Investment: $150/month  |  ROI: 10x', {
  x: 0.4, y: 7.5, w: 6.7, h: 0.4,
  fontSize: 13, color: colors.gray, fontFace: 'Arial', align: 'center'
});

// ============================================
// SLIDE 5: TOOL #3 - Appointment Reminders
// ============================================

const slide5 = pptx.addSlide();
addSlideBase(slide5);
addToolBadge(slide5, 3);

// Headline
slide5.addText([
  { text: 'Cut ', options: { color: colors.white } },
  { text: 'NO-SHOWS', options: { color: colors.orange } },
  { text: ' by ', options: { color: colors.white } },
  { text: '60%', options: { color: colors.orange } }
], {
  x: 0.4, y: 1.3, w: 6.7, h: 0.7,
  fontSize: 28, bold: true, fontFace: 'Arial', align: 'center'
});

slide5.addText('Appointment Reminders', {
  x: 0.4, y: 2.0, w: 6.7, h: 0.4,
  fontSize: 16, color: colors.lightGray, fontFace: 'Arial', align: 'center'
});

// Before/After comparison
const colWidth = 3.1;

// BEFORE column
slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 2.6, w: colWidth, h: 2.8,
  fill: { color: '3A2020' },
  line: { color: 'CC4444', width: 1.5 },
  rectRadius: 0.1
});

slide5.addText('BEFORE', {
  x: 0.5, y: 2.7, w: colWidth, h: 0.45,
  fontSize: 14, bold: true, color: 'CC4444', fontFace: 'Arial', align: 'center'
});

slide5.addText('30%', {
  x: 0.5, y: 3.2, w: colWidth, h: 0.7,
  fontSize: 36, bold: true, color: colors.white, fontFace: 'Arial', align: 'center'
});
slide5.addText('no-show rate', {
  x: 0.5, y: 3.85, w: colWidth, h: 0.35,
  fontSize: 12, color: colors.lightGray, fontFace: 'Arial', align: 'center'
});

slide5.addText('15 wasted trips/mo', {
  x: 0.5, y: 4.3, w: colWidth, h: 0.35,
  fontSize: 13, color: colors.white, fontFace: 'Arial', align: 'center'
});
slide5.addText('$6,000 lost/mo', {
  x: 0.5, y: 4.7, w: colWidth, h: 0.35,
  fontSize: 14, bold: true, color: 'CC4444', fontFace: 'Arial', align: 'center'
});

// AFTER column
slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 3.9, y: 2.6, w: colWidth, h: 2.8,
  fill: { color: '1A3020' },
  line: { color: '44CC66', width: 1.5 },
  rectRadius: 0.1
});

slide5.addText('AFTER', {
  x: 3.9, y: 2.7, w: colWidth, h: 0.45,
  fontSize: 14, bold: true, color: '44CC66', fontFace: 'Arial', align: 'center'
});

slide5.addText('12%', {
  x: 3.9, y: 3.2, w: colWidth, h: 0.7,
  fontSize: 36, bold: true, color: colors.white, fontFace: 'Arial', align: 'center'
});
slide5.addText('no-show rate', {
  x: 3.9, y: 3.85, w: colWidth, h: 0.35,
  fontSize: 12, color: colors.lightGray, fontFace: 'Arial', align: 'center'
});

slide5.addText('6 wasted trips/mo', {
  x: 3.9, y: 4.3, w: colWidth, h: 0.35,
  fontSize: 13, color: colors.white, fontFace: 'Arial', align: 'center'
});
slide5.addText('$2,400 lost/mo', {
  x: 3.9, y: 4.7, w: colWidth, h: 0.35,
  fontSize: 14, bold: true, color: '44CC66', fontFace: 'Arial', align: 'center'
});

// Arrow between
slide5.addText('→', {
  x: 3.35, y: 3.6, w: 0.8, h: 0.6,
  fontSize: 28, bold: true, color: colors.orange, fontFace: 'Arial', align: 'center'
});

// The Method box
slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 5.6, w: 6.5, h: 1.8,
  fill: { color: colors.darkCard },
  line: { color: colors.orange, width: 1.5 },
  rectRadius: 0.1
});

slide5.addText('THE METHOD', {
  x: 0.5, y: 5.7, w: 6.5, h: 0.4,
  fontSize: 12, bold: true, color: colors.orange, fontFace: 'Arial', align: 'center'
});

const methodSteps = [
  '72 hrs → Email confirmation',
  '24 hrs → Text reminder',
  '2 hrs → "Confirm or reschedule"',
  '30 min → "Tech en route" SMS'
];

let methodY = 6.15;
methodSteps.forEach(step => {
  slide5.addText('→  ' + step, {
    x: 1.0, y: methodY, w: 5.5, h: 0.32,
    fontSize: 12, color: colors.white, fontFace: 'Arial'
  });
  methodY += 0.32;
});

// Cost line
slide5.addText('Cost: $15/month  |  Setup: 45 min  |  Savings: $3,600/month', {
  x: 0.4, y: 7.7, w: 6.7, h: 0.4,
  fontSize: 12, color: colors.gray, fontFace: 'Arial', align: 'center'
});

// ============================================
// SLIDE 6: TOOL #4 - Invoice Automation
// ============================================

const slide6 = pptx.addSlide();
addSlideBase(slide6);
addToolBadge(slide6, 4);

// Headline
slide6.addText([
  { text: 'Stop ', options: { color: colors.white } },
  { text: 'CHASING', options: { color: colors.orange } },
  { text: ' Payments', options: { color: colors.white } }
], {
  x: 0.4, y: 1.3, w: 6.7, h: 0.7,
  fontSize: 28, bold: true, fontFace: 'Arial', align: 'center'
});

slide6.addText('Quote & Invoice Follow-ups', {
  x: 0.4, y: 2.0, w: 6.7, h: 0.4,
  fontSize: 16, color: colors.lightGray, fontFace: 'Arial', align: 'center'
});

// Auto-reminder sequence
slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 2.6, w: 6.5, h: 2.4,
  fill: { color: colors.darkCard },
  line: { color: colors.orange, width: 1.5 },
  rectRadius: 0.12
});

slide6.addText('AUTO-REMINDER SEQUENCE', {
  x: 0.5, y: 2.7, w: 6.5, h: 0.45,
  fontSize: 12, bold: true, color: colors.orange, fontFace: 'Arial', align: 'center'
});

const sequence = [
  { day: 'Day 3', action: 'Friendly reminder', icon: '📧' },
  { day: 'Day 7', action: 'Follow-up', icon: '📱' },
  { day: 'Day 14', action: 'Escalation notice', icon: '⚠️' },
];

let seqY = 3.25;
sequence.forEach((item, i) => {
  slide6.addText(item.icon, {
    x: 0.8, y: seqY, w: 0.5, h: 0.45,
    fontSize: 16, fontFace: 'Arial'
  });
  slide6.addText(item.day, {
    x: 1.4, y: seqY, w: 1.3, h: 0.45,
    fontSize: 14, bold: true, color: colors.orange, fontFace: 'Arial', valign: 'middle'
  });
  slide6.addText(item.action, {
    x: 2.8, y: seqY, w: 3.5, h: 0.45,
    fontSize: 14, color: colors.white, fontFace: 'Arial', valign: 'middle'
  });

  // Arrow to next
  if (i < sequence.length - 1) {
    slide6.addText('↓', {
      x: 1.4, y: seqY + 0.4, w: 1.3, h: 0.3,
      fontSize: 14, color: colors.gray, fontFace: 'Arial', align: 'center'
    });
  }
  seqY += 0.65;
});

// Results box
slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 5.2, w: 6.5, h: 2.0,
  fill: { color: colors.orange },
  rectRadius: 0.12
});

slide6.addText('RESULTS', {
  x: 0.5, y: 5.3, w: 6.5, h: 0.4,
  fontSize: 12, bold: true, color: colors.white, fontFace: 'Arial', align: 'center'
});

const results = [
  'Revenue recovered: $2K+/month',
  'Time saved: 3 hrs/week',
  'Cash flow: 40% faster payments'
];

let resY = 5.75;
results.forEach(result => {
  slide6.addText('✓  ' + result, {
    x: 1.2, y: resY, w: 5.1, h: 0.4,
    fontSize: 14, bold: true, color: colors.white, fontFace: 'Arial'
  });
  resY += 0.45;
});

// Investment
slide6.addText('Investment: $50/month  |  ROI: 40x', {
  x: 0.4, y: 7.5, w: 6.7, h: 0.4,
  fontSize: 13, color: colors.gray, fontFace: 'Arial', align: 'center'
});

// ============================================
// SLIDE 7: TOOL #5 - AI Diagnostics
// ============================================

const slide7 = pptx.addSlide();
addSlideBase(slide7);
addToolBadge(slide7, 5);

// Headline
slide7.addText([
  { text: 'Troubleshoot ', options: { color: colors.white } },
  { text: 'FASTER', options: { color: colors.orange } }
], {
  x: 0.4, y: 1.3, w: 6.7, h: 0.7,
  fontSize: 28, bold: true, fontFace: 'Arial', align: 'center'
});

slide7.addText('AI-Powered Diagnostics', {
  x: 0.4, y: 2.0, w: 6.7, h: 0.4,
  fontSize: 16, color: colors.lightGray, fontFace: 'Arial', align: 'center'
});

// Flow diagram
const flowSteps = [
  { title: 'Real-time data capture', icon: '📡' },
  { title: 'AI pinpoints issues', icon: '🎯' },
  { title: 'Guided repairs', icon: '🔧' },
  { title: 'Faster fixes + Fewer callbacks', icon: '✅' },
];

let flowY = 2.7;
flowSteps.forEach((step, i) => {
  // Box
  slide7.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 1.0, y: flowY, w: 5.5, h: 0.8,
    fill: { color: i === flowSteps.length - 1 ? colors.orange : colors.darkCard },
    line: { color: colors.orange, width: 1.5 },
    rectRadius: 0.1
  });

  slide7.addText(step.icon + '  ' + step.title, {
    x: 1.0, y: flowY, w: 5.5, h: 0.8,
    fontSize: 16, bold: i === flowSteps.length - 1, color: colors.white, fontFace: 'Arial', align: 'center', valign: 'middle'
  });

  // Arrow
  if (i < flowSteps.length - 1) {
    slide7.addText('↓', {
      x: 3.5, y: flowY + 0.75, w: 0.5, h: 0.4,
      fontSize: 20, bold: true, color: colors.orange, fontFace: 'Arial', align: 'center'
    });
  }

  flowY += 1.15;
});

// Stat box
slide7.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.8, y: 7.0, w: 5.9, h: 0.9,
  fill: { color: colors.darkCard },
  line: { color: colors.orange, width: 2 },
  rectRadius: 0.1
});

slide7.addText('37% higher customer satisfaction', {
  x: 0.8, y: 7.05, w: 5.9, h: 0.55,
  fontSize: 18, bold: true, color: colors.orange, fontFace: 'Arial', align: 'center', valign: 'middle'
});

slide7.addText('with automated service (Aberdeen Report)', {
  x: 0.8, y: 7.5, w: 5.9, h: 0.35,
  fontSize: 11, color: colors.gray, fontFace: 'Arial', align: 'center'
});

// ============================================
// SLIDE 8: THE FULL STACK (Summary)
// ============================================

const slide8 = pptx.addSlide();
addSlideBase(slide8, false); // No chevrons on last slide

// Headline
slide8.addText([
  { text: 'The ', options: { color: colors.white } },
  { text: 'BORING', options: { color: colors.orange } },
  { text: ' Automation\nThat Pays for Itself', options: { color: colors.white } }
], {
  x: 0.4, y: 0.7, w: 6.7, h: 1.0,
  fontSize: 24, bold: true, fontFace: 'Arial', align: 'center'
});

// ROI Stack Table
slide8.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.4, y: 1.85, w: 6.7, h: 4.0,
  fill: { color: colors.darkCard },
  line: { color: colors.orange, width: 2 },
  rectRadius: 0.12
});

// Table header
slide8.addShape(pptx.shapes.RECTANGLE, {
  x: 0.4, y: 1.85, w: 6.7, h: 0.5,
  fill: { color: colors.orange }
});

slide8.addText('TOOL', {
  x: 0.5, y: 1.9, w: 2.4, h: 0.4,
  fontSize: 11, bold: true, color: colors.white, fontFace: 'Arial', valign: 'middle'
});
slide8.addText('COST', {
  x: 2.9, y: 1.9, w: 1.3, h: 0.4,
  fontSize: 11, bold: true, color: colors.white, fontFace: 'Arial', align: 'center', valign: 'middle'
});
slide8.addText('RETURN', {
  x: 4.2, y: 1.9, w: 1.5, h: 0.4,
  fontSize: 11, bold: true, color: colors.white, fontFace: 'Arial', align: 'center', valign: 'middle'
});
slide8.addText('ROI', {
  x: 5.7, y: 1.9, w: 1.2, h: 0.4,
  fontSize: 11, bold: true, color: colors.white, fontFace: 'Arial', align: 'center', valign: 'middle'
});

// Table rows
const roiRows = [
  ['Virtual Agent', '$100', '$2,000', '20x'],
  ['Scheduling', '$150', '$1,500', '10x'],
  ['Reminders', '$15', '$3,600', '240x'],
  ['Invoice Auto', '$50', '$2,000', '40x'],
];

let tableY = 2.45;
roiRows.forEach((row, i) => {
  const bgColor = i % 2 === 0 ? colors.darkCard : '353535';
  slide8.addShape(pptx.shapes.RECTANGLE, {
    x: 0.45, y: tableY - 0.02, w: 6.6, h: 0.55,
    fill: { color: bgColor }
  });

  slide8.addText(row[0], {
    x: 0.5, y: tableY, w: 2.4, h: 0.5,
    fontSize: 12, color: colors.white, fontFace: 'Arial', valign: 'middle'
  });
  slide8.addText(row[1], {
    x: 2.9, y: tableY, w: 1.3, h: 0.5,
    fontSize: 12, color: colors.lightGray, fontFace: 'Arial', align: 'center', valign: 'middle'
  });
  slide8.addText(row[2], {
    x: 4.2, y: tableY, w: 1.5, h: 0.5,
    fontSize: 12, color: colors.white, fontFace: 'Arial', align: 'center', valign: 'middle'
  });
  slide8.addText(row[3], {
    x: 5.7, y: tableY, w: 1.2, h: 0.5,
    fontSize: 12, bold: true, color: colors.orange, fontFace: 'Arial', align: 'center', valign: 'middle'
  });
  tableY += 0.55;
});

// Total row
slide8.addShape(pptx.shapes.RECTANGLE, {
  x: 0.45, y: tableY, w: 6.6, h: 0.6,
  fill: { color: colors.orange }
});

slide8.addText('TOTAL', {
  x: 0.5, y: tableY + 0.05, w: 2.4, h: 0.5,
  fontSize: 12, bold: true, color: colors.white, fontFace: 'Arial', valign: 'middle'
});
slide8.addText('$315', {
  x: 2.9, y: tableY + 0.05, w: 1.3, h: 0.5,
  fontSize: 12, bold: true, color: colors.white, fontFace: 'Arial', align: 'center', valign: 'middle'
});
slide8.addText('$9,100', {
  x: 4.2, y: tableY + 0.05, w: 1.5, h: 0.5,
  fontSize: 12, bold: true, color: colors.white, fontFace: 'Arial', align: 'center', valign: 'middle'
});
slide8.addText('29x', {
  x: 5.7, y: tableY + 0.05, w: 1.2, h: 0.5,
  fontSize: 14, bold: true, color: colors.white, fontFace: 'Arial', align: 'center', valign: 'middle'
});

// CTA
slide8.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.8, y: 6.2, w: 5.9, h: 0.8,
  fill: { color: colors.orange },
  rectRadius: 0.1
});

slide8.addText('What would you automate FIRST?', {
  x: 0.8, y: 6.2, w: 5.9, h: 0.8,
  fontSize: 18, bold: true, color: colors.white, fontFace: 'Arial', align: 'center', valign: 'middle'
});

// Sources
slide8.addText('Sources: ServiceTitan, Aberdeen Group, CallBird AI, ACHR News', {
  x: 0.4, y: 7.2, w: 6.7, h: 0.35,
  fontSize: 9, color: colors.gray, fontFace: 'Arial', align: 'center'
});

// Handle
slide8.addText('@DiegoVences', {
  x: 0.4, y: 7.7, w: 6.7, h: 0.4,
  fontSize: 14, bold: true, color: colors.orange, fontFace: 'Arial', align: 'center'
});

slide8.addText("These aren't cutting-edge AI experiments.\nThey're simple tools that free you to focus on what matters.", {
  x: 0.4, y: 8.2, w: 6.7, h: 0.7,
  fontSize: 11, color: colors.lightGray, fontFace: 'Arial', align: 'center', italic: true
});

// ============================================
// SAVE FILE
// ============================================

const outputPath = './carousel-hvac-v2.pptx';
pptx.writeFile({ fileName: outputPath })
  .then(() => {
    console.log('✅ Carousel generated successfully!');
    console.log(`📁 File: ${outputPath}`);
    console.log('');
    console.log('Next steps:');
    console.log('1. Open in PowerPoint/Keynote');
    console.log('2. Export as PDF');
    console.log('3. Upload to LinkedIn as carousel');
  })
  .catch(err => {
    console.error('❌ Error generating carousel:', err);
  });
