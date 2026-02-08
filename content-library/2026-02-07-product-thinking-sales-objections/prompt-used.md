# Visual Asset Prompt Specification

**Post:** Product Thinking Applied to Sales: From Objections to Features
**Date:** 2026-02-07
**Template:** Light Carousel (Career Pivot - Segment A)
**Slides:** 4

---

## Brand Specifications Applied

### Colors
- Background: `#FDF6F0` (cream/off-white)
- Primary Accent: `#E8611A` (orange)
- Headlines: `#1A1A1A` (black) with orange keywords
- Body Text: `#1A1A1A` (black)
- Secondary Text: `#6B6B6B` (gray)

### Typography
- Font Family: Arial, sans-serif
- Headlines: Bold, mixed orange + black for emphasis
- Body: Regular weight, good line spacing
- CTA Pills: Orange background, white bold text, rounded

### Decorative Elements
- Orange gradient blobs at corners (10-15% opacity)
- Orange chevrons `>>>` bottom-right (indicating swipe)
- Orange numbered circles for framework steps
- Orange connector lines between steps

---

## Slide-by-Slide Specification

### Slide 1: Title/Hook
**Headline:**
- "SALES OBJECTIONS" → Orange, bold
- "aren't blockers." → Black, bold
- "They're PRODUCT FEEDBACK." → Black + Orange, bold

**Subtitle:** "Stop handling them. Start logging them." (italic, gray)

**Elements:**
- Orange blob top-left corner
- Orange blob bottom-right corner
- @DiegoVences handle in orange pill, bottom-left
- Orange chevrons >>> bottom-right

---

### Slide 2: The Shift (Old vs New Mindset)
**Headline:** "The **Shift**" (Shift in orange)

**Two-column layout:**

| Old Mindset (gray, strikethrough) | New Mindset (black with orange arrows) |
|-----------------------------------|----------------------------------------|
| Handle the objection | > Capture exact words |
| Reframe it | > Look for patterns |
| Push past it | > Route to product |
| Close the deal | > Improve the system |

**CTA Pill:** "Stop solving in the moment. Start solving in the product."

---

### Slide 3: The Framework
**Headline:** "The **Objection → Insight** Pipeline" (orange highlight)

**4-step framework with numbered orange circles:**

1. **Capture** — What did they actually say? Exact words, not your interpretation.
2. **Pattern** — Have I heard this before? How often?
3. **Signal** — Is this pricing, positioning, or a feature gap?
4. **Route** — Does product know? Does marketing know?

**Orange connector lines between steps**

**CTA Pill:** "Stop interpreting. Start capturing."

---

### Slide 4: Closing
**Headline:**
- "The best salespeople" → Black
- "aren't just **closers.**" → Black + Orange

**Subtext:** "They're the closest thing product teams have to real-time user research."

**CTA Pill:** "Product thinking applied to sales."

**Handle:** @DiegoVences (orange, centered bottom)

---

## Generation Method

- Tool: HTML slides → pptxgenjs conversion
- Files: `slides/slide1.html` through `slides/slide4.html`
- Generator: `generate-carousel.js`
- Output: `carousel.pptx`

### To Generate:
```bash
cd content-library/2026-02-07-product-thinking-sales-objections
node generate-carousel.js
```

---

## Quality Checklist

- [x] Uses correct palette: Orange #E8611A as primary accent
- [x] Light slides: cream #FDF6F0 bg, black text, orange highlights
- [x] Blob shapes at corners (light mode decorative elements)
- [x] CTA pills are orange bg with white text, rounded
- [x] Orange chevrons (>>>) present on slides 1-3 (bottom-right)
- [x] @DiegoVences handle present on first and last slide
- [x] Text is readable at mobile size
- [x] No employment-unsafe language in visuals
- [x] Headline uses mixed emphasis (orange keywords + black remaining)

---

**End of Prompt Specification**
