# LinkedIn Carousel with Screenshots Skill

**Skill:** `linkedin-carousel-screenshots`
**Location:** `/skills/content-types/linkedin-carousel-screenshots.md`
**Purpose:** Create branded LinkedIn carousels featuring real screenshots with explanatory text.
**Trigger:** User says "carousel", "slides", or provides screenshots for a post.

---

## 1. When to Use This Skill

Use this skill when:
- User provides screenshots to accompany a LinkedIn post
- User wants a multi-slide carousel (not single image or infographic)
- Content shows "before/after" or "tool in action" workflows

---

## 2. Brand Specifications

### Colors (NO # prefix in PptxGenJS)
```javascript
const colors = {
  darkBg: '2D2D2D',      // Slide background
  orange: 'E8611A',       // Accents, headlines, arrows
  white: 'FFFFFF',        // Body text
  gray: '6B6B6B',         // Secondary text, handle
  cardBg: '3D3D3D'        // Text box backgrounds
};
```

### Dimensions
- **LinkedIn Carousel:** 7.5" x 9.375" (1080x1350px equivalent, 4:5 ratio)
- **Layout name:** `LINKEDIN`

### Typography
- **Font:** Arial (web-safe)
- **Tool label:** 24pt, bold, orange
- **Headline:** 26-28pt, bold, white
- **Body text:** 14-16pt, regular, white
- **Handle:** 12pt, gray

### Visual Elements
- Orange accent bar at top (0.15" height)
- Rounded rectangle text boxes with orange border
- Orange arrows (→) for bullet points
- Swipe indicator (>>>) on all slides except last
- @DiegoVences handle on every slide
- Key takeaway pill on final slide (orange background)

---

## 3. Slide Structure Template

Each slide follows this layout:

```
┌─────────────────────────────────────┐
│ ████████████████████████████████████│ ← Orange bar (0.15")
│                                     │
│ TOOL NAME                           │ ← Orange, 24pt bold
│                                     │
│ HEADLINE: FROM X → TO Y             │ ← White, 26-28pt bold
│                                     │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │      SCREENSHOT                 │ │ ← 60% of slide
│ │      (6.9" x 4.2")              │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ "Quote from post"               │ │ ← Dark card with
│ │                                 │ │   orange border
│ │ → Callout 1                     │ │
│ │ → Callout 2                     │ │
│ └─────────────────────────────────┘ │
│                                     │
│ @DiegoVences                  >>> │ │
└─────────────────────────────────────┘
```

---

## 4. Interactive Workflow

### Step 1: Gather Screenshots

Ask user:
```
"Please share your screenshots. For each one, tell me:
1. Which tool/extension is it showing?
2. What's the key transformation or outcome?"
```

Or check if user provided a PPTX/folder with images.

### Step 2: Extract Screenshots

If PPTX provided:
```bash
python3 [pptx-skill]/ooxml/scripts/unpack.py "file.pptx" "output-dir"
ls output-dir/ppt/media/
```

Copy images to: `/content-library/[date]-[slug]/slides/`

### Step 3: Plan the Carousel

For each screenshot, define:
- **Tool label:** EXCEL, POWERPOINT, CHROME, etc.
- **Headline:** "FROM [before state] → TO [after state]"
- **Quote:** One sentence from the post (or complementary)
- **Callouts:** 2 bullet points that ADD value (not repeat post)

Present plan to user for approval.

### Step 4: Generate Carousel

Use the carousel generator script template:

```javascript
const pptxgen = require('pptxgenjs');

async function createCarousel() {
  const pptx = new pptxgen();
  pptx.defineLayout({ name: 'LINKEDIN', width: 7.5, height: 9.375 });
  pptx.layout = 'LINKEDIN';

  const colors = {
    darkBg: '2D2D2D',
    orange: 'E8611A',
    white: 'FFFFFF',
    gray: '6B6B6B'
  };

  // For each slide...
  const slide = pptx.addSlide();
  slide.background = { color: colors.darkBg };

  // Orange bar
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: 7.5, h: 0.15,
    fill: { color: colors.orange }
  });

  // Tool label
  slide.addText('TOOL_NAME', {
    x: 0.4, y: 0.4, w: 3, h: 0.5,
    fontSize: 24, bold: true, color: colors.orange,
    fontFace: 'Arial'
  });

  // Headline
  slide.addText('FROM X → TO Y', {
    x: 0.4, y: 0.9, w: 6.7, h: 0.7,
    fontSize: 28, bold: true, color: colors.white,
    fontFace: 'Arial'
  });

  // Screenshot
  slide.addImage({
    path: 'path/to/screenshot.png',
    x: 0.3, y: 1.8, w: 6.9, h: 4.2
  });

  // Text box background
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.3, y: 6.2, w: 6.9, h: 2.2,
    fill: { color: '3D3D3D' },
    line: { color: colors.orange, width: 2 },
    rectRadius: 0.1
  });

  // Quote
  slide.addText([
    { text: '"Quote here"', options: { fontSize: 16, color: colors.white, italic: true } }
  ], { x: 0.5, y: 6.4, w: 6.5, h: 0.6, fontFace: 'Arial' });

  // Callouts
  slide.addText([
    { text: '→ ', options: { color: colors.orange, bold: true } },
    { text: 'Callout 1\n', options: { color: colors.white } },
    { text: '→ ', options: { color: colors.orange, bold: true } },
    { text: 'Callout 2', options: { color: colors.white } }
  ], { x: 0.5, y: 7.1, w: 6.5, h: 0.9, fontSize: 14, fontFace: 'Arial' });

  // Handle
  slide.addText('@DiegoVences', {
    x: 0.4, y: 8.7, w: 3, h: 0.4,
    fontSize: 12, color: colors.gray, fontFace: 'Arial'
  });

  // Swipe indicator (omit on last slide)
  slide.addText('>>>', {
    x: 6.2, y: 8.7, w: 1, h: 0.4,
    fontSize: 18, bold: true, color: colors.orange, fontFace: 'Arial'
  });

  await pptx.writeFile({ fileName: 'carousel.pptx' });
}
```

### Step 5: Final Slide Additions

On the **last slide**, add:
- Key takeaway pill (orange background, centered)
- Remove swipe indicator (>>>)

```javascript
// Key takeaway pill
slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 1.5, y: 8.5, w: 4.5, h: 0.6,
  fill: { color: colors.orange },
  rectRadius: 0.3
});

slide.addText('Key takeaway here.', {
  x: 1.5, y: 8.5, w: 4.5, h: 0.6,
  fontSize: 16, bold: true, color: colors.white,
  fontFace: 'Arial', align: 'center', valign: 'middle'
});
```

### Step 6: Save & Export

1. Save PPTX to:
   - `/content-library/[date]-[slug]/carousel-[name].pptx`
   - `/pictures-generated/[date]-[slug]/carousel-[name].pptx`

2. Open folder for user:
   ```bash
   open /pictures-generated/[date]-[slug]/
   ```

3. Tell user: "To export as images: Open PPTX → File → Export → PNG"

---

## 5. Headline Formulas

Use transformation-focused headlines:

| Pattern | Example |
|---------|---------|
| FROM X → TO Y | FROM CHECKBOXES → TO PATTERNS |
| X → Y | MANUAL → AUTOMATIC |
| BEFORE: X / AFTER: Y | BEFORE: STUCK / AFTER: CLARITY |
| [PROBLEM] → [SOLUTION] | FORMATTING CHAOS → BRAND LOCK |

---

## 6. Callout Guidelines

Callouts should **ADD value**, not repeat the post:

**Good callouts:**
- Specific metrics visible in screenshot ("87% consistency")
- What Claude is doing ("Summarizes structure automatically")
- The hidden benefit ("Understands what's on screen")

**Bad callouts:**
- Generic statements ("This is useful")
- Repeating post text exactly
- Vague benefits ("Saves time")

---

## 7. Quality Checklist

Before delivering:

- [ ] Dark background (#2D2D2D) on all slides
- [ ] Orange accent bar at top
- [ ] Tool name in orange
- [ ] Headline uses → transformation format
- [ ] Screenshot properly sized (6.9" x 4.2")
- [ ] Text box has orange border
- [ ] Callouts use → bullets in orange
- [ ] @DiegoVences on every slide
- [ ] >>> swipe indicator on all slides except last
- [ ] Final slide has orange key takeaway pill
- [ ] Saved to content-library AND pictures-generated
- [ ] Folder opened for user

---

## 8. Quick Start Command

When user says: **"Create a carousel with these screenshots"**

1. Load this skill
2. Ask for/extract screenshots
3. Present slide plan
4. Generate PPTX
5. Deliver with export instructions

---

**End of Skill**
