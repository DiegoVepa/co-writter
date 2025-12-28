# Creating a New Content Entry

**Quick Reference Guide for Organizing Content in the Library**

---

## Step-by-Step Workflow

### 1. Create Dated Folder
```
Format: YYYY-MM-DD-short-slug-title/
Example: 2025-12-27-claude-code-skills-vs-desktop/
```

**Naming Rules:**
- Start with ISO date format (YYYY-MM-DD) for chronological sorting
- Use hyphens to separate words
- Keep slug short but descriptive (3-7 words max)
- Use lowercase
- No spaces or special characters

---

### 2. Set Up Folder Structure
```
2025-12-27-your-post-title/
├── linkedin-post.md      (or x-thread.md, substack-essay.md)
├── metadata.json
└── assets/
    └── (your visual files here)
```

---

### 3. Copy Metadata Template
```bash
cd content-library/2025-12-27-your-post-title/
cp ../_templates/metadata-template.json metadata.json
```

Then fill in:
- `date_created`: "2025-12-27"
- `title`: "Your Post Title"
- `platform`: ["linkedin"] or ["x"] or ["substack"]
- `audience`: "career" | "agency" | "both"
- `theme`: "what-i-built" | "boring-business" | "ai-for-ops" | "other"
- `hook_type`: "contrarian" | "what-i-built" | "problem-first" | "reframe"
- `status`: "draft" | "published"
- `tags`: ["relevant", "keywords", "here"]
- `safety_review`: "passed" | "flagged" | "needs-review"
- `word_count`: 287

---

### 4. Create Content File(s)

**For LinkedIn:**
```markdown
# [Post Title]

**Platform:** LinkedIn
**Audience:** Career | Agency | Both
**Theme:** What I Built
**Status:** Draft

---

[Your post content here]

---

**Visual Asset:** [filename.html](assets/filename.html)
**Tags:** #tag1 #tag2 #tag3
```

**For X/Twitter:**
```markdown
# [Thread Title]

**Platform:** X/Twitter
**Audience:** Career | Agency | Both
**Theme:** What I Built
**Status:** Draft

---

## Thread

1/ [Tweet 1 text - hook]

2/ [Tweet 2 text]

3/ [Tweet 3 text]

...

---

**Visual Assets:**
- [Image 1](assets/image1.png)
```

**For Substack:**
```markdown
# [Essay Title]

**Platform:** Substack
**Audience:** Career | Agency | Both
**Theme:** What I Built
**Status:** Draft
**Estimated Reading Time:** 7 minutes

---

[Your essay content here - 800-1500 words]

---

**Visual Assets:**
- [Diagram 1](assets/diagram1.html)
- [Chart](assets/chart.png)
```

---

### 5. Add Visual Assets

Save all visuals in the `assets/` subfolder:
- HTML files (interactive visuals)
- PNG/JPG images
- SVG diagrams
- GIFs

**File naming:**
- Descriptive names: `comparison-visual.html`, `workflow-diagram.png`
- No spaces (use hyphens)
- Include asset paths in `metadata.json`

---

### 6. Update README.md

Add new entry to `/content-library/README.md`:

**In "Recent Posts" table:**
```markdown
| 2025-12-27 | Your Post Title | LinkedIn | Career | Draft | [View](2025-12-27-your-post-title/) |
```

**In "By Theme" section:**
Add to appropriate category (What I Built, Boring Business, etc.)

**Update stats:**
- Increment total post count
- Update "Last Updated" date

---

## Multi-Platform Content

If creating content for **multiple platforms** from the same idea:

```
2025-12-27-automation-story/
├── linkedin-post.md
├── x-thread.md
├── substack-essay.md
├── metadata.json
└── assets/
    ├── linkedin-comparison.html
    ├── twitter-graphic.png
    └── substack-diagram.png
```

Update `metadata.json`:
```json
{
  "platform": ["linkedin", "x", "substack"],
  "assets": [
    "assets/linkedin-comparison.html",
    "assets/twitter-graphic.png",
    "assets/substack-diagram.png"
  ]
}
```

---

## After Publishing

### Update Metadata
Once post is live, update `metadata.json`:

```json
{
  "status": "published",
  "published_date": "2025-12-28",
  "published_url": "https://linkedin.com/posts/diegovences/...",
  "performance": {
    "views": 1250,
    "likes": 87,
    "comments": 12,
    "shares": 5,
    "inbound_dms": 3,
    "notes": "High engagement from Product Managers"
  }
}
```

### Track Performance
Update performance data weekly:
- Views, likes, comments, shares
- Inbound DMs (especially from target audience)
- Quality of engagement (note in "notes" field)

---

## Quick Checklist

Before finalizing any content entry:

- [ ] Folder name follows `YYYY-MM-DD-slug` format
- [ ] `metadata.json` filled out completely
- [ ] Content file(s) created with proper headers
- [ ] All assets saved in `assets/` subfolder
- [ ] Asset paths listed in `metadata.json`
- [ ] `README.md` updated with new entry
- [ ] Safety review completed ("passed" in metadata)
- [ ] Word count calculated and recorded
- [ ] Tags added for searchability

---

## Finding Old Content

**By Date:**
Folders are chronologically sorted. Just browse by month/year.

**By Theme:**
Check README.md "By Theme" section

**By Performance:**
Check README.md "Performance Leaders" section

**By Search:**
- Use Cmd+F in README.md
- Search file names in Finder
- Grep through content: `grep -r "keyword" content-library/`

---

## Example: Complete Workflow

```bash
# 1. Create folder
mkdir content-library/2025-12-27-hvac-automation-story

# 2. Create subfolders
mkdir content-library/2025-12-27-hvac-automation-story/assets

# 3. Copy metadata template
cp content-library/_templates/metadata-template.json \
   content-library/2025-12-27-hvac-automation-story/metadata.json

# 4. Edit metadata (use VS Code or text editor)
code content-library/2025-12-27-hvac-automation-story/metadata.json

# 5. Create content file
code content-library/2025-12-27-hvac-automation-story/linkedin-post.md

# 6. Add assets
# Save visuals to content-library/2025-12-27-hvac-automation-story/assets/

# 7. Update README
code content-library/README.md
```

---

**End of Workflow Guide**
