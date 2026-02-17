# Visual System Expansion Design

**Date:** 2026-02-16
**Status:** Implemented
**Author:** Diego Vences + Claude

---

## Problem Statement

Two friction points identified in the co-writter system:

1. **Publishing gap** - Posts created but never marked as "published" (README showed 0 published posts despite 12 drafts)
2. **Limited visual styles** - Only 2 creative types felt available (dark/light carousels), needed more variety

---

## Solution Overview

### 1. Publishing Workflow Fix

**Approach:** Reminder prompt after content creation + single-command publish script

**Deliverable:** `scripts/publish.sh`

**Features:**
- Lists available draft posts when run without arguments
- Prompts for LinkedIn URL
- Updates metadata.json (status → "published", adds date_published, linkedin_url)
- Initializes engagement metrics object
- Auto-regenerates README.md

**Usage:**
```bash
./scripts/publish.sh hvac-ai-tools
```

---

### 2. Visual System Expansion

**New creative types added (3):**

| Type | Script | Output | Best For |
|------|--------|--------|----------|
| Before/After | `generate-before-after.js` | PPTX | Transformation stories |
| Data Visualization | `generate-data-viz.js` | PNG | ROI, charts, metrics |
| Screenshot Carousel | `generate-screenshot-carousel.js` | PPTX | Tool walkthroughs |

**Total creative options now available:** 7

1. Carousel (multi-slide)
2. Single Image (quote card)
3. Infographic (hand-drawn)
4. Before/After comparison ← NEW
5. Data visualization (chart) ← NEW
6. Screenshot carousel ← NEW
7. Text-only

---

## Technical Implementation

### Before/After Generator

**File:** `scripts/generate-before-after.js`

**Features:**
- Reads `before_after` config from metadata.json
- Generates dark-themed split comparison
- Left side: ❌ BEFORE with pain points
- Right side: ✅ AFTER with outcomes (orange accent)
- Up to 5 comparison rows
- Bottom takeaway pill

**Metadata schema:**
```json
{
  "before_after": {
    "title": "HVAC BUSINESS: BEFORE → AFTER",
    "subtitle": "What changes with simple AI tools",
    "comparisons": [
      { "before": "30% no-shows", "after": "12% no-shows" },
      { "before": "6 hrs/week scheduling", "after": "Automated routing" }
    ],
    "takeaway": "Total investment: $100-300/month. ROI: Week one."
  }
}
```

---

### Data Visualization Generator

**File:** `scripts/generate-data-viz.js`

**Chart types:**
- `bar` - Vertical bar chart
- `horizontalBar` - Horizontal bar chart
- `doughnut` - Pie/donut chart
- `roi` - Specialized ROI comparison (investment vs returns)

**Usage:**
```bash
node scripts/generate-data-viz.js --slug hvac-ai-tools --type roi
```

**Brand compliance:**
- Dark background (#2D2D2D)
- Orange accent (#E8611A)
- Auto-calculates ROI percentage
- 1080x1080 LinkedIn-optimized

---

### Screenshot Carousel Generator

**File:** `scripts/generate-screenshot-carousel.js`

**Setup required:**
1. Create `slides/` folder in post directory
2. Add screenshots: `01-screenshot.png`, `02-screenshot.png`, etc.
3. Optionally create `screenshots.json` for custom labels

**Screenshot.json schema:**
```json
{
  "title": "Tool Walkthrough",
  "slides": [
    {
      "label": "Excel",
      "headline": "FROM checkboxes → TO patterns",
      "image": "01-excel.png",
      "description": "Explanatory text here",
      "annotations": ["Point 1", "Point 2"],
      "takeaway": "Key insight"
    }
  ]
}
```

---

## File Structure

```
scripts/
├── publish.sh                    # Post-publish workflow
├── generate-before-after.js      # Before/After comparison
├── generate-data-viz.js          # Charts and ROI visuals
├── generate-screenshot-carousel.js # Annotated screenshots
├── validate-metadata.js          # (existing)
├── generate-readme.js            # (existing)
└── create-post.js                # (existing)

skills/visuals/
└── linkedin-visuals.md           # Updated with new options

docs/plans/
└── 2026-02-16-visual-system-expansion-design.md  # This file
```

---

## Dependencies Added

```bash
npm install canvas chartjs-node-canvas
```

(For data visualization charts)

---

## Integration Points

### Interactive Workflow Update

When asking "What creative format?", options now include:
1. Carousel
2. Single Image
3. Infographic
4. **Before/After comparison** ← NEW
5. **Data visualization** ← NEW
6. **Screenshot carousel** ← NEW
7. Text-only

### Post-Creation Reminder

After any content creation, agent includes:
```
📌 WHEN YOU PUBLISH THIS POST:
Run: ./scripts/publish.sh <slug>
```

---

## Test Results

| Script | Test | Result |
|--------|------|--------|
| publish.sh | Run without args | ✅ Lists drafts |
| generate-before-after.js | HVAC post | ✅ Created PPTX |
| generate-data-viz.js | ROI chart | ✅ Created PNG |
| generate-screenshot-carousel.js | Help output | ✅ Shows usage |

---

## Future Enhancements

1. **Engagement tracking script** - `update-engagement.js` to pull LinkedIn metrics
2. **Automated safety scanner** - Grep for employment-unsafe keywords
3. **Template library** - Extract reusable carousel templates
4. **Batch generation** - Generate all visual types for a post in one command

---

## Conclusion

Implementation complete. The co-writter system now has:
- Clear publishing workflow with reminder prompts
- 7 creative visual types (up from 2-3)
- Fully automated generation for all new types
- Brand-compliant output (dark theme, orange accents)

**Time invested:** ~2.5 hours
**ROI:** Every future post benefits from expanded visual options

---

**End of Design Document**
