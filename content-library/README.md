# Content Library

**Purpose:** Organized archive of all content created through the co-writing system
**Owner:** Diego Vences
**Total Posts:** 7
**Last Updated:** 2026-01-26

---

## Quick Links

- [Templates](_templates/) - Metadata and folder structure templates
- [Workflow Guide](_templates/folder-structure.md) - How to create new content entries

---

## Recent Posts

| Date | Title | Platform | Audience | Status | Link |
|------|-------|----------|----------|--------|------|
| 2026-01-25 | Mi Ciclo de IA - Operations Over Training | Linkedin | Both | Ready | [View](2026-01-25-mi-ciclo-de-ia-operaciones/) |
| 2026-01-25 | My AI Cycle - Claude as Co-Writer | Linkedin | Career | Ready | [View](2026-01-25-mi-ciclo-ia-co-writer/) |
| 2026-01-25 | AI-Native Businesses | Linkedin | Both | Ready | [View](2026-01-25-negocios-ia-native/) |
| 2026-01-25 | From AI Pilots to Real Impact | Linkedin | Career | Ready | [View](2026-01-25-pilotos-a-impacto/) |
| 2026-01-18 | AI Video Production for Small Businesses - PhD Research Insight | Linkedin | Both | Ready | [View](2026-01-18-ai-video-production-smbs/) |
| 2026-01-18 | Using NotebookLM as a Learning Tool for Meta Ads | Linkedin | Both | Ready | [View](2026-01-18-notebooklm-learning-tool/) |
| 2025-12-27 | Claude Code: Skills vs Cloud Desktop | Linkedin | Career | Draft | [View](2025-12-27-claude-code-skills-vs-desktop/) |


---

## By Theme

### What I Built
_Posts showcasing technical builds, tools, and automation projects_

- [2026-01-25: My AI Cycle - Claude as Co-Writer](2026-01-25-mi-ciclo-ia-co-writer/)
- [2025-12-27: Claude Code: Skills vs Cloud Desktop](2025-12-27-claude-code-skills-vs-desktop/)

---

### Boring Business
_Posts about AI/automation for HVAC, trades, and unsexy industries_

- [2026-01-25: AI-Native Businesses](2026-01-25-negocios-ia-native/)
- [2026-01-18: AI Video Production for Small Businesses - PhD Research Insight](2026-01-18-ai-video-production-smbs/)

---

### AI for Ops & GTM
_Posts about automation for sales operations, marketing, and cross-functional workflows_

- [2026-01-25: Mi Ciclo de IA - Operations Over Training](2026-01-25-mi-ciclo-de-ia-operaciones/)
- [2026-01-25: From AI Pilots to Real Impact](2026-01-25-pilotos-a-impacto/)
- [2026-01-18: Using NotebookLM as a Learning Tool for Meta Ads](2026-01-18-notebooklm-learning-tool/)

---

## By Audience

### Career Pivot (Product/Marketing Hiring Managers)
_Technical credibility, product thinking, cross-functional showcases_

**Total:** 3 posts

- [2026-01-25: My AI Cycle - Claude as Co-Writer](2026-01-25-mi-ciclo-ia-co-writer/)
- [2026-01-25: From AI Pilots to Real Impact](2026-01-25-pilotos-a-impacto/)
- [2025-12-27: Claude Code: Skills vs Cloud Desktop](2025-12-27-claude-code-skills-vs-desktop/)

---

### Agency Build (SMB Owners in Trades)
_Boring business case studies, ROI-focused, plain language_

**Total:** 0 posts


---

### Both Audiences
_Overlap content that serves both Career and Agency goals_

**Total:** 4 posts

- [2026-01-25: Mi Ciclo de IA - Operations Over Training](2026-01-25-mi-ciclo-de-ia-operaciones/)
- [2026-01-25: AI-Native Businesses](2026-01-25-negocios-ia-native/)
- [2026-01-18: AI Video Production for Small Businesses - PhD Research Insight](2026-01-18-ai-video-production-smbs/)
- [2026-01-18: Using NotebookLM as a Learning Tool for Meta Ads](2026-01-18-notebooklm-learning-tool/)

---

## Performance Leaders

### Most Engagement
_Top posts by total engagement (views + likes + comments + shares)_

- No published posts yet

---

### Most Inbound DMs
_Posts that generated the most quality inbound messages from target audiences_

- No published posts yet

---

### Top by Audience Type

**Career Audience (Best engagement from hiring managers/recruiters):**
- No published posts yet

**Agency Audience (Best engagement from SMB owners):**
- No published posts yet

---

## Analytics Dashboard

### Content Mix (Target: 60% Internal / 30% Helping Friends / 10% Educational)

**Current Mix (7 posts):**
- Internal work projects: 29% (2 posts)
- "Helping friends" stories: 29% (2 posts)
- Educational/thought leadership: 43% (3 posts)

**Safety Compliance:**
- All posts passed employment safety review
- Total posts flagged for revision: 0

---

### Platform Distribution

**Linkedin:** 7 posts
**Twitter:** 0 posts
**Substack:** 0 posts

---

### Hook Type Performance

**Contrarian Takes:** 5 posts
**What I Built:** 1 posts
**Reframe:** 1 posts
**Before/After:** 0 posts
**Problem-First:** 0 posts
**Counter-Intuitive:** 0 posts

---

## Monthly Archive

### 2026

**January:**
- [2026-01-25: Mi Ciclo de IA - Operations Over Training](2026-01-25-mi-ciclo-de-ia-operaciones/)
- [2026-01-25: My AI Cycle - Claude as Co-Writer](2026-01-25-mi-ciclo-ia-co-writer/)
- [2026-01-25: AI-Native Businesses](2026-01-25-negocios-ia-native/)
- [2026-01-25: From AI Pilots to Real Impact](2026-01-25-pilotos-a-impacto/)
- [2026-01-18: AI Video Production for Small Businesses - PhD Research Insight](2026-01-18-ai-video-production-smbs/)
- [2026-01-18: Using NotebookLM as a Learning Tool for Meta Ads](2026-01-18-notebooklm-learning-tool/)

---

### 2025

**December:**
- [2025-12-27: Claude Code: Skills vs Cloud Desktop](2025-12-27-claude-code-skills-vs-desktop/)

---

## Search & Filter Tips

**Find by keyword:**
```bash
grep -r "keyword" content-library/
```

**Find by date range:**
```bash
ls content-library/ | grep "2026-01"
```

**Find drafts:**
```bash
grep -l '"status": "draft"' content-library/*/metadata.json
```

**Find high-performers:**
```bash
grep -l '"views": [0-9]' content-library/*/metadata.json | sort
```

---

## Maintenance

### When to Update This File

**Regenerate automatically:**
```bash
node scripts/generate-readme.js
```

**After publishing:**
- Update status in metadata.json from "ready-to-publish" to "published"
- Add performance data monthly

**Monthly review:**
- Regenerate README to update Performance Leaders
- Review analytics dashboard

---

## Workflow Reference

**Creating new content:**
1. Run: `node scripts/create-post.js --title "My Title" --audience career --theme what-i-built`
2. Edit the generated content files
3. Run: `node scripts/validate-metadata.js` to check
4. Run: `node scripts/generate-readme.js` to update index

**See full workflow:** [folder-structure.md](_templates/folder-structure.md)

---

**End of Content Library Index**

_This file is auto-generated by scripts/generate-readme.js_
