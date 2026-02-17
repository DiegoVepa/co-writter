# SOP Selection Matrix - Workflow Decision Guide

**Version:** 1.0
**Last Updated:** 2025-12-27

---

## Purpose

This guide removes ambiguity about which SOPs to consult when generating content. When multiple SOPs could apply to a single request, this matrix defines the priority order and conflict resolution rules.

**Use this EVERY time you receive a content request.**

---

## Quick Decision Framework

### Step 1: Identify Request Components

Answer these questions in order:

1. **Audience?**
   - Segment A (Career Pivot - Product/Marketing hiring managers)
   - Segment B (Agency Build - SMB owners in boring businesses)
   - Both (Overlap content)

2. **Platform?**
   - LinkedIn
   - X/Twitter
   - Substack

3. **Content Type?**
   - Standard post
   - Carousel/slides
   - Case study ("What I Built")
   - Thread
   - Essay (Substack)

4. **Theme?**
   - "What I Built" (builder credibility pillar)
   - "Boring Business" (SMB/trades opportunity)
   - Other (lessons, frameworks, observations)

### Step 2: Load SOPs in Priority Order

**Priority Rule:** Audience → Theme → Content Type → Platform → Assets

---

## SOP Loading Sequence

### Priority 1: AUDIENCE (Always First)
Load the audience-specific SOP first. This defines:
- Language to use
- Proof points to emphasize
- Framing strategy
- Safety considerations

**Files:**
- [segment-a-career.md](../audiences/segment-a-career.md) - for Career Pivot audience
- [segment-b-agency.md](../audiences/segment-b-agency.md) - for Agency Build audience
- If targeting "Both" → load both, but prioritize based on which is primary

---

### Priority 2: THEME (If Applicable)
If the content aligns with a specific theme pillar, load that SOP second.

**Files:**
- [what-i-built.md](../themes/what-i-built.md) - for builds, projects, technical demos
- [boring-business.md](../themes/boring-business.md) - for HVAC/plumbing/trades content

**When to use:**
- Use theme SOP if request explicitly mentions a build or boring business
- Skip if request is general observation or framework

---

### Priority 3: CONTENT TYPE (Structure)
Load the content-type SOP for structural guidance.

**Files:**
- [linkedin-post.md](../content-types/linkedin-post.md) - standard posts
- [linkedin-carousel.md](../content-types/linkedin-carousel.md) - slide format
- [linkedin-carousel-screenshots.md](../content-types/linkedin-carousel-screenshots.md) - carousel with real screenshots
- [linkedin-case-study.md](../content-types/linkedin-case-study.md) - deep-dive builds
- [x-thread.md](../content-types/x-thread.md) - Twitter threads
- [substack-essay.md](../content-types/substack-essay.md) - long-form essays

---

### Priority 4: ASSETS (Reference as Needed)
Use these files as inspiration and reference, not strict templates.

**Files:**
- [hook-formulas.md](../assets/hook-formulas.md) - opening hook patterns
- [employer-safety-filter.md](../audiences/employer-safety-filter.md) - ALWAYS check before publishing

---

## Common Scenarios with SOP Load Order

### Scenario 1: "Write a LinkedIn post about the automation I built for my friend's HVAC business"

**Identify Components:**
- Audience: Segment B (Agency - SMB owners)
- Platform: LinkedIn
- Content Type: Standard post
- Theme: Boring Business + What I Built

**Load Order:**
1. **segment-b-agency.md** (primary framing, language, audience needs)
2. **boring-business.md** (theme-specific guidance for HVAC/trades)
3. **what-i-built.md** (structure for build showcases)
4. **linkedin-post.md** (platform structure and formatting)
5. **hook-formulas.md** (inspiration for opening)
6. **employer-safety-filter.md** (verify before publishing)

**If Conflict:**
- segment-b-agency.md wins on language and framing
- boring-business.md guides theme-specific examples
- linkedin-post.md provides structure

---

### Scenario 2: "Create a carousel about the Product-Sales Integration Framework for hiring managers"

**Identify Components:**
- Audience: Segment A (Career Pivot - hiring managers)
- Platform: LinkedIn
- Content Type: Carousel
- Theme: Framework (not a specific pillar)

**Load Order:**
1. **segment-a-career.md** (product language, cross-functional framing)
2. **linkedin-carousel.md** (slide structure, design specs)
3. **hook-formulas.md** (carousel hook patterns)
4. **employer-safety-filter.md** (verify before publishing)

**If Conflict:**
- segment-a-career.md wins on terminology (use "workflow design" not "manual work")
- linkedin-carousel.md defines slide count and structure

---

### Scenario 3: "Write an X thread about a quick win I shipped this week"

**Identify Components:**
- Audience: Both (build-in-public appeals to both)
- Platform: X/Twitter
- Content Type: Thread
- Theme: What I Built

**Load Order:**
1. **what-i-built.md** (structure for showcasing builds)
2. **x-thread.md** (thread format, tone for X)
3. **hook-formulas.md** (punchy X-appropriate hooks)
4. **employer-safety-filter.md** (verify before publishing)

**If Conflict:**
- what-i-built.md guides content structure (Problem → Build → Results → Lesson)
- x-thread.md defines platform tone (more casual, more contrarian)

---

### Scenario 4: "Write about why boring businesses are perfect for AI - target both audiences on LinkedIn"

**Identify Components:**
- Audience: Both (but with Career as secondary)
- Platform: LinkedIn
- Content Type: Standard post
- Theme: Boring Business

**Load Order:**
1. **boring-business.md** (core thesis and examples)
2. **segment-b-agency.md** (primary - plain language for SMB owners)
3. **segment-a-career.md** (secondary - how to frame for hiring managers)
4. **linkedin-post.md** (structure)
5. **hook-formulas.md** (contrarian hooks work well here)
6. **employer-safety-filter.md** (verify before publishing)

**If Conflict:**
- Use plain language from segment-b (accessible to both audiences)
- Add one sentence for Career audience showing product thinking
- Example: "Service businesses measure ROI in dollars, not productivity gains" (appeals to both)

---

### Scenario 5: "Deep-dive case study on Substack: How I built the quote automation system"

**Identify Components:**
- Audience: Segment A (Career - technical credibility)
- Platform: Substack
- Content Type: Essay / Case Study
- Theme: What I Built

**Load Order:**
1. **segment-a-career.md** (language, proof points, framing)
2. **what-i-built.md** (build showcase structure)
3. **substack-essay.md** (long-form structure, 800-1500 words)
4. **linkedin-case-study.md** (reference for technical detail balance)
5. **employer-safety-filter.md** (verify before publishing)

**If Conflict:**
- segment-a-career.md defines language (use product terminology)
- substack-essay.md defines length and pacing
- what-i-built.md ensures you include Problem → Build → Results → Lesson

---

### Scenario 6: "Help me reply to a comment where someone asked if I can automate their business"

**Identify Components:**
- Type: Engagement response (not new content)
- Risk: High (could violate employment safety)

**Load Order:**
1. **employer-safety-filter.md** (read "Red Flag Scenarios" section)
2. Use provided safe response templates

**Example Safe Response:**
"Happy to point you in the right direction! The tools I used were n8n (free tier) and Twilio. There are some good tutorials on YouTube for setting up similar workflows. If you get stuck, feel free to reach out with specific questions."

---

## Conflict Resolution Rules

When two SOPs provide conflicting guidance, use these rules:

### Rule 1: Audience SOP Always Wins on Language
If segment-a-career.md says "use product terms" and linkedin-post.md suggests plain language → use product terms.

**Why:** Audience needs trump platform conventions.

---

### Rule 2: Theme SOP Wins on Examples and Framing
If what-i-built.md suggests technical workflow diagram and linkedin-post.md says "skip visuals" → include the diagram.

**Why:** Theme-specific guidance is more tailored than generic content-type advice.

---

### Rule 3: Content-Type SOP Wins on Structure
If boring-business.md has a different structure than linkedin-post.md → follow linkedin-post.md structure, but use boring-business.md examples/language.

**Why:** Platform structure optimizes for engagement on that platform.

---

### Rule 4: Safety Filter Overrides Everything
If ANY SOP conflicts with employer-safety-filter.md → employment safety wins. Always.

**Why:** Protecting your current job is non-negotiable.

---

### Rule 5: When in Doubt, Ask
If two SOPs genuinely conflict and priority rules don't resolve it → ask the user for clarification.

Example: "I could frame this as 'What I Built' (technical depth) or 'Boring Business' (ROI focus). Which angle do you prefer?"

---

## Edge Case Handling

### Case 1: Request Doesn't Fit Standard Formats

**Example:** "Write a long-form LinkedIn post (600 words) explaining this concept"

**Problem:** Too long for standard post, not quite carousel or essay.

**Solution:**
1. Check [edge-cases.md](edge-cases.md) for guidance
2. If no guidance exists, propose alternative:
   - "This would work better as a carousel (visual) or Substack essay (depth). Which do you prefer?"
3. Don't force content into wrong format

---

### Case 2: Multi-Platform Request

**Example:** "Write this for both LinkedIn and X"

**Problem:** Different platforms have different tones and structures.

**Solution:**
1. Create primary version for main platform (usually LinkedIn)
2. Adapt for secondary platform (X thread)
3. Don't just copy-paste - use x-thread.md to adjust tone

**Load Order for Adaptation:**
- linkedin-post.md → create primary version
- x-thread.md → adapt to more casual, punchier thread

---

### Case 3: Ambiguous Audience

**Example:** "Write about AI integration lessons"

**Problem:** Could target either audience or both.

**Solution:**
1. Ask user: "Who's the primary audience? Career (hiring managers) or Agency (SMB owners)?"
2. If user says "both" → load both audience SOPs, but use accessible language
3. Default to Segment A (Career) if truly unclear

---

### Case 4: No Clear Theme

**Example:** "Share a quick observation about AI"

**Problem:** Not a build, not boring business, just an insight.

**Solution:**
1. Skip theme SOPs entirely
2. Load: Audience SOP + Content-Type SOP + hook-formulas.md
3. Use "Unexpected Reframe" or "Contrarian Take" hook

---

## Quick Reference Table

| Request Type | Primary SOP | Secondary SOPs | Hook Type |
|--------------|-------------|----------------|-----------|
| Build for Career audience (LinkedIn) | segment-a-career.md | what-i-built.md, linkedin-post.md | "What I Built" |
| Build for Agency audience (LinkedIn) | segment-b-agency.md | what-i-built.md or boring-business.md, linkedin-post.md | "Problem-First" or "Before/After" |
| Framework/Carousel (Career) | segment-a-career.md | linkedin-carousel.md | "Contrarian" or "Reframe" |
| **Carousel with screenshots** | linkedin-carousel-screenshots.md | Audience SOP, linkedin-visuals.md | "FROM X → TO Y" transformation |
| X thread (build-in-public) | what-i-built.md | x-thread.md | "What I Built" or "Lesson Learned" |
| Boring business thought leadership | boring-business.md | segment-b-agency.md, linkedin-post.md | "Contrarian" |
| Substack deep-dive | segment-a-career.md | substack-essay.md, what-i-built.md | Essay hook (can build slowly) |
| General observation (Career) | segment-a-career.md | linkedin-post.md, hook-formulas.md | "Reframe" or "Counter-Intuitive" |
| Case study (either audience) | Audience SOP | linkedin-case-study.md, what-i-built.md | "Problem-First" |

---

## Pre-Flight Checklist

Before generating content, verify:

- [ ] Identified primary audience (Segment A, B, or Both)
- [ ] Identified platform (LinkedIn, X, Substack)
- [ ] Identified content type (post, carousel, thread, essay)
- [ ] Identified theme (if applicable)
- [ ] Loaded SOPs in priority order
- [ ] Understand which SOP wins if conflicts arise
- [ ] Will check employer-safety-filter.md before publishing

---

## Post-Generation Checklist

After generating content, verify:

- [ ] Language matches audience (product terms for Career, plain language for Agency)
- [ ] Structure matches content type (post length, thread format, etc.)
- [ ] Theme elements included (if applicable)
- [ ] Hook uses appropriate formula for audience/platform
- [ ] Passes employment safety filter (no client/agency language)
- [ ] Engagement question appropriate for audience
- [ ] Visual assets proposed (if applicable)

---

## When to Deviate

It's acceptable to deviate from SOP guidance when:

1. **User explicitly requests different approach**
   - Example: "Use a more casual tone than usual"
   - Solution: Acknowledge deviation, adjust accordingly

2. **Content legitimately doesn't fit any template**
   - Example: Announcing a new skill or sharing industry news
   - Solution: Use closest SOP as guide, but adapt as needed

3. **SOPs provide genuinely conflicting, irreconcilable guidance**
   - Example: Two SOPs suggest opposite approaches
   - Solution: Flag conflict, ask user for preference

**Always document why you deviated** (mental note or flag to user).

---

## SOP Update Triggers

If you notice any of these patterns, flag for SOP update:

- Same type of request comes up 3+ times with no clear SOP match
- Conflict between SOPs happens repeatedly
- User frequently overrides SOP guidance
- New platform or content type becomes regular request
- Hook formula stops performing well

**Report pattern to user for SOP refinement.**

---

## Example: Full Workflow

**Request:** "Write a LinkedIn post about the workflow I built to connect sales and product data"

### Step 1: Identify Components
- Audience: Segment A (Career - shows cross-functional thinking)
- Platform: LinkedIn
- Content Type: Standard post
- Theme: What I Built

### Step 2: Load SOPs in Order
1. segment-a-career.md
2. what-i-built.md
3. linkedin-post.md
4. hook-formulas.md
5. employer-safety-filter.md

### Step 3: Extract Key Guidance
- **From segment-a-career.md:**
  - Use product language: "integration points," "workflow design," "handoff"
  - Frame as internal project
  - Emphasize cross-functional value

- **From what-i-built.md:**
  - Structure: Problem → Build → Results → Lesson
  - Include specific tools/approach
  - Quantify outcome

- **From linkedin-post.md:**
  - Length: 200-300 words
  - Hook first
  - White space between sections
  - End with engagement question

- **From hook-formulas.md:**
  - Use "What I Built" or "Contrarian" hook
  - Example: "Built a workflow this week that cut quote turnaround from 2 days to 20 minutes."

### Step 4: Draft Content
[Draft following combined guidance]

### Step 5: Safety Check
- **From employer-safety-filter.md:**
  - ✅ Framed as internal project at current company
  - ✅ No client/agency language
  - ✅ Ends with discussion question, not sales pitch
  - ✅ Safe to publish

---

## Summary

**The Golden Rule:** When in doubt about which SOP to follow:

1. Audience needs come first (language, framing)
2. Theme provides specific examples
3. Content type defines structure
4. Safety filter overrides everything

**Priority Order:** Audience → Theme → Content Type → Assets → Safety Check

**If Conflict:** Refer to Conflict Resolution Rules (Section above)

**If Edge Case:** Check edge-cases.md or ask user

---

**End of SOP Selection Matrix**
