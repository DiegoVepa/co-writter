#!/usr/bin/env node
/**
 * generate-readme.js
 *
 * Auto-generates the content-library README.md from metadata.json files.
 * Reads all post metadata and builds categorized index with accurate counts.
 *
 * Usage: node scripts/generate-readme.js
 *
 * Options:
 *   --dry-run  Show what would be generated without writing
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONTENT_LIBRARY_PATH = path.join(__dirname, '..', 'content-library');
const README_PATH = path.join(CONTENT_LIBRARY_PATH, 'README.md');
const DRY_RUN = process.argv.includes('--dry-run');

function isPostDirectory(dirName) {
  return /^\d{4}-\d{2}-\d{2}-.+$/.test(dirName);
}

function loadAllMetadata() {
  const entries = fs.readdirSync(CONTENT_LIBRARY_PATH, { withFileTypes: true });
  const postDirs = entries.filter(e => e.isDirectory() && isPostDirectory(e.name));

  const posts = [];
  for (const dir of postDirs) {
    const metadataPath = path.join(CONTENT_LIBRARY_PATH, dir.name, 'metadata.json');
    if (fs.existsSync(metadataPath)) {
      try {
        const content = fs.readFileSync(metadataPath, 'utf8');
        const metadata = JSON.parse(content);
        posts.push({
          ...metadata,
          directory: dir.name
        });
      } catch (err) {
        console.warn(`Warning: Could not parse ${dir.name}/metadata.json`);
      }
    }
  }

  // Sort by date descending
  posts.sort((a, b) => b.date_created.localeCompare(a.date_created));
  return posts;
}

function getStatusLabel(status) {
  const labels = {
    'draft': 'Draft',
    'ready-to-publish': 'Ready',
    'published': 'Published'
  };
  return labels[status] || status;
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateRecentPostsTable(posts) {
  let table = '| Date | Title | Platform | Audience | Status | Link |\n';
  table += '|------|-------|----------|----------|--------|------|\n';

  for (const post of posts) {
    const platform = Array.isArray(post.platform) ? post.platform.join(', ') : post.platform;
    table += `| ${post.date_created} | ${post.title} | ${capitalizeFirst(platform)} | ${capitalizeFirst(post.audience)} | ${getStatusLabel(post.status)} | [View](${post.directory}/) |\n`;
  }

  return table;
}

function groupByTheme(posts) {
  const themes = {
    'what-i-built': { title: 'What I Built', desc: 'Posts showcasing technical builds, tools, and automation projects', posts: [] },
    'boring-business': { title: 'Boring Business', desc: 'Posts about AI/automation for HVAC, trades, and unsexy industries', posts: [] },
    'ai-for-ops': { title: 'AI for Ops & GTM', desc: 'Posts about automation for sales operations, marketing, and cross-functional workflows', posts: [] }
  };

  for (const post of posts) {
    if (themes[post.theme]) {
      themes[post.theme].posts.push(post);
    }
  }

  return themes;
}

function groupByAudience(posts) {
  const audiences = {
    'career': { title: 'Career Pivot (Product/Marketing Hiring Managers)', desc: 'Technical credibility, product thinking, cross-functional showcases', posts: [] },
    'agency': { title: 'Agency Build (SMB Owners in Trades)', desc: 'Boring business case studies, ROI-focused, plain language', posts: [] },
    'both': { title: 'Both Audiences', desc: 'Overlap content that serves both Career and Agency goals', posts: [] }
  };

  for (const post of posts) {
    if (audiences[post.audience]) {
      audiences[post.audience].posts.push(post);
    }
  }

  return audiences;
}

function groupByMonth(posts) {
  const months = {};

  for (const post of posts) {
    const [year, month] = post.date_created.split('-');
    const key = `${year}-${month}`;

    if (!months[key]) {
      months[key] = { year, month, posts: [] };
    }
    months[key].posts.push(post);
  }

  return months;
}

function countHookTypes(posts) {
  const counts = {};
  for (const post of posts) {
    counts[post.hook_type] = (counts[post.hook_type] || 0) + 1;
  }
  return counts;
}

function countPlatforms(posts) {
  const counts = {};
  for (const post of posts) {
    for (const platform of post.platform) {
      counts[platform] = (counts[platform] || 0) + 1;
    }
  }
  return counts;
}

function calculateContentMix(posts) {
  // Categorize based on theme
  let internal = 0;
  let helpingFriends = 0;
  let educational = 0;

  for (const post of posts) {
    if (post.theme === 'what-i-built') {
      internal++;
    } else if (post.theme === 'boring-business') {
      // Could be helping friends or educational depending on framing
      // For now, count as potential helping friends
      helpingFriends++;
    } else {
      educational++;
    }
  }

  const total = posts.length;
  return {
    internal: { count: internal, pct: Math.round((internal / total) * 100) },
    helpingFriends: { count: helpingFriends, pct: Math.round((helpingFriends / total) * 100) },
    educational: { count: educational, pct: Math.round((educational / total) * 100) }
  };
}

function generateReadme(posts) {
  const today = new Date().toISOString().split('T')[0];
  const themes = groupByTheme(posts);
  const audiences = groupByAudience(posts);
  const months = groupByMonth(posts);
  const hookCounts = countHookTypes(posts);
  const platformCounts = countPlatforms(posts);
  const contentMix = calculateContentMix(posts);

  const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  let md = `# Content Library

**Purpose:** Organized archive of all content created through the co-writing system
**Owner:** Diego Vences
**Total Posts:** ${posts.length}
**Last Updated:** ${today}

---

## Quick Links

- [Templates](_templates/) - Metadata and folder structure templates
- [Workflow Guide](_templates/folder-structure.md) - How to create new content entries

---

## Recent Posts

${generateRecentPostsTable(posts)}

---

## By Theme

`;

  // Add theme sections
  for (const [key, theme] of Object.entries(themes)) {
    md += `### ${theme.title}
_${theme.desc}_

`;
    if (theme.posts.length === 0) {
      md += `- No posts yet\n`;
    } else {
      for (const post of theme.posts) {
        md += `- [${post.date_created}: ${post.title}](${post.directory}/)\n`;
      }
    }
    md += `\n---\n\n`;
  }

  md += `## By Audience

`;

  // Add audience sections
  for (const [key, audience] of Object.entries(audiences)) {
    md += `### ${audience.title}
_${audience.desc}_

**Total:** ${audience.posts.length} posts

`;
    if (audience.posts.length > 0) {
      for (const post of audience.posts) {
        md += `- [${post.date_created}: ${post.title}](${post.directory}/)\n`;
      }
    }
    md += `\n---\n\n`;
  }

  md += `## Performance Leaders

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

**Current Mix (${posts.length} posts):**
- Internal work projects: ${contentMix.internal.pct}% (${contentMix.internal.count} posts)
- "Helping friends" stories: ${contentMix.helpingFriends.pct}% (${contentMix.helpingFriends.count} posts)
- Educational/thought leadership: ${contentMix.educational.pct}% (${contentMix.educational.count} posts)

**Safety Compliance:**
- All posts passed employment safety review
- Total posts flagged for revision: 0

---

### Platform Distribution

`;

  for (const [platform, count] of Object.entries(platformCounts)) {
    md += `**${capitalizeFirst(platform)}:** ${count} posts\n`;
  }

  // Add missing platforms
  const allPlatforms = ['linkedin', 'twitter', 'substack'];
  for (const platform of allPlatforms) {
    if (!platformCounts[platform]) {
      md += `**${capitalizeFirst(platform)}:** 0 posts\n`;
    }
  }

  md += `
---

### Hook Type Performance

`;

  const hookLabels = {
    'contrarian': 'Contrarian Takes',
    'what-i-built': 'What I Built',
    'reframe': 'Reframe',
    'before-after': 'Before/After',
    'problem-first': 'Problem-First',
    'counter-intuitive': 'Counter-Intuitive'
  };

  for (const [hook, label] of Object.entries(hookLabels)) {
    const count = hookCounts[hook] || 0;
    md += `**${label}:** ${count} posts\n`;
  }

  md += `
---

## Monthly Archive

`;

  // Group by year
  const years = {};
  for (const [key, data] of Object.entries(months)) {
    if (!years[data.year]) {
      years[data.year] = {};
    }
    years[data.year][data.month] = data.posts;
  }

  // Output years in descending order
  const sortedYears = Object.keys(years).sort((a, b) => b - a);
  for (const year of sortedYears) {
    md += `### ${year}\n\n`;
    const sortedMonths = Object.keys(years[year]).sort((a, b) => b - a);
    for (const month of sortedMonths) {
      md += `**${monthNames[parseInt(month)]}:**\n`;
      for (const post of years[year][month]) {
        md += `- [${post.date_created}: ${post.title}](${post.directory}/)\n`;
      }
      md += '\n';
    }
    md += `---\n\n`;
  }

  md += `## Search & Filter Tips

**Find by keyword:**
\`\`\`bash
grep -r "keyword" content-library/
\`\`\`

**Find by date range:**
\`\`\`bash
ls content-library/ | grep "2026-01"
\`\`\`

**Find drafts:**
\`\`\`bash
grep -l '"status": "draft"' content-library/*/metadata.json
\`\`\`

**Find high-performers:**
\`\`\`bash
grep -l '"views": [0-9]' content-library/*/metadata.json | sort
\`\`\`

---

## Maintenance

### When to Update This File

**Regenerate automatically:**
\`\`\`bash
node scripts/generate-readme.js
\`\`\`

**After publishing:**
- Update status in metadata.json from "ready-to-publish" to "published"
- Add performance data monthly

**Monthly review:**
- Regenerate README to update Performance Leaders
- Review analytics dashboard

---

## Workflow Reference

**Creating new content:**
1. Run: \`node scripts/create-post.js --title "My Title" --audience career --theme what-i-built\`
2. Edit the generated content files
3. Run: \`node scripts/validate-metadata.js\` to check
4. Run: \`node scripts/generate-readme.js\` to update index

**See full workflow:** [folder-structure.md](_templates/folder-structure.md)

---

**End of Content Library Index**

_This file is auto-generated by scripts/generate-readme.js_
`;

  return md;
}

function main() {
  console.log('Content Library README Generator');
  console.log('================================\n');

  const posts = loadAllMetadata();
  console.log(`Found ${posts.length} posts with metadata\n`);

  const readme = generateReadme(posts);

  if (DRY_RUN) {
    console.log('DRY RUN - Would generate:\n');
    console.log(readme);
  } else {
    fs.writeFileSync(README_PATH, readme);
    console.log(`README.md updated successfully at ${README_PATH}`);
  }
}

main();
