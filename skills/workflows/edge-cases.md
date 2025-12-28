# Edge Cases & Exceptions - Non-Standard Request Handling

**Version:** 1.0
**Last Updated:** 2025-12-27

---

## Purpose

This SOP handles content requests that don't fit standard templates. Use this when the request falls outside normal patterns or when standard SOPs conflict.

**When to use this SOP:**
- Request doesn't match any standard content type
- Need to deviate from normal guidelines
- Audience/platform combination is unusual
- Safety filter creates uncertainty
- Multiple SOPs provide conflicting guidance

---

## General Principles for Edge Cases

### Principle 1: Ask, Don't Assume
When request is ambiguous, ask the user for clarification rather than guessing.

**Example:**
```
Request: "Write something about AI"

Don't assume: Platform, audience, angle, length
Instead ask: "I can approach this several ways:
- LinkedIn post for Career audience (product thinking angle)
- X thread for Agency audience (boring business angle)
- Substack essay (deep technical dive)

Which direction interests you?"
```

---

### Principle 2: Adapt, Don't Force
If content doesn't fit a template, adapt the template—don't force content into wrong format.

**Example:**
```
Request: "Write a 600-word LinkedIn post explaining this framework"

Problem: Too long for standard post, too short for carousel
Don't force: Into standard 300-word post format
Instead: Propose alternatives:
1. Break into 2-part post series
2. Create carousel (visual format works better)
3. Move to Substack (better platform for length)
```

---

### Principle 3: Safety First, Always
When in doubt about employment safety, err on the side of caution.

**Rule:** If you can't clearly classify it as "safe," it's unsafe.

---

## Edge Case Categories

### Category 1: Non-Standard Formats

**Requests that don't fit existing content types:**

#### Video Script Request
**Problem:** No video SOP exists

**Solution:**
1. Ask: "Is this for LinkedIn video, YouTube, or something else?"
2. Adapt closest format:
   - LinkedIn video: Use linkedin-post.md structure, add visual/audio cues
   - YouTube: Use substack-essay.md depth, add timestamps
3. Note limitations: "I'll draft the script, but can't advise on video production specifics."

**Example Output:**
```
[VISUAL: You at desk with laptop]

HOOK (0:00-0:05):
"Everyone's building AI chatbots. The real opportunity? Automating no-shows."

[VISUAL: Cut to screen recording of automation workflow]

SETUP (0:05-0:30):
"My friend runs a plumbing company. He was losing $2K/month to no-shows..."
```

---

#### Podcast Outline/Show Notes
**Problem:** No podcast SOP exists

**Solution:**
1. Use substack-essay.md as structural base
2. Adapt for spoken format:
   - Shorter sentences
   - More conversational transitions
   - Include timestamps
   - Add discussion prompts
3. Structure: Intro → Key points → Guest questions (if applicable) → Takeaways

---

#### Social Media Graphics (Instagram, etc.)
**Problem:** Not a primary platform

**Solution:**
1. Ask: "Is this for personal brand or business use?"
2. If relevant to strategy, adapt:
   - Extract key quote from LinkedIn post
   - Create 1-3 sentence visual graphic text
   - Suggest pairing with carousel or thread
3. If not strategic fit: "Instagram isn't part of the current content strategy focusing on LinkedIn/X/Substack. Happy to draft text, but recommend prioritizing primary platforms."

---

### Category 2: Unusual Audience/Platform Combinations

#### Request: "LinkedIn post targeting both Career AND Agency audiences equally"

**Problem:** Usually one audience is primary

**Solution: Overlap Zone Content**

Use topics that naturally serve both:
- Automation for ops (Career: shows capability, Agency: demonstrates value)
- Process before technology (Career: strategic thinking, Agency: counters complexity fear)
- "What I Built" content (Career: technical proof, Agency: capability signal)

**Framing Strategy:**
- Use accessible language (serves both)
- Include one product term (for Career)
- Include one ROI metric (for Agency)
- Frame as internal build (employment-safe, credible for both)

**Example:**
```
Built a workflow this week that cut our quote turnaround from 2 days to 20 minutes.

The bottleneck wasn't the quote itself—it was the handoff between
sales and product. [← Product language for Career audience]

We automated the spec matching using Claude API + n8n. Cost: $5/month.
ROI: 25 hours/week saved. [← Specific ROI for Agency audience]

Key lesson: Integration beats innovation.

The AI was 20% of the work. Connecting it to systems people already
use was 80%. [← Insight serves both]

What's the biggest handoff bottleneck in your workflow?
```

---

#### Request: "X thread about complex technical topic"

**Problem:** X rewards simplicity, but topic is inherently complex

**Solution: Simplify Radically or Move Platform**

**Option A:** Simplify for X
- Break complex topic into single principle
- Use thread to build up from simple → complex
- Accept that nuance will be lost
- Link to Substack for full depth

**Option B:** Move to Substack
- "This topic deserves more depth than X allows. Would you prefer:
  1. Simplified X thread with link to full Substack essay
  2. Skip X and write comprehensive Substack piece"

---

### Category 3: Length Mismatches

#### Too Long for Standard Post, Too Short for Carousel

**Request:** "Write a 500-700 word LinkedIn post"

**Problem:**
- Standard post optimal length: 200-300 words
- Carousel minimum: 5 slides
- Substack minimum: 800 words

**Solutions:**

**Option 1: Two-Part Post Series**
- Part 1 (300 words): Hook + Problem + Partial insight
- Part 2 (300 words): Solution + Results + Takeaway
- Post Part 1, then Part 2 in comments or next day

**Option 2: Reduce to Single Post**
- "I can tighten this to 300 words for better LinkedIn engagement. Would you prefer that, or should we expand to Substack for full depth?"

**Option 3: Convert to Carousel**
- Take 600 words, break into 6 slides
- Visual format often performs better anyway

---

#### Extremely Long LinkedIn Request (800+ words)

**Problem:** Will get truncated, low engagement

**Solution:**
1. Flag issue: "LinkedIn truncates after ~300 words. Options:
   - Tighten to 300-word post (lose some detail)
   - Move to Substack essay (better fit)
   - Create carousel (visual alternative)"
2. Recommend Substack if depth is essential
3. If user insists on LinkedIn: Write it but warn about truncation

---

### Category 4: Safety Filter Ambiguity

#### Request Contains Borderline Language

**Examples:**
- "Write about the project I did for..."
- "Share case study from..."
- "Explain how I helped..."

**Decision Framework:**

**Safe if:**
- Framed as "internal project"
- Framed as "helping a friend/family member"
- No money/payment mentioned or implied
- No service offering or CTA

**Unsafe if:**
- Uses "client" or "customer"
- Implies paid work
- Includes "DM me" or "available for..."
- Sounds like case study for agency

**When Uncertain:**
Ask user to clarify:
```
"To ensure employment safety, can you confirm:
1. Was this a personal project or paid work?
2. Should I frame it as 'internal team project' or 'helping a friend'?
3. Any language to avoid?"
```

---

#### Request to Update/Refresh Old Post

**Problem:** Original post might have unsafe language

**Solution:**
1. Ask user to share original post
2. Review for safety issues
3. If original was safe: Refresh while maintaining safety
4. If original was borderline: "I'll update this with safer framing. Here's what I'm changing..."
5. Flag any concerns before proceeding

---

### Category 5: Conflicting SOP Guidance

#### Two SOPs Suggest Opposite Approaches

**Example:**
- segment-a-career.md says: "Use technical product language"
- linkedin-post.md says: "Keep accessible for broad audience"

**Resolution Process:**

**Step 1: Check SOP Selection Matrix**
- Consult [sop-selection-matrix.md](sop-selection-matrix.md) conflict resolution rules
- Priority order: Audience → Theme → Content Type

**Step 2: Apply Priority**
- Audience SOP wins on language
- Content Type SOP wins on structure
- Theme SOP wins on examples

**Step 3: If Still Unclear**
- Ask user: "I can write this with technical depth (for Career audience) or simplified (for broader reach). Which do you prefer?"

---

#### Hook Formula Conflicts

**Example:**
- hook-formulas.md suggests "Contrarian Take" (60-70% of posts)
- segment-b-agency.md examples use "Problem-First" hooks

**Resolution:**
- Both are valid
- Choose based on specific content:
  - Contrarian: For thought leadership, reframes
  - Problem-First: For case studies, builds
- When truly uncertain: Offer user both options

---

### Category 6: Platform Not Covered

#### Request for Platform Outside LinkedIn/X/Substack

**Examples:** Medium, YouTube, Facebook, Instagram

**Solution:**

**Step 1: Assess Strategic Fit**
- Check business_profile.json or ask: "Is [platform] part of your content strategy?"
- If no: "Current strategy focuses on LinkedIn/X/Substack. Would you like to add [platform] to the strategy first?"

**Step 2: If Proceeding:**
- Adapt closest existing SOP
- Medium → substack-essay.md
- YouTube → substack-essay.md (long-form)
- Facebook → linkedin-post.md (but adjust tone/length)
- Instagram → Not recommended (outside strategy)

**Step 3: Note Limitations:**
- "I'm adapting the Substack SOP for Medium. Platform-specific best practices may differ."

---

### Category 7: Multi-Platform Adaptation

#### Request: "Write this for LinkedIn AND X AND Substack"

**Problem:** Each platform has different structure, length, tone

**Solution: Waterfall Strategy**

**Primary Platform (Usually LinkedIn):**
1. Identify which platform is primary
2. Write optimized version for that platform

**Adaptations:**
1. **LinkedIn → X:**
   - Extract key insight
   - Rewrite as 5-7 tweet thread
   - More casual tone
   - Link to LinkedIn for full post

2. **LinkedIn → Substack:**
   - Expand to 1000+ words
   - Add depth, examples, technical detail
   - Use LinkedIn post as "teaser"

3. **Substack → LinkedIn:**
   - Extract one section
   - Reformat as standalone 300-word post
   - Link to Substack for full essay

**Time Estimate:**
- Primary platform: Full effort
- First adaptation: 50% of primary effort
- Second adaptation: 25% of primary effort

**Recommendation:**
"I'll write the primary version for [platform], then create adapted versions for the others. This ensures each is optimized rather than copy-pasted."

---

## Decision Trees

### Tree 1: Content Doesn't Fit Any Template

```
Does request match existing content type?
├─ Yes → Use that SOP
└─ No → Is it similar to existing type?
    ├─ Yes → Adapt closest SOP + note deviations
    └─ No → Ask user:
        "This is outside standard formats. Options:
        1. [Closest fit adaptation]
        2. [Alternative format]
        3. Provide more guidance on desired output"
```

---

### Tree 2: Safety Filter Uncertainty

```
Is employment safety clear?
├─ Clearly Safe → Proceed
├─ Clearly Unsafe → Flag to user, suggest safer alternative
└─ Uncertain → Ask user to clarify:
    ├─ Clarification makes it safe → Proceed with safe framing
    └─ Still uncertain → Do not proceed
        "To protect employment safety, I recommend rephrasing
        this request to clearly frame as [personal project/
        internal work/helping friend]"
```

---

### Tree 3: Platform/Audience Mismatch

```
Is this audience/platform combination standard?
├─ Yes → Use standard SOPs
└─ No → Is there strategic value?
    ├─ No → Suggest standard combination
    └─ Yes → Can I adapt existing SOP?
        ├─ Yes → Adapt + document approach
        └─ No → Ask user for more context
```

---

## Handling Requests to Break Rules

### User Explicitly Asks to Violate Safety Filter

**Example:** "Write a post offering my automation services"

**Response:**
```
"I can't write content that explicitly offers services while you're
employed at MoneyGram. This violates the employment safety protocol.

Alternative approaches that are safe:
1. Share a build as 'personal project' (shows capability without selling)
2. Frame as 'helping a friend' (demonstrates value without offering services)
3. Wait until after employment transition to announce services

Would you like me to draft using one of the safe alternatives?"
```

**Never:** Compromise on Track 1 (Employment Safety)

---

### User Asks for Format That Won't Work

**Example:** "Write a 2000-word LinkedIn post"

**Response:**
```
"LinkedIn truncates posts after ~300 words and engagement drops
significantly on long-form content. A 2000-word piece would be
better suited for Substack.

Options:
1. Tighten to 300-word LinkedIn post (optimized for platform)
2. Move to Substack essay (better long-form fit)
3. Create LinkedIn teaser (300 words) + link to full Substack essay

Which direction works best?"
```

**Why:** Educate user on platform constraints while offering solutions

---

## Creating New Patterns

### When Edge Cases Become Patterns

If you encounter the same edge case 3+ times:

**Flag for SOP Creation:**
```
"I've now handled [type of request] three times using adapted approach.
Recommend creating dedicated SOP for [new content type/scenario].

Pattern I've used:
[Brief description of approach]

Should this become a standard SOP?"
```

**Examples That Might Warrant New SOPs:**
- Video scripts (if requested frequently)
- Podcast outlines (if podcasting becomes part of strategy)
- Comment/DM response templates (if high volume)
- LinkedIn article format (if different from standard posts)

---

## Quick Reference: Common Edge Cases

| Edge Case | Recommended Approach | SOP to Adapt |
|-----------|---------------------|--------------|
| Video script | Adapt post structure, add visual cues | linkedin-post.md or substack-essay.md |
| Too-long LinkedIn post | Suggest Substack or tighten | substack-essay.md or reduce scope |
| Multi-platform request | Write primary, adapt others | Platform-specific SOPs |
| Unclear audience | Ask user to clarify primary | N/A - clarify first |
| Safety uncertainty | Ask user, err on cautious side | employer-safety-filter.md |
| No matching format | Adapt closest + document approach | Closest content-type SOP |
| Conflicting SOPs | Use priority rules: Audience → Theme → Type | sop-selection-matrix.md |
| New platform | Assess strategy fit, adapt if yes | Closest platform SOP |

---

## Emergency Protocol: When You're Truly Stuck

### If No Edge Case Guidance Applies:

**Step 1: Acknowledge Limitation**
```
"This request falls outside my standard operating procedures. Let me
propose an approach based on general principles."
```

**Step 2: Propose Approach**
```
"Here's how I'd approach this:
1. [First principle reasoning]
2. [Adaptation strategy]
3. [Safety check]

Does this align with what you're looking for?"
```

**Step 3: Document for Future**
```
"If this type of request becomes common, we should create a dedicated
SOP for it."
```

---

## Quality Checklist for Edge Cases

Before proceeding with non-standard request:

- [ ] Confirmed user intent (asked clarifying questions if needed)
- [ ] Identified closest existing SOP to adapt
- [ ] Checked employment safety implications
- [ ] Proposed alternative if request won't work as-is
- [ ] Documented approach for future reference
- [ ] Flagged if this should become new SOP (3+ occurrences)
- [ ] User approved adapted approach (if significant deviation)

---

**End of Edge Cases & Exceptions SOP**
