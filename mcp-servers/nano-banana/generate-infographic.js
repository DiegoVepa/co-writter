#!/usr/bin/env node
/**
 * Generate infographic for Claude Extensions post
 * Run: node scripts/generate-claude-extensions-infographic.js
 */

import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../../.env');
config({ path: envPath });

const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  console.error('❌ GOOGLE_API_KEY not found!');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function generateInfographic() {
  const topic = "Claude Extensions: 3 Workflows";

  const sections = [
    {
      heading: "EXCEL",
      bullets: [
        "Daily habit tracker",
        "Interactive dashboard",
        "See patterns over time"
      ],
      icon: "spreadsheet"
    },
    {
      heading: "POWERPOINT",
      bullets: [
        "DBA program slides",
        "Consistent colors across decks",
        "No manual formatting"
      ],
      icon: "slides"
    },
    {
      heading: "CHROME",
      bullets: [
        "Debugging Vapi AI issue",
        "Stuck for an hour → clarity",
        "Walked through the fix"
      ],
      icon: "browser"
    }
  ];

  const keyTakeaway = "Less friction. More thinking.";

  // Build sections text
  const sectionsText = sections.map((s, i) => {
    const bulletList = s.bullets.map(b => `   • ${b}`).join('\n');
    return `Section ${i + 1} - ${s.heading} (orange heading):
${bulletList}
[${s.icon} doodle]`;
  }).join('\n\n');

  const infographicPrompt = `You are a visual infographic designer.
Generate a single hand-drawn infographic image.

TOPIC:
${topic}

CONTENT TO VISUALIZE:
${sectionsText}

KEY TAKEAWAY:
${keyTakeaway}

OUTPUT REQUIREMENTS:
Generate ONE single image only.

STYLE:
- The image must look like a real photograph of a hand-drawn infographic
  on a whiteboard or premium off-white notebook page.
- Use ONLY these marker colors:
  - Black marker: all main text, structure lines, primary doodles
  - Orange marker (#E8611A): highlighted keywords, underlines, emphasis
    circles, section headers, key callouts
  - Dark charcoal (#2D2D2D): supporting/secondary text
  - Orange highlighter at ~40% opacity: keyword highlighting
- Do NOT use blue, red, green, or any other colors.
- Lines must be slightly imperfect and wobbly like real handwriting.
- All text must be handwritten (NO digital fonts anywhere in the image).
- Include small hand-drawn doodles/icons (arrows, light bulbs, checkmarks,
  stars, boxes, gears) in black with orange accents.
- Keep the design clean, structured, and highly readable.

LAYOUT:
- Dimensions: 1080 x 1350 pixels (portrait format).
- Title at the top: "CLAUDE EXTENSIONS" in big bold marker with orange underline.
- Subtitle: "3 Workflows" in smaller text
- 3 clear sections with hand-drawn separators/arrows between them.
- Each section should have:
   • a mini-heading in ORANGE marker (EXCEL, POWERPOINT, CHROME)
   • 2–3 bullet points (black marker)
   • one simple hand-drawn icon/doodle representing the tool
- Use hand-drawn boxes, arrows, separators, and highlights to guide the eye.
- Include the key takeaway boxed or circled near the bottom in orange.

VISUAL CLARITY RULES:
- Make text large and legible (this will be viewed on mobile phones).
- Do not overcrowd the page — generous whitespace between sections.
- Highlight only the most important words (2-3 per section maximum).

BOTTOM CTA:
Add handwritten text at the bottom:
"Follow @DiegoVences for more AI content"

IMAGE FORMAT:
- 1080 x 1350 pixels, portrait orientation.
- Bright natural lighting with slight realistic shadows.
- Background should be whiteboard or premium paper texture.
- The final image should look like a real photograph taken of a
  physical whiteboard/notebook — not a digital design.`;

  console.log('🎨 Generating infographic...');
  console.log('   Topic:', topic);
  console.log('   Sections:', sections.length);
  console.log('   Key takeaway:', keyTakeaway);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp-image-generation',
      contents: infographicPrompt,
      config: {
        responseModalities: ['image', 'text'],
      },
    });

    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        // Create output directories
        const date = new Date().toISOString().split('T')[0];
        const slug = 'claude-extensions-workflows';

        const contentDir = path.resolve(__dirname, `../../content-library/${date}-${slug}`);
        const picturesDir = path.resolve(__dirname, `../../pictures-generated/${date}-${slug}`);

        fs.mkdirSync(contentDir, { recursive: true });
        fs.mkdirSync(picturesDir, { recursive: true });

        const buffer = Buffer.from(part.inlineData.data, 'base64');

        // Save to both locations
        const contentPath = path.join(contentDir, 'infographic.png');
        const picturesPath = path.join(picturesDir, 'infographic.png');

        fs.writeFileSync(contentPath, buffer);
        fs.writeFileSync(picturesPath, buffer);

        // Save the prompt used
        const promptPath = path.join(contentDir, 'prompt-used.md');
        fs.writeFileSync(promptPath, `# Infographic Prompt\n\n\`\`\`\n${infographicPrompt}\n\`\`\``);

        console.log('\n✅ Infographic generated!');
        console.log('   Content library:', contentPath);
        console.log('   Pictures folder:', picturesPath);

        return { contentPath, picturesPath };
      }
    }

    // Fallback: save the prompt
    console.log('\n⚠️  Image not generated, saving prompt instead...');
    const promptPath = path.resolve(__dirname, '../../infographic-prompt.md');
    fs.writeFileSync(promptPath, `# Infographic Prompt\n\nUse this with Google AI Studio or Imagen API:\n\n\`\`\`\n${infographicPrompt}\n\`\`\``);
    console.log('   Prompt saved to:', promptPath);

    return { promptPath };

  } catch (error) {
    console.error('❌ Generation failed:', error.message);

    // Save the prompt for manual use
    const promptPath = path.resolve(__dirname, '../../infographic-prompt.md');
    fs.writeFileSync(promptPath, `# Infographic Prompt\n\nUse this with Google AI Studio or Imagen API:\n\n\`\`\`\n${infographicPrompt}\n\`\`\``);
    console.log('   Prompt saved to:', promptPath);

    return { promptPath, error: error.message };
  }
}

generateInfographic().catch(console.error);
