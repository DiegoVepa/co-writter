# Creative Variants Skill

**Skill:** `creative-variants`
**Location:** `/skills/visuals/creative-variants.md`
**Purpose:** Generate 5 distinct visual variants for any creative, then critique and recommend the best option.
**Dependencies:** Nano Banana MCP Server (Gemini Image Generation)

---

## 1. Overview

This skill implements a systematic approach to visual creation inspired by the PaperBanana agentic framework. Instead of generating a single image and hoping it works, this workflow produces **5 deliberate variants** and uses structured critique to select the strongest option.

### When to Use This Skill

| Scenario | Use Creative Variants? |
|----------|------------------------|
| High-stakes post (product launch, major insight) | Yes |
| A/B testing visuals for engagement | Yes |
| Exploring creative direction for new content pillar | Yes |
| Quick daily post with established template | No - use `linkedin-visuals.md` directly |
| Simple text-only post | No |
| Time-sensitive content (< 30 min to post) | No |

### What You Get

- 5 distinct image variants, each with a different creative angle
- Structured critique with scores on 4 dimensions
- Clear recommendation with reasoning
- All variants saved for potential future use

---

## 2. The 5 Variants

Each variant represents a different creative interpretation of the same content brief.

### Variant 1: Brand-Faithful

**Philosophy:** Exact adherence to brand specs. The "safe" choice that maintains visual consistency with existing content.

**Characteristics:**
- Exact brand colors: Orange #E8611A, Charcoal #2D2D2D, Cream #FDF6F0
- Standard template layout (light or dark per audience)
- Diego's photo in standard position (right side for light, bottom-right for dark)
- Orange outline icons, chevrons, @DiegoVences handle
- No creative risks

**Best for:** Maintaining feed consistency, when brand recognition matters most.

---

### Variant 2: Enhanced

**Philosophy:** Same concept as Brand-Faithful, but with elevated production quality and visual polish.

**Characteristics:**
- Same brand colors and layout
- Higher visual fidelity (better lighting, sharper contrasts)
- More refined typography hierarchy
- Subtle texture or depth additions
- Premium feel without changing the concept

**Best for:** Important announcements, when you want the "best version" of the standard approach.

---

### Variant 3: Layout Variation

**Philosophy:** Same content, different spatial arrangement. Tests how composition affects engagement.

**Characteristics:**
- Experiment with photo placement (left vs right, top vs bottom)
- Try different text alignment (centered vs left-aligned)
- Explore vertical vs horizontal emphasis
- Test card-based vs full-bleed layouts
- Different icon placement or grouping

**Best for:** A/B testing, discovering which layouts resonate with your audience.

---

### Variant 4: Mood Shift

**Philosophy:** Same content, different emotional energy. Explores how tone affects perception.

**Characteristics:**
- Adjust color temperature (warmer vs cooler orange tones)
- Shift lighting mood (bright/optimistic vs moody/serious)
- Typography weight changes (bold/confident vs light/approachable)
- Background treatment (solid vs gradient vs textured)
- Icon style variation (sharp vs rounded)

**Best for:** Testing emotional resonance, matching content tone to visual tone.

---

### Variant 5: Experimental

**Philosophy:** Push creative boundaries while staying recognizable as Diego's content. The "what if?" option.

**Characteristics:**
- Try unconventional compositions
- Explore the edges of the brand system
- Introduce one unexpected element (unusual angle, dramatic crop, etc.)
- Break one "rule" intentionally to see what happens
- Still uses brand colors but in unexpected ways

**Best for:** Creative exploration, standing out in the feed, testing audience appetite for novelty.

---

## 3. Workflow

### Step 1: Reference Analysis

Before generating anything, analyze the inputs:

**Content Analysis:**
```
- What is the core message?
- Who is the target audience? (Career / Agency / Both)
- What emotion should this evoke?
- What action should viewers take?
```

**Reference Image Analysis (if provided):**
```
- Exact visual style (colors, gradients, textures, lighting)
- Layout and composition (element arrangement, spacing, hierarchy)
- Typography (font styles, sizes, placement, color)
- Mood and tone (professional, playful, editorial, etc.)
- Unique design elements (shapes, patterns, decorative items)
```

**Brand Context:**
```
- Review /skills/visuals/brand-kit.md for color palette
- Review /skills/visuals/linkedin-visuals.md for template rules
- Check recent posts for current visual direction
- Note any specific constraints (photo required, dark mode only, etc.)
```

**Output:** A structured brief containing:
- Core message summary
- Target audience
- Desired emotional response
- Reference analysis (if applicable)
- Brand constraints to respect
- Creative freedoms available

---

### Step 2: Prompt Generation (5x)

For each variant, construct a detailed narrative prompt following this structure:

**Base Prompt Template:**
```
Generate a LinkedIn visual for the following content:

CONTENT BRIEF:
[Core message from Step 1]

VARIANT TYPE: [1-Brand Faithful / 2-Enhanced / 3-Layout Variation / 4-Mood Shift / 5-Experimental]

BRAND REQUIREMENTS:
- Primary accent color: Orange #E8611A
- Background: [#FFFFFF/#FDF6F0 for light] OR [#2D2D2D for dark]
- Text colors: [Black #1A1A1A on light] OR [White #FFFFFF on dark]
- Icon style: Orange outline, line art only
- Handle: @DiegoVences

SPECIFIC INSTRUCTIONS FOR THIS VARIANT:
[Variant-specific details from Section 2]

COMPOSITION:
- Dimensions: [1080x1080 / 1080x1350 / 1200x627]
- Photo integration: [Yes - cutout / Yes - with background / No]
- Text placement: [Specific layout instructions]

MOOD/TONE:
[Emotional direction for this variant]

OUTPUT:
A single, complete image ready for LinkedIn posting.
Do not include placeholder text - use the exact copy provided.
Ensure all text is legible at mobile viewing size.
```

**Variant-Specific Prompt Additions:**

| Variant | Add to Prompt |
|---------|---------------|
| 1. Brand-Faithful | "Follow the brand specifications exactly. No creative deviations. This should look like it belongs in the existing content feed." |
| 2. Enhanced | "Elevate the production quality. Add subtle depth, refined shadows, premium texture. Make it feel polished and high-end while maintaining brand specs." |
| 3. Layout Variation | "Experiment with composition. Try: [specific layout change]. Keep all brand elements but rearrange their spatial relationship." |
| 4. Mood Shift | "Adjust the emotional tone. Make it feel more [warm/cool/bold/subtle/energetic/calm]. Use lighting and color temperature to shift the mood." |
| 5. Experimental | "Take a creative risk. Break one convention while staying recognizable as Diego's content. Surprise the viewer while maintaining brand colors." |

---

### Step 3: Image Generation

Execute generation for all 5 variants using Nano Banana MCP:

**For each variant:**
1. Call `generate_image` with the constructed prompt
2. Save output to: `/content-library/[date]-[slug]/variants/variant-[1-5]-[type].png`
3. Log the exact prompt used to: `/content-library/[date]-[slug]/variants/prompts.md`

**File Structure:**
```
/content-library/YYYY-MM-DD-post-slug/
  /variants/
    variant-1-brand-faithful.png
    variant-2-enhanced.png
    variant-3-layout.png
    variant-4-mood.png
    variant-5-experimental.png
    prompts.md          # All 5 prompts for reproducibility
    critique.md         # Scores and recommendation
```

**Error Handling:**
- If generation fails (safety filter, API error), retry with slightly modified prompt
- Maximum 2 retries per variant
- If still failing, note in critique.md and proceed with successful variants

---

### Step 4: Self-Critique

Evaluate each generated variant on 4 dimensions:

**Dimension 1: Brand Alignment (1-10)**
```
Questions to assess:
- Does it use the correct brand colors? (#E8611A, #2D2D2D, #FDF6F0)
- Are icons in the correct style? (orange outline, not filled)
- Is the @DiegoVences handle present and correctly styled?
- Does it match the appropriate template? (light vs dark)
- Would this fit seamlessly in Diego's existing feed?

Scoring:
10 = Perfect brand adherence
7-9 = Minor deviations, still recognizable
4-6 = Noticeable brand drift
1-3 = Off-brand, wouldn't fit the feed
```

**Dimension 2: Readability (1-10)**
```
Questions to assess:
- Is all text legible at mobile size (viewed at ~375px width)?
- Is there sufficient contrast between text and background?
- Is the visual hierarchy clear? (headline > subhead > body)
- Are there any text overlaps or cutoffs?
- Can you understand the message in under 3 seconds?

Scoring:
10 = Crystal clear, instant comprehension
7-9 = Clear with minor effort
4-6 = Readable but requires focus
1-3 = Difficult to read, text issues present
```

**Dimension 3: Engagement Potential (1-10)**
```
Questions to assess:
- Does this stop the scroll? (visual hook strength)
- Is there a clear focal point?
- Does the composition guide the eye effectively?
- Would this stand out in a LinkedIn feed?
- Does it create curiosity or emotional response?

Scoring:
10 = Scroll-stopper, highly compelling
7-9 = Strong visual interest
4-6 = Decent but not distinctive
1-3 = Blends into feed noise
```

**Dimension 4: Content Fit (1-10)**
```
Questions to assess:
- Does the visual match the post's message?
- Is the tone appropriate for the target audience?
- Does it support (not distract from) the content?
- Would this help the post achieve its goal?
- Is the visual-to-text relationship balanced?

Scoring:
10 = Perfect content-visual harmony
7-9 = Strong alignment with minor gaps
4-6 = Adequate but could be better matched
1-3 = Disconnect between visual and content
```

**Composite Score:**
```
Total = (Brand Alignment × 0.25) + (Readability × 0.30) + (Engagement × 0.25) + (Content Fit × 0.20)

Weights reflect priorities:
- Readability highest (30%) — useless if can't be read
- Brand & Engagement tied (25% each) — both critical for LinkedIn
- Content Fit (20%) — important but more flexible
```

---

### Step 5: Recommendation

After scoring all variants, produce a final recommendation:

**Recommendation Format:**
```
## Creative Variants Critique

### Rankings

| Rank | Variant | Brand | Read | Engage | Fit | Total |
|------|---------|-------|------|--------|-----|-------|
| 1 | [name] | X/10 | X/10 | X/10 | X/10 | X.XX |
| 2 | [name] | X/10 | X/10 | X/10 | X/10 | X.XX |
| 3 | [name] | X/10 | X/10 | X/10 | X/10 | X.XX |
| 4 | [name] | X/10 | X/10 | X/10 | X/10 | X.XX |
| 5 | [name] | X/10 | X/10 | X/10 | X/10 | X.XX |

### Top Recommendation: [Variant Name]

**Why this one:**
[2-3 sentences explaining why this variant best serves the content goals]

**What makes it work:**
- [Specific strength 1]
- [Specific strength 2]
- [Specific strength 3]

**Minor refinements to consider:**
- [Optional tweak 1]
- [Optional tweak 2]

### Runner-Up: [Variant Name]

**When to use instead:**
[Scenario where #2 would be the better choice]

### Variants to Revisit Later

[Note any variants that showed promise for future content or A/B testing]
```

---

## 4. Prompt Templates by Content Type

### Carousel Title Slide

```
Generate a LinkedIn carousel title slide.

CONTENT:
- Headline: "[EXACT HEADLINE TEXT]"
- Subtitle: "[EXACT SUBTITLE TEXT]"
- Keywords to highlight in orange: [word1, word2]

VARIANT: [1-5]

BRAND SPECS:
- Background: [#FFFFFF for light / #2D2D2D for dark]
- Headline: Bold sans-serif, keywords in #E8611A, rest in [#1A1A1A / #FFFFFF]
- Subtitle: Regular weight, italic, [#6B6B6B / #AAAAAA]
- Photo: Diego cutout on right side (use diego-transparent.png reference)
- Icon: Orange #E8611A outline icon related to [topic] on left
- Handle: @DiegoVences bottom-left in orange pill
- Decorative: [Orange blob corners for light / Orange border for dark]

DIMENSIONS: 1080x1080 pixels

[VARIANT-SPECIFIC INSTRUCTIONS]
```

### Single Image Quote Card

```
Generate a LinkedIn quote card image.

CONTENT:
- Quote: "[EXACT QUOTE TEXT]"
- Attribution: @DiegoVences

VARIANT: [1-5]

STYLE:
- Cinematic/atmospheric background
- Dark moody tones with warm highlights matching #E8611A
- Text overlay: Large bold white text with orange keyword highlights
- Subtle depth of field effect
- Diego's circular profile photo, small, bottom-right

DIMENSIONS: 1080x1080 pixels

[VARIANT-SPECIFIC INSTRUCTIONS]
```

### Infographic

```
Generate a hand-drawn style infographic.

CONTENT:
- Title: "[TITLE]"
- Sections: [List of 3-5 sections with bullets]
- Key takeaway: "[TAKEAWAY]"

VARIANT: [1-5]

STYLE:
- Looks like a real photograph of a whiteboard/notebook
- Hand-drawn marker aesthetic
- Colors: Black marker (main), Orange #E8611A (highlights/emphasis), Charcoal (secondary)
- NO blue, red, or green markers
- Hand-drawn icons, arrows, boxes
- Slightly imperfect lines (authentic feel)

DIMENSIONS: 1080x1350 pixels (portrait)

CTA: "Follow @DiegoVences for more AI + Sales content"

[VARIANT-SPECIFIC INSTRUCTIONS]
```

### Before/After Comparison

```
Generate a before/after comparison visual.

CONTENT:
- Before column: [List of before states]
- After column: [List of after states]
- Headline: "[HEADLINE]"

VARIANT: [1-5]

LAYOUT:
- Split design: left = before, right = after
- Before side: Subtle red/coral tint or crossed-out styling
- After side: Clean, green checkmarks or highlighted styling
- Center divider: Thin line or arrow showing transformation
- Brand colors maintained: Orange #E8611A for emphasis

DIMENSIONS: 1080x1080 pixels

[VARIANT-SPECIFIC INSTRUCTIONS]
```

---

## 5. Integration with Existing Skills

### Trigger Points

This skill should be offered when:

1. **User explicitly requests variants:**
   - "Give me options"
   - "Generate a few versions"
   - "I want to A/B test"

2. **High-stakes content detected:**
   - Post tagged as `priority: high` in metadata
   - Content pillar is a new direction
   - Post announces something significant

3. **Creative exploration mode:**
   - User says "I'm not sure what visual style"
   - Testing new template or theme
   - First post in a new content series

### Workflow Integration

**Standard flow (linkedin-visuals.md):**
```
Content → Single visual → Review → Post
```

**Enhanced flow (creative-variants.md):**
```
Content → 5 variants → Critique → Recommend → User selects → Post
         ↳ Save unused variants for future reference
```

### AskUserQuestion Integration

When offering this skill:

```javascript
{
  "question": "This seems like an important post. Want me to generate 5 creative variants and recommend the best one?",
  "header": "Variants",
  "options": [
    {"label": "Yes, generate variants", "description": "5 options with critique and recommendation"},
    {"label": "No, single image", "description": "Standard generation from linkedin-visuals.md"},
    {"label": "Just Brand-Faithful + Experimental", "description": "Quick comparison of safe vs bold"}
  ],
  "multiSelect": false
}
```

---

## 6. Quality Checklist

Before delivering variants to user:

- [ ] All 5 variants generated successfully (or documented why not)
- [ ] Each variant is visually distinct from the others
- [ ] All variants use correct brand colors (#E8611A, #2D2D2D, #FDF6F0)
- [ ] All text is legible at mobile size
- [ ] Prompts saved to prompts.md for reproducibility
- [ ] Scores calculated for all 4 dimensions
- [ ] Clear recommendation with reasoning provided
- [ ] Files organized in /variants/ subfolder
- [ ] No employment-unsafe language in any visual

---

## 7. Example: Full Workflow

**Input:** Generate variants for HVAC AI Tools carousel title slide

**Step 1 Output (Brief):**
```
Core message: 5 AI tools saving HVAC contractors 10+ hours/week
Audience: Agency Build (SMB owners)
Emotion: Curiosity + "I need this"
Template: Dark mode (audience = agency)
Photo: Yes, Diego cutout
Constraints: Must include "HVAC" and "10+ HOURS/WEEK" prominently
```

**Step 3 Output (Files):**
```
/content-library/2026-02-16-hvac-ai-tools/variants/
  variant-1-brand-faithful.png    # Exact dark template
  variant-2-enhanced.png          # Same but premium polish
  variant-3-layout.png            # Photo on left, text right
  variant-4-mood.png              # Warmer orange tones, energetic
  variant-5-experimental.png      # Bold crop, text overlapping photo edge
  prompts.md
  critique.md
```

**Step 5 Output (Recommendation):**
```
Top Recommendation: Variant 2 (Enhanced)

Why: Maintains perfect brand alignment while the elevated production
quality makes it stand out. The premium feel signals "this content
is worth your time" to busy SMB owners scrolling LinkedIn.

Runner-up: Variant 4 (Mood Shift) — Use if audience testing shows
preference for warmer, more energetic visuals.
```

---

**End of Skill: creative-variants**
