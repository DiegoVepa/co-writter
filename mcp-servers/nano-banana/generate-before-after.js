#!/usr/bin/env node
/**
 * Generate Before vs After infographic for Claude Extensions post
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
  const infographicPrompt = `You are a visual infographic designer.
Generate a single hand-drawn infographic image showing a BEFORE vs AFTER transformation.

TOPIC:
"From Friction to Flow: Claude Extensions"

LAYOUT STRUCTURE:
This is a BEFORE → AFTER comparison infographic with 3 rows.
Each row shows one tool's transformation.

ROW 1 - EXCEL:
LEFT SIDE (BEFORE):
- Sketch of a boring spreadsheet with rows of tiny checkboxes
- Text: "Rows of checkboxes"
- Text: "No patterns visible"
- Mood: cluttered, tedious
- Small sad face doodle

RIGHT SIDE (AFTER):
- Sketch of a clean dashboard with simple bar chart and trend line
- Text: "Interactive dashboard"
- Text: "Patterns jump out"
- Mood: clear, insightful
- Small happy face or lightbulb doodle

ROW 2 - POWERPOINT:
LEFT SIDE (BEFORE):
- Sketch of 3 small slides with different colored headers (messy)
- Text: "Mismatched colors"
- Text: "Manual formatting"
- Mood: inconsistent, time-wasting

RIGHT SIDE (AFTER):
- Sketch of 3 small slides with matching orange headers (clean)
- Text: "Brand consistent"
- Text: "Auto-formatted"
- Mood: professional, effortless

ROW 3 - CHROME:
LEFT SIDE (BEFORE):
- Sketch of person/stick figure with question marks around head
- Text: "Stuck debugging"
- Text: "1 hour lost"
- Mood: frustrated, confused

RIGHT SIDE (AFTER):
- Sketch of same person with lightbulb above head
- Text: "Clear path forward"
- Text: "Problem solved"
- Mood: clarity, relief

VISUAL ELEMENTS:
- Big arrow (→) in the CENTER of each row pointing from BEFORE to AFTER
- "BEFORE" label on left column header
- "AFTER" label on right column header
- Tool names (EXCEL, POWERPOINT, CHROME) as row labels on the far left in ORANGE

STYLE:
- The image must look like a real photograph of a hand-drawn infographic
  on a whiteboard or premium off-white notebook page.
- Use ONLY these marker colors:
  - Black marker: all main text, structure lines, primary doodles
  - Orange marker (#E8611A): highlighted keywords, arrows, tool names, emphasis
  - Dark charcoal: supporting text
- Do NOT use blue, red, green, or any other colors except black and orange.
- Lines must be slightly imperfect and wobbly like real handwriting.
- All text must be handwritten (NO digital fonts).
- Include simple hand-drawn doodles (faces, lightbulbs, checkmarks, charts).

TITLE:
At the top: "FROM FRICTION → TO FLOW" in bold marker with orange underline
Subtitle: "3 Claude Extensions That Changed My Workflow"

KEY TAKEAWAY:
At the bottom in a hand-drawn box with orange border:
"Same work. Less friction."

BOTTOM CTA:
"Follow @DiegoVences for more AI content"

IMAGE FORMAT:
- 1080 x 1350 pixels, portrait orientation.
- Bright natural lighting with slight realistic shadows.
- Background should be whiteboard or premium paper texture.
- The final image should look like a real photograph of a physical whiteboard.`;

  console.log('🎨 Generating Before vs After infographic...');

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
        const date = new Date().toISOString().split('T')[0];
        const slug = 'claude-extensions-workflows';

        const contentDir = path.resolve(__dirname, `../../content-library/${date}-${slug}`);
        const picturesDir = path.resolve(__dirname, `../../pictures-generated/${date}-${slug}`);

        fs.mkdirSync(contentDir, { recursive: true });
        fs.mkdirSync(picturesDir, { recursive: true });

        const buffer = Buffer.from(part.inlineData.data, 'base64');

        const contentPath = path.join(contentDir, 'before-after-infographic.png');
        const picturesPath = path.join(picturesDir, 'before-after-infographic.png');

        fs.writeFileSync(contentPath, buffer);
        fs.writeFileSync(picturesPath, buffer);

        // Save prompt
        const promptPath = path.join(contentDir, 'before-after-prompt.md');
        fs.writeFileSync(promptPath, `# Before vs After Infographic Prompt\n\n\`\`\`\n${infographicPrompt}\n\`\`\``);

        console.log('\n✅ Before vs After infographic generated!');
        console.log('   Content library:', contentPath);
        console.log('   Pictures folder:', picturesPath);

        return { contentPath, picturesPath };
      }
    }

    console.log('\n⚠️  No image returned, saving prompt...');
    const promptPath = path.resolve(__dirname, '../../before-after-prompt.md');
    fs.writeFileSync(promptPath, `# Prompt\n\n\`\`\`\n${infographicPrompt}\n\`\`\``);
    return { promptPath };

  } catch (error) {
    console.error('❌ Generation failed:', error.message);
    return { error: error.message };
  }
}

generateInfographic().catch(console.error);
