# Performance Tracking SOP

**Version:** 1.0
**Last Updated:** 2026-01-25
**Purpose:** Measuring content effectiveness and informing strategy

---

## Why Track Performance

Performance data answers critical questions:
1. **What resonates with each audience?** (Career vs Agency)
2. **Which themes drive engagement?** (What I Built vs Boring Business)
3. **Which hooks perform best?** (Contrarian vs Reframe)
4. **Is content generating inbound opportunities?** (DMs, profile views)

---

## Metrics Framework

### Primary Metrics (Track for Every Post)

| Metric | Where to Find | Update Frequency |
|--------|---------------|------------------|
| Views/Impressions | LinkedIn Analytics | 48 hours after publish |
| Likes | Post directly | 48 hours after publish |
| Comments | Post directly | 48 hours after publish |
| Shares/Reposts | Post directly | 48 hours after publish |

### Secondary Metrics (Track Weekly)

| Metric | Where to Find | What It Indicates |
|--------|---------------|-------------------|
| Profile Views | LinkedIn Analytics | Interest in you specifically |
| Connection Requests | LinkedIn Notifications | Growing network |
| Post Impressions | LinkedIn Analytics | Content reach |
| Search Appearances | LinkedIn Analytics | Discoverability |

### High-Value Metrics (Track Carefully)

| Metric | How to Track | Why It Matters |
|--------|--------------|----------------|
| Inbound DMs | Manual count | Direct interest from target audience |
| Recruiter Outreach | Manual count | Career Pivot signal |
| SMB Owner Comments | Manual identification | Agency Build signal |
| Speaking/Podcast Invites | Manual count | Thought leadership growth |

---

## Updating Performance Data

### When to Update

| Timeframe | Action |
|-----------|--------|
| 48 hours post-publish | Update basic metrics (views, likes, comments, shares) |
| 7 days post-publish | Final metric snapshot |
| Monthly | Review all published posts, add notes |

### How to Update

1. Open the post's `metadata.json`
2. Update the `performance` object:

```json
"performance": {
  "views": 1247,
  "likes": 45,
  "comments": 12,
  "shares": 3,
  "inbound_dms": 2,
  "notes": "Strong engagement from product managers. One DM from VP Product at [company]."
}
```

3. Run validation:
```bash
node scripts/validate-metadata.js
```

---

## Success Indicators by Audience

### Career Audience (Segment A) Success Signals

**Green Flags:**
- Comments from Product Managers, VPs of Product/Marketing
- Profile views from tech company recruiters
- Inbound DMs asking about your experience
- Shares by people in target companies
- Connection requests from hiring managers

**What to Track:**
```json
"performance": {
  "notes": "Comment from VP Product at [company]. Recruiter DM from [company]."
}
```

**Target Benchmarks:**
| Metric | Good | Great | Excellent |
|--------|------|-------|-----------|
| Views | 500+ | 1000+ | 2500+ |
| Likes | 20+ | 50+ | 100+ |
| Comments | 5+ | 15+ | 30+ |
| Profile Views (weekly) | 100+ | 250+ | 500+ |

---

### Agency Audience (Segment B) Success Signals

**Green Flags:**
- Comments from small business owners
- Comments mentioning HVAC, plumbing, trades, or "my business"
- DMs asking "how did you do that?" or "can you help?"
- Shares in industry-specific groups
- Questions about specific implementations

**What to Track:**
```json
"performance": {
  "notes": "HVAC owner commented asking about setup. Plumber DM'd asking for more details."
}
```

**Target Benchmarks:**
| Metric | Good | Great | Excellent |
|--------|------|-------|-----------|
| Views | 300+ | 800+ | 1500+ |
| Likes | 15+ | 40+ | 80+ |
| Comments | 3+ | 10+ | 20+ |
| SMB Owner DMs | 1+ | 3+ | 5+ |

---

## Performance Analysis Framework

### Weekly Analysis (5 minutes)

1. **Quick scan of last week's posts:**
   - Which got most engagement?
   - Any unexpected performers?
   - Any DMs to note?

2. **Update metadata.json for published posts**

3. **Identify patterns:**
   - Hook types that worked
   - Topics that resonated
   - Times that performed well

---

### Monthly Analysis (30 minutes)

1. **Run README generator:**
```bash
node scripts/generate-readme.js
```

2. **Review Performance Leaders section:**
   - What were the top 3 posts?
   - What did they have in common?

3. **Analyze by dimension:**

| Dimension | Question to Answer |
|-----------|-------------------|
| Theme | Which theme drove most engagement? |
| Audience | Which audience is more engaged? |
| Hook Type | Which hooks performed best? |
| Day/Time | Any patterns in timing? |

4. **Document insights in notes:**
```json
"performance": {
  "notes": "January Analysis: Contrarian hooks outperformed 2:1. 'What I Built' posts generated 3x more DMs than educational."
}
```

---

### Quarterly Analysis (1 hour)

1. **Aggregate metrics:**
   - Total views across all posts
   - Average engagement rate
   - Total inbound DMs
   - Profile view trend

2. **Three-track assessment:**

| Track | Metric | Target | Actual |
|-------|--------|--------|--------|
| Employment Safety | Posts flagged | 0 | ___ |
| Career Pivot | Recruiter DMs | 2+/month | ___ |
| Agency Build | SMB Owner DMs | 1+/month | ___ |

3. **Strategy adjustment:**
   - Double down on what works
   - Reduce what doesn't perform
   - Test new approaches

---

## Engagement Quality Scoring

Not all engagement is equal. Score comments:

### Comment Quality Tiers

| Tier | Description | Value |
|------|-------------|-------|
| **Tier 1** | DM from target audience | Highest |
| **Tier 2** | Thoughtful comment with follow-up question | High |
| **Tier 3** | Comment indicating they'll try your approach | High |
| **Tier 4** | "Great post" with nothing specific | Low |
| **Tier 5** | Irrelevant or spam | None |

### Tracking Quality

In `performance.notes`, note:
- Number of Tier 1-3 comments
- Who specifically engaged (titles, companies)
- Any follow-up conversations

Example:
```json
"notes": "12 comments total. 3 Tier 1 (VP Product @Company, Hiring Manager @Company, HVAC owner). 5 Tier 2 thoughtful responses. 4 Tier 4 generic."
```

---

## Warning Signs

### Content Not Resonating

| Signal | What It Means | Action |
|--------|---------------|--------|
| Views under 200 | Not reaching feed | Check post timing, try different hook |
| High views, low engagement | Skimmed but not compelling | Improve substance/insights |
| No comments | Not conversation-worthy | End with stronger question |
| Generic comments only | Not hitting pain points | Sharpen audience targeting |

### Audience Mismatch

| Signal | What It Means | Action |
|--------|---------------|--------|
| Wrong titles in comments | Attracting non-target audience | Adjust language/examples |
| No DMs from target | Content not actionable | Add more specific details |
| Engagement but no profile views | Entertaining but not intriguing | Strengthen personal brand signals |

---

## Performance Data Workflow

### Post-Publish Workflow

```
Day 0: Publish post, set reminder for Day 2

Day 2: Update metrics in metadata.json
       - Views, likes, comments, shares
       - Note any standout comments

Day 7: Final metric snapshot
       - Update performance object
       - Add qualitative notes
       - Run: node scripts/validate-metadata.js

Monthly: Review all published posts
         - Run: node scripts/generate-readme.js
         - Analyze Performance Leaders section
```

---

## Comparing Performance Over Time

### Month-over-Month Tracking

Create a simple log in `knowledge/performance-log.md`:

```markdown
## January 2026

**Posts Published:** 8
**Total Views:** 4,500
**Total Engagement:** 180 (likes + comments)
**Inbound DMs:** 3

**Top Post:** "From AI Pilots to Real Impact" (1,200 views, 45 likes)
**Key Learning:** Contrarian hooks about AI implementation outperformed builds

---

## February 2026
...
```

### Quarterly Trends

| Quarter | Posts | Avg Views | Avg Engagement | Inbound DMs |
|---------|-------|-----------|----------------|-------------|
| Q1 2026 | | | | |
| Q2 2026 | | | | |

---

## Integration with Other SOPs

### Content Calendar Integration

Use performance data to inform:
- Which themes to prioritize next month
- Which hooks to use more/less
- Which audience needs more content

### Audience SOP Integration

Update understanding of what resonates with:
- Career audience (Segment A) preferences
- Agency audience (Segment B) preferences

---

## Tools & Resources

### LinkedIn Analytics Access

1. Go to LinkedIn
2. Click on your profile
3. Select "Analytics & tools" > "Post impressions"
4. Or click on any post > "View analytics"

### Tracking Spreadsheet (Optional)

For detailed tracking, maintain a spreadsheet with:
- Post date
- Title
- Theme
- Audience
- Hook type
- Views
- Engagement
- DMs
- Notes

---

**End of Performance Tracking SOP**
