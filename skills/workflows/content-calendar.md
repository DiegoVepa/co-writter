# Content Calendar SOP

**Version:** 1.0
**Last Updated:** 2026-01-25
**Purpose:** Planning and maintaining consistent posting cadence

---

## Weekly Posting Targets

| Platform | Target | Minimum | Notes |
|----------|--------|---------|-------|
| LinkedIn | 2-3 posts/week | 2 posts/week | Primary platform |
| X/Twitter | 1-2 threads/week | 1 thread/week | Build-in-public updates |
| Substack | 1-2 essays/month | 1 essay/month | Deep dives only |

---

## Content Mix Enforcement

### Target Distribution (Non-Negotiable)

| Category | Target | Allowed Range | Description |
|----------|--------|---------------|-------------|
| Internal Work Projects | 60% | 50-70% | Personal builds, experiments, learning |
| "Helping Friends" Stories | 30% | 20-40% | SMB case studies framed as favors |
| Educational/Thought Leadership | 10% | 5-20% | Industry insights, frameworks |

### Monthly Audit

At the end of each month, run:
```bash
node scripts/generate-readme.js
```

Check the "Content Mix" section. If out of range:
- **Too much educational:** Create more "What I Built" posts
- **Too few "helping friends":** Write about a real SMB automation
- **Too internal:** Expand one build into thought leadership

---

## Audience Rotation

### Minimum Coverage

Each month must include:
- **At least 3 posts** targeting Career audience (Segment A)
- **At least 1 post** targeting Agency audience (Segment B) or Both
- **At least 1 "overlap" post** that serves both audiences

### Red Flags

If README shows:
- Agency (Segment B): 0 posts for 2+ months → Create a "helping friends" story
- Career only: 100% of posts → Add SMB-relevant content
- All educational: 0 builds → Share something you actually built

---

## Theme Rotation

### Primary Pillars (Must-Have Monthly)

| Theme | Monthly Minimum | Ideal |
|-------|-----------------|-------|
| What I Built | 2 posts | 4-5 posts |
| Boring Business | 1 post | 2-3 posts |
| AI for Ops & GTM | 1 post | 2-3 posts |

### Quarterly Pillar Review

Every quarter, assess:
1. Which themes generated most engagement?
2. Which attracted target audience DMs?
3. Adjust frequency based on performance data

---

## Hook Type Distribution

### Recommended Monthly Mix

| Hook Type | Usage | Notes |
|-----------|-------|-------|
| Contrarian | 40-50% | Highest engagement, use for important posts |
| What I Built | 20-30% | Credibility builder |
| Reframe | 10-20% | Thought leadership |
| Before/After | 10% | ROI-focused, great for Agency audience |
| Problem-First | 5-10% | Relatable, builds empathy |

### Avoid Over-Reliance

If more than 50% of posts use the same hook type:
- Consciously vary the next 3-4 posts
- Check `node scripts/generate-readme.js` for hook distribution

---

## Weekly Planning Template

### Monday Planning Session

1. **Review last week:**
   - What performed well?
   - Any posts to repurpose?
   - Comments/DMs to respond to?

2. **This week's targets:**
   - Post 1: [Date] - [Theme] - [Audience] - [Hook]
   - Post 2: [Date] - [Theme] - [Audience] - [Hook]
   - Post 3 (optional): [Date] - [Theme] - [Audience] - [Hook]

3. **Content prep:**
   - Draft Post 1
   - Outline Post 2
   - Ideas for next week

### Weekly Checklist

- [ ] 2+ LinkedIn posts drafted
- [ ] At least one "What I Built" post
- [ ] Safety filter applied to all drafts
- [ ] Visual assets prepared
- [ ] Engagement questions ready

---

## Monthly Planning Template

### First Week of Month

1. **Run content audit:**
   ```bash
   node scripts/validate-metadata.js
   node scripts/generate-readme.js
   ```

2. **Review metrics:**
   - Check content mix percentages
   - Review audience distribution
   - Identify top performers

3. **Set monthly goals:**
   - Total posts target: ___
   - Theme focus: ___
   - Audience priority: ___
   - One "stretch" post (new format or topic)

---

## Quarterly Content Planning

### Quarter Planning Session

1. **Performance Review:**
   - Top 3 performing posts
   - Posts that generated inbound DMs
   - Topics that resonated with target audiences

2. **Strategy Alignment:**
   - Does content mix match three-track strategy?
   - Career Pivot signals strong enough?
   - Agency Build trust growing?

3. **Next Quarter Goals:**
   - Q[X] theme focus: ___
   - New content experiments: ___
   - Platform expansion (if any): ___

---

## Publishing Schedule

### Best Times to Post (LinkedIn)

| Day | Time (PT) | Notes |
|-----|-----------|-------|
| Tuesday | 8-9 AM | High engagement |
| Wednesday | 8-9 AM | Consistent |
| Thursday | 8-9 AM | Good for thought leadership |

### Avoid
- Mondays before 10 AM (inbox clearing)
- Fridays after 2 PM (weekend mode)
- Weekends (unless testing)

---

## Content Pipeline Stages

```
Idea → Draft → Review → Ready → Scheduled → Published → Analyzed
```

### Stage Definitions

| Stage | Status in Metadata | Action Required |
|-------|-------------------|-----------------|
| Idea | N/A | Capture in notes, not yet a post |
| Draft | `draft` | Writing in progress |
| Review | `draft` + safety_review: `needs-review` | Awaiting safety check |
| Ready | `ready-to-publish` | Approved, awaiting publish |
| Published | `published` | Live on platform |
| Analyzed | `published` + performance data | Metrics recorded |

---

## Batching Strategy

### Content Batching (Recommended)

Batch content creation for efficiency:

1. **Batch 1 (Planning):** 2 hours
   - Generate 4-5 post ideas
   - Outline hooks and structures
   - Identify needed assets

2. **Batch 2 (Drafting):** 3-4 hours
   - Write all drafts
   - Create visual assets
   - Run safety review

3. **Batch 3 (Scheduling):** 1 hour
   - Final edits
   - Schedule for optimal times
   - Set reminders for engagement

### Benefits
- Consistent output even during busy weeks
- Better quality from focused work
- Less daily decision fatigue

---

## Emergency Content

### When You Miss a Week

1. **Quick recovery options:**
   - Repurpose a Substack essay as LinkedIn post
   - Turn a popular comment into a standalone post
   - Share a "quick win" from recent work

2. **30-minute post formula:**
   - Hook: Contrarian take on recent news
   - Setup: One paragraph of context
   - Insight: Your unique perspective
   - Question: Ask for others' experience

---

## Integration with Scripts

### Weekly Workflow

```bash
# Monday: Plan week
node scripts/create-post.js --title "..." --audience career --theme what-i-built

# Throughout week: Draft and validate
node scripts/validate-metadata.js

# Friday: Update index
node scripts/generate-readme.js
```

### Monthly Workflow

```bash
# Update all metadata with performance data
# Then regenerate README
node scripts/generate-readme.js

# Review content mix in README output
```

---

## Accountability Metrics

### Weekly Success Criteria
- [ ] 2+ posts published
- [ ] All posts passed safety review
- [ ] At least one post generated engagement (3+ comments)

### Monthly Success Criteria
- [ ] Content mix within target ranges
- [ ] All three themes represented
- [ ] At least one inbound DM from target audience
- [ ] README updated with performance data

---

**End of Content Calendar SOP**
