# LinkedIn Case Study - "What I Built" Format

**Version:** 1.0
**Last Updated:** 2025-12-27

---

## Purpose

Deep-dive case study format for showcasing builds, projects, and technical implementations. This is your credibility builder—use it 2-3x per month to demonstrate actual capability.

---

## When to Use Case Study Format

✅ **Use for:**
- Complete builds or projects
- Technical implementations with clear ROI
- Before/after transformations
- Multi-step solutions to real problems
- Demonstrating specific skills (AI, automation, integration)

❌ **Don't use for:**
- Quick insights or observations
- Frameworks without implementation
- Hypothetical or theoretical content
- Anything without concrete results

---

## Structure Template

```
[HOOK - The problem or outcome]

[CONTEXT - Background and setup]

[THE BUILD - What you created]
→ Technical approach
→ Tools used
→ Integration points
→ Key decisions

[CHALLENGES - What didn't work]

[RESULTS - Specific outcomes]
→ Time saved
→ Cost impact
→ Efficiency gain
→ Other metrics

[LESSONS - What you learned]

[ENGAGEMENT QUESTION]
```

---

## Length Guidelines

- **Minimum:** 300 words
- **Optimal:** 400-600 words
- **Maximum:** 800 words
- **Paragraph length:** 2-4 sentences max per section
- **White space:** Break into clear sections

---

## Section-by-Section Breakdown

### Hook (The Problem or Outcome)

Lead with the most compelling element:

**Option 1: Problem-First Hook**
```
My friend runs a plumbing company. He was losing $2K/month to no-shows.
```

**Option 2: Outcome-First Hook**
```
Cut quote turnaround from 2 days to 20 minutes.

Here's how we built it.
```

**Option 3: Contrarian Hook**
```
Most sales teams automate the wrong things.

They focus on emails and sequences. The real bottleneck?
Getting product specs into quotes.
```

---

### Context (Background and Setup)

**What to Include:**
- Who this was for (you, your team, a friend's business)
- What the manual process looked like before
- Why this was a problem worth solving
- What was at stake (time, money, opportunity cost)

**Length:** 3-5 sentences

**Example (Career Audience):**
```
When I joined the sales ops team, our quote process was a nightmare.
Reps would submit a request, wait 24-48 hours for product to send specs,
then manually copy-paste into our quote template.

Average turnaround: 2 days. For complex deals: up to a week.

We were losing deals to competitors who could quote same-day.
```

**Example (Agency Audience):**
```
I've been helping a friend who runs an HVAC company. His biggest headache?
Appointment no-shows.

He'd book 10 appointments, drive to 8 locations (2 would cancel
last-minute), and 3 of those 8 wouldn't answer the door.

That's 30% of his day wasted on gas and ghost appointments.
```

---

### The Build (What You Created)

This is the core technical section. Break it into subsections:

**Technical Approach:**
- High-level architecture
- Why you chose this approach
- What alternatives you considered

**Tools Used:**
- Specific tech stack
- Why these tools (briefly)
- Integration points

**Key Decisions:**
- Critical choices you made
- Trade-offs you accepted
- What you prioritized

**Example (Career Audience):**
```
The Build:

I designed a workflow that connected three systems:
→ CRM (where reps submit quote requests)
→ Product database (where specs live)
→ Quote template generator

Technical approach:
- n8n workflow triggered by CRM webhook
- Claude API to match customer requirements to product specs
- Auto-populate quote template with pricing from product DB
- Send completed quote back to rep via email + CRM update

Why this stack?
- n8n: Free tier, easy to maintain
- Claude: Better at nuanced requirement matching than rule-based logic
- Webhook triggers: Real-time, no polling needed

Key decision: I didn't try to automate the entire sales process.
Just the 20-minute bottleneck that happened 50x per week.
```

**Example (Agency Audience):**
```
The Build:

Simple two-part reminder system:
→ 24 hours before appointment: automated text with confirmation link
→ 2 hours before: second text if they haven't confirmed

If they don't confirm the 2-hour text, system flags the appointment
so my friend doesn't waste the drive.

Tools I used:
- Calendly (he was already using it for booking)
- Twilio (for automated texts, $0.0079 per message)
- n8n (free tier, connects Calendly to Twilio)

Total setup cost: $0
Monthly cost: ~$15 for text messages
Time to build: 45 minutes
```

---

### Challenges (What Didn't Work)

**Purpose:** Build trust through transparency

**What to Include:**
- First attempt that failed
- Why it didn't work
- What you learned from the failure

**Length:** 2-4 sentences

**Examples:**

```
First attempt: I tried using a rules-based system with IF/THEN logic.
It worked for simple quotes but broke on anything custom. Spent a week
building rules that covered maybe 60% of cases.

Switching to Claude API cut the logic complexity by 80% and handled
edge cases better than my rules ever could.
```

```
What didn't work: I initially tried to build a full scheduling
system from scratch. Took 3 hours, broke twice, and my friend
hated the interface.

Pivoted to just enhancing his existing Calendly setup. Live in
45 minutes instead of rebuilding the wheel.
```

---

### Results (Specific Outcomes)

**CRITICAL:** Use concrete numbers, not vague claims.

**Format:**
```
Results:
- [Metric 1]: [Specific number and context]
- [Metric 2]: [Specific number and context]
- [Metric 3]: [Specific number and context]

[Overall impact statement]
```

**Example (Career Audience):**
```
Results:
- Quote turnaround: 2 days → 20 minutes (98% reduction)
- Rep time saved: 50 quotes/week × 30min each = 25 hours/week recovered
- Close rate: +19% (faster quotes = more wins)
- Sales ops requests: Dropped by 60%

The team went from being a bottleneck to a competitive advantage.
```

**Example (Agency Audience):**
```
Results after 30 days:
- No-shows: Dropped from 30% to 12%
- Revenue recovered: ~$2,400/month
- Time saved: 6 hours/week (no wasted drives)
- Cost to run: $15/month (text messages)

ROI: 160x in the first month.
```

---

### Lessons (What You Learned)

**Purpose:** Provide transferable insight

**What to Include:**
- Broader principle or pattern
- What surprised you
- What you'd do differently
- Advice for others attempting similar

**Length:** 2-4 sentences

**Examples:**

```
Key lesson: Integration beats innovation.

The AI was 20% of the value. Connecting it to systems people
already used was 80%. If I'd built a standalone tool, nobody
would have adopted it.
```

```
Biggest takeaway: Start with the boring stuff.

Sexy automation is building an AI chatbot. Boring automation
is fixing no-shows. But boring automation has ROI in week one.
```

```
What I'd do differently: Ship faster.

I spent 3 hours trying to perfect v1. Should've launched the
60% solution in 45 minutes and iterated based on real feedback.
```

---

### Engagement Question

**Purpose:** Invite specific, valuable responses

**Strong Questions:**
- "What's the biggest bottleneck in your [process]?"
- "What would you automate first in a setup like this?"
- "Anyone else dealing with [specific problem]?"
- "What's a boring process you automated recently?"

**Weak Questions:**
- "Thoughts?" (too vague)
- "Would this work for you?" (yes/no, low engagement)
- "What do you think?" (lazy)

---

## Tone & Voice for Case Studies

### Language by Audience:

**Career Audience (Product/Marketing Hiring Managers):**
- Use: workflow, integration points, adoption, bottleneck, system design
- Frame: Cross-functional problem solving
- Emphasize: Product thinking, technical capability, outcomes

**Agency Audience (SMB Owners):**
- Use: time saved, cost, ROI, headache, manual work, no-shows
- Frame: Helping a friend, personal project
- Emphasize: Simplicity, speed to build, concrete savings

---

## Safety Filters (CRITICAL)

### Employment Safety:

**For Agency Audience Content:**

✅ **Safe Framing:**
- "Helping a friend who runs..."
- "Personal project for a family member's business..."
- "Built this to test an idea..."
- "Experimenting with automation for..."

❌ **Unsafe Framing:**
- "My client..."
- "Recent agency project..."
- "Available for similar work..."
- "DM me for services..."

**Example Safe vs. Unsafe:**

```
✅ SAFE:
"I've been helping a friend automate his HVAC business. He was
losing $2K/month to no-shows, so I built him a simple reminder
system..."

❌ UNSAFE:
"Recent client project: I helped an HVAC company reduce no-shows
by 60%. If you need similar automation, DM me."
```

---

## Visual Accompaniment

### What to Include:

**For Technical Builds:**
- Workflow diagram (n8n screenshot, architecture diagram)
- Before/after comparison
- Results dashboard

**For Business Process Builds:**
- Simple before/after visual
- ROI chart
- Process flow diagram

### What to Avoid:
- Stock photos
- Generic graphics
- Overly complex diagrams
- Anything that looks like a sales pitch

---

## Quality Checklist

Before publishing, verify:

- [ ] Specific problem clearly stated
- [ ] Technical approach explained (not too detailed, not too vague)
- [ ] Tools and stack mentioned
- [ ] At least one "what didn't work" section
- [ ] Concrete results with real numbers
- [ ] Key lesson or transferable insight
- [ ] Engagement question invites specific response
- [ ] Passes employment safety filter (no client/agency language)
- [ ] Authentic voice (practitioner, not consultant)
- [ ] Visual asset enhances the story

---

## Full Example (Career Audience)

```
Cut quote turnaround from 2 days to 20 minutes.

Here's how we built it.

---

The Problem:

When I joined the sales ops team, our quote process was a nightmare.
Reps would submit a request, wait 24-48 hours for product to send
specs, then manually copy-paste into our quote template.

Average turnaround: 2 days. For complex deals: up to a week.

We were losing deals to competitors who could quote same-day.

---

The Build:

I designed a workflow that connected three systems:
→ CRM (where reps submit quote requests)
→ Product database (where specs live)
→ Quote template generator

Technical approach:
- n8n workflow triggered by CRM webhook
- Claude API to match customer requirements to product specs
- Auto-populate quote template with pricing from product DB
- Send completed quote back to rep via email + CRM update

Why this stack?
- n8n: Free tier, easy to maintain
- Claude: Better at nuanced requirement matching than rule-based logic
- Webhook triggers: Real-time, no polling needed

Key decision: I didn't try to automate the entire sales process.
Just the 20-minute bottleneck that happened 50x per week.

---

What Didn't Work:

First attempt: I tried using a rules-based system with IF/THEN logic.
It worked for simple quotes but broke on anything custom.

Switching to Claude API cut the logic complexity by 80% and handled
edge cases better than my rules ever could.

---

Results:
- Quote turnaround: 2 days → 20 minutes (98% reduction)
- Rep time saved: 50 quotes/week × 30min each = 25 hours/week recovered
- Close rate: +19% (faster quotes = more wins)
- Sales ops requests: Dropped by 60%

The team went from being a bottleneck to a competitive advantage.

---

Key lesson: Integration beats innovation.

The AI was 20% of the value. Connecting it to systems people already
used was 80%. If I'd built a standalone tool, nobody would have
adopted it.

---

What's the biggest bottleneck between your sales and product teams?

#ProductOps #Automation #AIinBusiness
```

---

## Full Example (Agency Audience)

```
My friend runs a plumbing company. He was losing $2K/month to no-shows.

Here's what we built in 45 minutes.

---

The Problem:

He'd book 10 appointments, drive to 8 locations (2 would cancel
last-minute), and 3 of those 8 wouldn't answer the door.

That's 30% of his day wasted on gas and ghost appointments.

---

The Build:

Simple two-part reminder system:
→ 24 hours before appointment: automated text with confirmation link
→ 2 hours before: second text if they haven't confirmed

If they don't confirm the 2-hour text, system flags the appointment
so he doesn't waste the drive.

Tools I used:
- Calendly (he was already using it for booking)
- Twilio (for automated texts, $0.0079 per message)
- n8n (free tier, connects Calendly to Twilio)

Total setup cost: $0
Monthly cost: ~$15 for text messages
Time to build: 45 minutes

---

What Didn't Work:

I initially tried to build a full scheduling system from scratch.
Took 3 hours, broke twice, and he hated the interface.

Pivoted to just enhancing his existing Calendly setup. Live in
45 minutes instead of rebuilding the wheel.

---

Results after 30 days:
- No-shows: Dropped from 30% to 12%
- Revenue recovered: ~$2,400/month
- Time saved: 6 hours/week (no wasted drives)
- Cost to run: $15/month (text messages)

ROI: 160x in the first month.

---

Biggest takeaway: Start with the boring stuff.

Sexy automation is building an AI chatbot. Boring automation is
fixing no-shows. But boring automation has ROI in week one.

---

What's one boring process in your business you'd automate first?

#SmallBusiness #Automation #Trades
```

---

**End of LinkedIn Case Study SOP**
