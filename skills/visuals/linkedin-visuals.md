# Visual Asset Creation Skill

**Skill:** `linkedin-visuals`
**Location:** `/skills/visuals/linkedin-visuals.md`
**Purpose:** Generate LinkedIn-ready visual assets for every post using Canva MCP and/or Nano Banana (Gemini Image Generation) MCP.
**Dependencies:** At least one of: Canva MCP Server, Nano Banana MCP Server

---

## 1. Overview

This skill extends the co-writter agent to produce visual assets alongside every LinkedIn post. When content is generated, the agent should also produce the matching creative — either through Canva (for template-based, branded designs) or Nano Banana (for AI-generated imagery and custom illustrations).

**The agent should always propose visuals as part of Step 5 in the Activation Protocol (CLAUDE.md Section 12).**

---

## 2. MCP Server Setup

### Option A: Canva MCP Server

The Canva MCP Server connects Claude Code directly to your Canva account. It can create designs, autofill templates, find existing designs, and export as PDF/PNG.

**Add to Claude Code:**
```bash
claude mcp add canva-mcp --transport http https://mcp.canva.com/mcp
```

**Or add to `.mcp.json` in project root:**
```json
{
  "mcpServers": {
    "canva": {
      "type": "url",
      "url": "https://mcp.canva.com/mcp",
      "name": "canva-mcp"
    }
  }
}
```

**Canva capabilities available:**
- `create_design` — Create new designs from scratch or templates
- `autofill_design` — Fill branded templates with dynamic content
- `find_designs` — Search existing designs in your account
- `export_design` — Export as PNG, PDF, or other formats
- `list_templates` — Browse available templates

**Best for:** Carousel PDFs, branded framework graphics, consistent template-based posts, comparison tables, multi-slide content.

---

### Option B: Nano Banana MCP Server (Gemini Image Generation)

Nano Banana wraps Google's Gemini image generation API (gemini-2.5-flash-image or gemini-3-pro-image-preview) and exposes it as MCP tools.

**Add to Claude Code:**
```bash
claude mcp add nano-banana -- npx nano-banana-mcp
```

**Or add to `.mcp.json` in project root:**
```json
{
  "mcpServers": {
    "nano-banana": {
      "command": "npx",
      "args": ["nano-banana-mcp"],
      "env": {
        "GEMINI_API_KEY": "${GEMINI_API_KEY}"
      }
    }
  }
}
```

**Prerequisites:**
- Google AI Studio API key (free tier: ~100 images/day)
- Get your key at: https://aistudio.google.com/apikey
- Set as environment variable: `export GEMINI_API_KEY="your-key-here"`

**Nano Banana capabilities available:**
- `generate_image` — Create images from text prompts
- `edit_image` — Modify existing images with text instructions
- `compose_images` — Combine multiple reference images

**Best for:** Hero images with Diego's photo composite, custom background scenes, AI-themed imagery, stylized quote cards with atmospheric backgrounds.

---

### Option C: Both (Recommended)

Use both servers simultaneously. The agent decides which tool to use based on the visual type needed:

| Visual Type | Use Canva | Use Nano Banana |
|---|---|---|
| Carousel slides (multi-page) | ✅ Primary | |
| Framework diagrams with precise layout | ✅ Primary | |
| Comparison tables (Old vs New) | ✅ Primary | |
| Branded templates (consistent look) | ✅ Primary | |
| Hero/cover images with atmospheric backgrounds | | ✅ Primary |
| Photo-realistic scenes (robots, tech imagery) | | ✅ Primary |
| Quote cards with cinematic backgrounds | | ✅ Primary |
| Before/after split comparisons | ✅ | |
| Icon-heavy infographics | ✅ Primary | |
| CTA slides | ✅ Primary | |

---

## 3. BRAND SYSTEM (CRITICAL — FOLLOW EXACTLY)

### 3.1 Color Palette

```
=== PRIMARY BRAND COLORS ===

Orange (Primary Accent):     #E8611A
  - Used for: highlighted keywords, CTA buttons, icon outlines,
    chevron arrows, underlines, border accents
  - This is THE brand color. It appears on every single slide.

Black (Headlines):           #1A1A1A
  - Used for: bold headline text on light backgrounds

Dark Charcoal (Dark Mode BG): #2D2D2D
  - Used for: dark slide backgrounds (carousel type 2)

White (Light Mode BG):       #FFFFFF
  - Used for: light slide backgrounds (carousel type 1)

Cream/Off-White:             #FDF6F0
  - Used for: subtle warm background tint on light slides

White Text:                  #FFFFFF
  - Used for: body text on dark backgrounds

Gray Text:                   #6B6B6B
  - Used for: secondary/supporting text, source citations

Orange Gradient Blobs:       #E8611A at ~15% opacity
  - Used for: decorative corner shapes on light-mode slides only
```

### 3.2 Typography Rules

**Headlines (Light Slides):**
- Bold sans-serif, mixed weight for emphasis
- KEY WORDS in orange (#E8611A), rest in black
- Some words fully UPPERCASE for punch
- Example: "MOST AI WRITING **FAILS** BEFORE THE FIRST SENTENCE"
  - "MOST AI WRITING" = orange, bold
  - "FAILS" = black, bold
  - "BEFORE THE FIRST SENTENCE" = black, bold

**Headlines (Dark Slides):**
- Bold sans-serif in white
- KEY WORDS highlighted in orange
- Example: "Integration **beats** innovation"
  - "Integration" = white, bold
  - "beats" = orange, bold
  - "innovation" = white, regular/light weight

**Body Text:**
- Clean sans-serif (Inter, Source Sans Pro, or similar)
- Regular weight, good line spacing
- Light slides: black or dark gray text
- Dark slides: white or light gray text

**CTA Buttons/Pills:**
- Rounded pill shape (border-radius: 999px)
- Orange (#E8611A) background
- White bold text inside
- Used for key takeaways or action phrases
- Examples: "More time fixing output than thinking." / "Connect it first, improve it later."

**Callout Text:**
- Italic for subtitles and supporting context
- Example: "Not because of the model, because of lost context."

### 3.3 Icons & Graphics

**Style:** Line art / outline icons only
- Stroke color: Orange (#E8611A) on light backgrounds
- Stroke color: Orange (#E8611A) on dark backgrounds
- NO filled/solid icons
- NO gradient icons
- Clean, simple, recognizable silhouettes
- Think: Flaticon outline style or Lucide icons

**Common icon subjects used:**
- Laptop with screen content
- AI/chip/circuit board
- Clipboard with checklist
- Chat/speech bubbles
- Pencil/writing tools
- Building icons (for organizations)
- Gear/settings icons
- Brain/head with tech elements

**Chevron Arrows (>>>):**
- Orange (#E8611A)
- 3 nested chevrons pointing right
- Placed at bottom-right of slides
- Indicates "swipe to next slide"
- Approximately 40-50px size

### 3.4 Diego's Photo Usage

**Light carousel (cutout style):**
- Professional photo of Diego
- Background removed (transparent/cutout)
- Standing pose, holding tablet or gesturing
- Placed on right side of title slide
- Black polo shirt
- Smiling, approachable, confident

**Dark carousel (with background):**
- Professional photo of Diego
- Natural background or dark setting
- Placed at bottom-right of title or final slide
- Casual/smart casual attire
- Scaled to about 30-40% of slide width

**Photo files should be stored at:** `/assets/photos/diego-cutout.png` and `/assets/photos/diego-dark.png`

### 3.5 Branding Elements

**Handle:** `@DiegoVences`
- Always present on first and/or last slide
- Light slides: black text, bottom-left, with orange rounded background or plain
- Dark slides: white text, bottom-right corner
- Small size, not overpowering

**Decorative Blobs (Light Slides Only):**
- Organic, rounded shapes
- Orange (#E8611A) at ~10-15% opacity
- Placed at corners (top-left, bottom-right typically)
- Soft, gradient edges
- Creates warmth without distraction
- NEVER used on dark slides

**Orange Border Lines (Dark Slides Only):**
- Thin orange (#E8611A) border around card edges
- Rounded corners (border-radius: ~12-16px)
- Creates defined card containers on dark backgrounds
- Some slides have double-border effect (outer + inner)

---

## 4. SLIDE TEMPLATES

### Template 1: LIGHT CAROUSEL (White Background)

Used for: Career Pivot content (Segment A), thought leadership, personal narrative posts.

**Slide 1 — Title/Hook Slide (Light)**
```
Layout:
┌──────────────────────────────────────────┐
│ [orange blob, top-left corner, subtle]   │
│                                          │
│  HEADLINE LINE 1          [Diego photo   │
│  HEADLINE LINE 2           cutout,       │
│  HEADLINE LINE 3           right side]   │
│                                          │
│  Subtitle in italic,                     │
│  smaller text.                           │
│                                          │
│  [orange line-art icon,                  │
│   bottom-left area]                      │
│                                          │
│  ┌─────────────────┐                     │
│  │ @DiegoVences    │          [blob,     │
│  └─────────────────┘      bottom-right]  │
└──────────────────────────────────────────┘

Typography:
- Headline: Bold sans-serif, mixed orange + black
- Key words in orange (#E8611A)
- Contrasting words in black (#1A1A1A)
- Some words UPPERCASE for emphasis
- Subtitle: Regular weight, dark gray, italic

Photo: Diego cutout on right, ~40% of width
Icon: Orange outline icon related to topic, left side
Handle: @DiegoVences in orange pill or plain, bottom-left
Blobs: Subtle orange shapes at top-left and bottom-right corners
```

**Slide 2+ — Content Slides (Light)**
```
Layout:
┌──────────────────────────────────────────┐
│ [orange blob, top-left or top-right]     │
│                                          │
│  [icon]              [icon]              │
│                                          │
│  Section Title 1     Section Title 2     │
│  (orange keywords)   (orange keywords)   │
│                                          │
│  Body text in        Body text in        │
│  regular weight.     regular weight.     │
│  Short paragraphs.   Short paragraphs.   │
│                                          │
│  ┌──────────────────────────────────┐    │
│  │ Key takeaway in orange pill      │    │
│  └──────────────────────────────────┘    │
│                                          │
│                              >>>         │
│                        [orange chevrons] │
└──────────────────────────────────────────┘

Typography:
- Section titles: Bold, with key words in orange
- Body: Regular weight, black, short sentences
- Takeaway pill: Orange bg, white bold text
- Two-column layout when comparing concepts

Icons: Orange outline, placed above each section
Chevrons: Orange >>>, bottom-right, indicating swipe
Flow lines: Thin orange connector lines between sections (optional)
```

**Final Slide — Closing/CTA (Light)**
```
Layout:
┌──────────────────────────────────────────┐
│                                          │
│  Section content     Section content     │
│  (two columns)       (two columns)       │
│                                          │
│  • Bullet points     Contrasting bold    │
│  • With details      statement.          │
│                                          │
│  ┌──────────────────────────────────┐    │
│  │ Closing insight in orange pill   │    │
│  └──────────────────────────────────┘    │
│                                          │
│  ┌──────────────────────────────────┐    │
│  │ Big closing statement across     │    │
│  │ full width — bold + impactful    │    │
│  └──────────────────────────────────┘    │
│                                          │
│                         @DiegoVences     │
└──────────────────────────────────────────┘

The closing statement often sits in a colored block (orange bg or dark bg with white text).
```

---

### Template 2: DARK CAROUSEL (Charcoal Background)

Used for: Agency Build content (Segment B), data-driven posts, industry observations, comparison posts.

**Slide 1 — Title/Hook Slide (Dark)**
```
Layout:
┌──────────────────────────────────────────┐
│ [orange decorative element, top-left]    │
│                           @DiegoVences   │
│                                          │
│  HEADLINE LINE 1                         │
│  HIGHLIGHTED WORDS IN ORANGE             │
│  REST OF HEADLINE                        │
│                                          │
│  ┌─────────────┐  ┌──────────────────┐   │
│  │ Orange card  │  │ Comparison       │   │
│  │ with bullet  │  │ table/content    │   │
│  │ points       │  │ Old vs New       │   │
│  │              │  │                  │   │
│  └─────────────┘  └──────────────────┘   │
│                                          │
│  Closing quote in italic      [Diego     │
│                                photo]    │
│                                          │
│                         @DiegoVences     │
└──────────────────────────────────────────┘

Background: #2D2D2D
All borders: thin orange (#E8611A) with rounded corners
Orange card: orange fill (#E8611A) with white text for key content
Comparison section: dark card with orange border, white text
Diego photo: bottom-right, with natural/dark background
Headline: White + orange highlighted words
```

**Slide 2+ — Content Slides (Dark)**
```
Layout:
┌──[ orange border ]───────────────────────┐
│                                          │
│  Headline with                           │
│  orange keywords                         │
│                                          │
│  [row of icons — orange outline]         │
│                                          │
│  Stat in LARGE orange text               │
│  Supporting text in white                │
│                                          │
│  ┌──────────────────────────────────┐    │
│  │ Key insight in orange pill       │    │
│  │ (orange bg, white text)          │    │
│  └──────────────────────────────────┘    │
│                                          │
│                              >>>         │
└──[ orange border ]───────────────────────┘

Background: #2D2D2D
Border: Thin orange line around entire slide with rounded corners
Stats: Large orange text for numbers (e.g., "11%")
Body: White text, regular weight
Icons: Orange outline, inline or in rows
Pill CTA: Orange background, white text, rounded
Chevrons: Orange >>>, bottom-right
```

**Final Slide — Closing (Dark)**
```
Layout:
┌──[ orange border ]───────────────────────┐
│                                          │
│  [orange outline icon, centered]         │
│                                          │
│  Bold headline                           │
│  with orange keyword                     │
│                                          │
│  Supporting statement in                 │
│  white, lighter weight.                  │
│                                          │
│  ┌──────────────────────────────────┐    │
│  │ Final CTA in orange pill         │    │
│  └──────────────────────────────────┘    │
│                                          │
│  Source: Citation, year.  @DiegoVences   │
└──[ orange border ]───────────────────────┘

Centered composition.
Icon at top, large and prominent.
Headline below with mixed white/orange.
Source citation in small gray text, bottom-left.
Handle bottom-right.
```

---

### Template 3: SINGLE IMAGE POST (Quote/Insight Card)

Used for: Strong one-liner posts, hook images, atmospheric statement posts.

**Style A — Cinematic Background**
```
Layout:
┌──────────────────────────────────────────┐
│                                          │
│  [Atmospheric/cinematic background       │
│   e.g., AI robot silhouette,             │
│   futuristic scene, moody lighting]      │
│                                          │
│     Large headline text                  │
│     with orange keywords                 │
│     and white regular text               │
│                                          │
│     >>>                                  │
│              [small Diego photo circle]  │
│              @DiegoVences                │
└──────────────────────────────────────────┘

Background: Generated via Nano Banana — atmospheric, dark, cinematic
Text: Large, bold, left-aligned
Orange highlights on key words
White for remaining text
Diego's circular profile photo, small, bottom-right
Chevrons if part of carousel
```

---

## 5. Prompt Templates

### 5.1 Nano Banana — Cinematic Quote Card Background
```
Generate a moody, cinematic background image for a LinkedIn post.

Scene: [description — e.g., "side profile silhouette of a humanoid
robot looking upward, with warm bokeh lights in the background"]

Style: Dark, atmospheric, editorial photography quality.
Warm color temperature with deep shadows. Slightly out of focus
for use as a text background layer.

Dimensions: 1080x1080 pixels.
No text in the image. This will be used as a background with text
overlay added separately.

Color mood: Deep charcoal blacks with subtle warm orange/amber
highlights matching #E8611A.
```

### 5.2 Nano Banana — Photo Composite Background
```
Generate a professional background scene for compositing a person's
photo onto.

Scene: [description — e.g., "modern tech office with ambient
lighting" or "dark gradient background with subtle tech elements"]

Style: Professional, clean, suitable for LinkedIn.
Color mood: [Dark charcoal #2D2D2D tones] OR [Light cream/white tones]

Dimensions: 1200x627 pixels (landscape) or 1080x1080 (square).
No people in the image — a person's cutout photo will be composited
on top.
```

### 5.3 Canva — Light Carousel
```
Create a LinkedIn carousel (1080x1080 per slide, export as PDF).
Use these brand specifications EXACTLY:

COLORS:
- Background: White (#FFFFFF) with subtle cream tint (#FDF6F0)
- Primary accent: Orange (#E8611A)
- Headlines: Black (#1A1A1A) with orange highlighted words
- Body text: Dark gray/black
- CTA pills: Orange background (#E8611A), white text

DECORATIVE ELEMENTS:
- Soft orange blob shapes at corners (orange at 10-15% opacity)
- Orange outline icons (line art style, not filled)
- Orange chevron arrows (>>>) at bottom-right of each slide
- Thin orange connector lines between sections where applicable

SLIDE 1 (Title):
- Headline: "[TITLE]" — key words in orange, rest in black, BOLD
- Subtitle: "[subtitle]" in italic, smaller
- Diego's photo cutout on right side
- Orange outline icon on left side related to topic
- @DiegoVences in bottom-left

SLIDE 2 (Content):
[Specific content for this slide — two columns if comparing concepts]
- Section titles with orange keywords
- Short body text paragraphs
- Orange pill with key takeaway at bottom
- Orange >>> bottom-right

SLIDE 3 (Content):
[Specific content for this slide]

SLIDE N (Closing):
- Big closing statement in bold
- Orange pill or colored block with final insight
- @DiegoVences at bottom

TYPOGRAPHY: Bold sans-serif for headlines, regular sans-serif for body.
```

### 5.4 Canva — Dark Carousel
```
Create a LinkedIn carousel (1080x1080 per slide, export as PDF).
Use these brand specifications EXACTLY:

COLORS:
- Background: Dark charcoal (#2D2D2D)
- Primary accent: Orange (#E8611A)
- Headlines: White with orange highlighted keywords
- Body text: White (#FFFFFF)
- Card borders: Thin orange (#E8611A) lines, rounded corners (~12px)
- CTA pills: Orange background (#E8611A), white bold text
- Stats/numbers: Large orange text

DECORATIVE ELEMENTS:
- Thin orange border around entire slide (rounded corners)
- Orange outline icons (line art, not filled)
- Orange chevron arrows (>>>) at bottom-right
- NO blob shapes (those are light-mode only)
- Orange-filled cards for primary content sections

SLIDE 1 (Title):
- Orange decorative stars/elements top-left
- @DiegoVences top-right
- Headline: "[TITLE]" — white text with orange highlighted words
  Some words may have orange background highlight (knockout text)
- Content area: Split into orange card (key points) + comparison table
- Diego's photo bottom-right
- Closing quote in italic at bottom
- @DiegoVences bottom area

SLIDE 2 (Content):
- Full orange border around slide
- Headline with orange keywords
- Row of orange outline icons
- Large stat in orange (e.g., "11%")
- Supporting text in white
- Orange pill takeaway at bottom
- Orange >>> bottom-right

SLIDE 3 (Content):
- Orange border
- Numbered list (1 2 3) with bold statements
- Orange outline icons next to each point
- Orange pill with final insight

SLIDE N (Closing):
- Orange border
- Centered orange outline icon at top
- Bold headline with orange keyword
- Supporting statement in lighter white
- Orange pill CTA
- Source citation in gray, bottom-left
- @DiegoVences bottom-right

TYPOGRAPHY: Bold sans-serif for headlines, regular for body.
```

### 5.5 Canva — Single Post Image
```
Create a single LinkedIn post image (1080x1080 or 1200x627).

STYLE: [Light/Dark] mode
[Follow the matching brand specs from above]

Content: "[Main headline or quote]"
Highlight these words in orange: [specific words]
Rest of text in [black/white depending on mode]

Include:
- Orange outline icon related to topic
- @DiegoVences
- [Diego's photo if applicable]
- [Orange >>> if part of a swipeable set]
```

---

## 6. Decision Matrix: Which Template to Use

| Post Audience | Post Type | Template | Tool |
|---|---|---|---|
| Career Pivot (Segment A) | Framework/model | Light Carousel | Canva |
| Career Pivot (Segment A) | Personal narrative | Light Carousel | Canva |
| Career Pivot (Segment A) | Bold insight/quote | Cinematic Quote Card | Nano Banana + text overlay |
| Agency Build (Segment B) | Comparison/data | Dark Carousel | Canva |
| Agency Build (Segment B) | Industry observation | Dark Carousel | Canva |
| Agency Build (Segment B) | ROI/case study | Dark Carousel | Canva |
| Both Audiences | Tool review | Light or Dark | Canva |
| Both Audiences | Single hook image | Quote Card | Nano Banana + Canva overlay |
| Both Audiences | Framework share | Light Carousel | Canva |

---

## 7. Integration with Content Workflow

### Updated Activation Protocol (extends CLAUDE.md Section 12)

After **Step 4: Draft with Structure**, add:

**Step 4.5: Generate Visual Asset**

1. **Determine audience segment** — selects Light (Career) or Dark (Agency) template
2. **Determine content type** — selects specific template variant
3. **Check which MCP servers are available:**
   - If Canva available — Use for all structured layouts and carousels
   - If Nano Banana available — Use for atmospheric backgrounds and hero images
   - If both — Use the best fit per decision matrix (Section 6)
4. **Construct the prompt** using templates from Section 5, filling in:
   - Exact headline with which words are orange vs black/white
   - Exact body text per slide
   - Which icon subjects to use
   - Which template (light/dark)
5. **Generate the visual** and save to `/content-library/visuals/[post-slug]/`
6. **Iterate if needed:**
   - Canva: modify the design directly via MCP
   - Nano Banana: use `edit_image` with refinement instructions

### File Organization
```
/content-library/
  /visuals/
    /[YYYY-MM-DD]-[post-slug]/
      slide-01.png
      slide-02.png
      slide-03.png
      carousel.pdf
      hero.png
      background.png         # Nano Banana generated background
      prompt-used.md          # The prompt for reproducibility
```

---

## 8. Visual Asset Specs Quick Reference

| Asset | Dimensions | Format | Slides |
|---|---|---|---|
| LinkedIn carousel | 1080 x 1080 px/slide | PDF | 3-8 slides |
| LinkedIn single image | 1080 x 1080 px | PNG | 1 |
| LinkedIn landscape | 1200 x 627 px | PNG | 1 |
| Background for composite | 1080 x 1080 px | PNG | 1 |

---

## 9. Quality Checklist

Before delivering any visual asset, verify:

- [ ] Uses correct palette: Orange #E8611A as primary accent
- [ ] Light slides: white/cream bg, black text, orange highlights, blob shapes
- [ ] Dark slides: charcoal #2D2D2D bg, white text, orange highlights, orange borders
- [ ] CTA pills are orange bg with white text, rounded
- [ ] Icons are orange OUTLINE style (not filled, not gradient)
- [ ] Orange chevrons (>>>) present on carousel slides (bottom-right)
- [ ] @DiegoVences handle present on first and/or last slide
- [ ] Diego's photo included on title slide (cutout for light, natural for dark)
- [ ] Text is readable at mobile size
- [ ] No employment-unsafe language anywhere in visual text
- [ ] Headline uses mixed emphasis (orange keywords + black/white remaining)
- [ ] Exported as PNG (single) or PDF (carousel)
- [ ] Prompt saved in `prompt-used.md` for future iteration

---

## 10. Example: Full Workflow

**Input:** "Write a post about turning sales objections into product insights"

**Agent determines:**
- Audience: Career Pivot (Segment A)
- Template: **Light Carousel** (3 slides)
- Tool: **Canva MCP**

**Slide plan:**

| Slide | Headline | Content | Elements |
|---|---|---|---|
| 1 | "SALES OBJECTIONS aren't blockers. They're PRODUCT FEEDBACK." | Subtitle: "Stop handling them. Start logging them." | Diego cutout right, orange AI/clipboard icon left, @DiegoVences bottom-left, orange blobs |
| 2 | "The **Objection → Insight** Pipeline" | 4-step framework: Capture → Pattern → Signal → Route. Two columns with icons. | Orange outline icons per step, orange connector lines, orange pill: "Stop interpreting. Start capturing." Orange >>> |
| 3 | "The best salespeople aren't just **closers.**" | "They're the closest thing product teams have to real-time user research." | Full-width closing statement in bold. Orange pill: "Product thinking applied to sales." @DiegoVences bottom |

**Agent constructs Canva prompt using Template 5.3 and generates.**

---

## 11. Troubleshooting

| Issue | Solution |
|---|---|
| Canva MCP not connecting | Run `claude mcp list` to verify. Re-authorize at canva.com settings → Integrations. |
| Nano Banana rate limited (429) | Free tier hit. Wait or upgrade. Model auto-falls back from Pro to Flash. |
| Colors don't match | Always use hex codes: orange #E8611A, dark #2D2D2D, white #FFFFFF. Never rely on color names. |
| Icons look filled/solid | Specify "outline style, line art, not filled, stroke only" in prompts. |
| Text not readable on dark bg | Ensure white #FFFFFF text, minimum 16px equivalent. |
| Blobs appearing on dark slides | Blobs are LIGHT MODE ONLY. Remove from dark slide prompts. |
| Orange borders on light slides | Borders are DARK MODE ONLY. Remove from light slide prompts. |
| Carousel slides inconsistent | Use same Canva template for all slides in a set. |

---

## 12. Interactive Visual Workflow

**CRITICAL:** After post content is finalized, follow this interactive decision flow before creating any visuals.

### Step 0: LinkedIn Style Check (Optional)

If Chrome extension is available and connected:
1. Navigate to user's LinkedIn recent posts
2. Screenshot 2-3 recent visuals for style reference
3. Note patterns: light vs dark, photo usage, layout consistency
4. Suggest template that matches existing style

If Chrome extension unavailable, skip to Step 1.

### Step 1: Creative Type Selection

**Always ask first:**

```
What type of creative do you want for this post?

1. Carousel (multi-slide, swipeable) - Best for frameworks, step-by-step, tutorials
2. Single Image (quote card, hook) - Best for bold statements, hooks
3. Infographic (data/stats visual) - Best for proof points, research findings
4. GIF/Animation (motion) - Best for engagement, simple demos
5. Video (full motion graphics) - Best for tutorials, walkthroughs
6. Case Study Essay (long-form) - Best for Substack deep dives
7. Text-only (no visual needed)
```

**Use AskUserQuestion tool with these options.**

### Step 2: Photo Integration

**After creative type is selected, ask:**

```
Do you want to include your photo in this creative?

1. Yes - use existing cutout photo (/assets/photos/diego-cutout.png)
2. Yes - use existing dark background photo (/assets/photos/diego-dark.png)
3. Yes - generate new photo composite via Nano Banana (I'll ask for scene description)
4. No photo needed for this one
```

**Photo file locations:**
- Cutout (transparent bg): `/assets/photos/diego-cutout.png`
- Dark background: `/assets/photos/diego-dark.png`
- Generated composites: Save to `/assets/photos/generated/`

**If user selects Nano Banana generation:**
Ask: "Describe the scene or background you want for the photo composite (e.g., 'modern tech office', 'dark gradient with subtle tech elements', 'standing at whiteboard')"

### Step 3: Template Style Selection

**Ask:**

```
Which template style?

1. Light mode (cream #FDF6F0 background) - Warm, professional, Career Pivot audience
2. Dark mode (charcoal #2D2D2D background) - Bold, modern, Agency Build audience
3. Auto - Let me decide based on audience segment
```

**Auto-selection logic:**
- If `audience: "career"` in metadata → Light mode
- If `audience: "agency"` in metadata → Dark mode
- If `audience: "both"` in metadata → Ask user to choose

### Step 4: Generate & Preview

1. Create visual assets (HTML slides, images, etc.)
2. Start local HTTP server: `python3 -m http.server 8765`
3. Navigate with Playwright and take screenshots
4. Show all visuals to user for review

**Ask:**
```
Here are your visuals for review. Do you approve, or would you like changes?

1. Approved - Generate final export
2. Changes needed - (specify what to change)
```

### Step 5: Iterate or Export

**If changes needed:**
- Ask: "What would you like to change? (colors, text, layout, photo placement, etc.)"
- Make modifications
- Return to Step 4 (preview again)

**If approved:**
1. Generate final PPTX (for carousels): `node generate-carousel.js`
2. Export PNG files for individual slides
3. Save all assets to content library folder
4. Update metadata.json with asset paths
5. Commit and push to GitHub

---

## 13. Interactive Workflow Code Reference

### AskUserQuestion for Creative Type
```javascript
// Use this structure when asking about creative type
{
  "question": "What type of creative do you want for this post?",
  "header": "Creative Type",
  "options": [
    {"label": "Carousel", "description": "Multi-slide, swipeable - frameworks, tutorials"},
    {"label": "Single Image", "description": "Quote card, hook - bold statements"},
    {"label": "Infographic", "description": "Data/stats visual - proof points"},
    {"label": "GIF/Animation", "description": "Motion graphics - engagement"},
    {"label": "Video", "description": "Full motion - tutorials, walkthroughs"},
    {"label": "Text-only", "description": "No visual needed"}
  ],
  "multiSelect": false
}
```

### AskUserQuestion for Photo
```javascript
{
  "question": "Include your photo in this creative?",
  "header": "Photo",
  "options": [
    {"label": "Existing cutout", "description": "Use diego-cutout.png (transparent bg)"},
    {"label": "Existing dark bg", "description": "Use diego-dark.png"},
    {"label": "Generate new", "description": "Create via Nano Banana (I'll ask for scene)"},
    {"label": "No photo", "description": "Skip photo for this one"}
  ],
  "multiSelect": false
}
```

### AskUserQuestion for Template
```javascript
{
  "question": "Which template style?",
  "header": "Template",
  "options": [
    {"label": "Light mode", "description": "Cream background - warm, professional"},
    {"label": "Dark mode", "description": "Charcoal background - bold, modern"},
    {"label": "Auto", "description": "Decide based on audience segment"}
  ],
  "multiSelect": false
}
```

---

**End of Skill: linkedin-visuals**
