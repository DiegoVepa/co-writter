#!/usr/bin/env node

/**
 * Generate 5 Creative Variants for HVAC AI Tools Title Slide
 * Uses Gemini 2.0 Flash Image Generation
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
  console.error('GOOGLE_API_KEY not found in .env');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

// Output directory
const outputDir = path.resolve(__dirname, '../../content-library/2026-02-16-hvac-ai-tools/variants');

// 5 Variant Prompts
const variants = [
  {
    name: "variant-1-brand-faithful",
    description: "Exact brand specs, dark template",
    prompt: `Create a LinkedIn carousel title slide for HVAC business content.

EXACT CONTENT TO DISPLAY:
Headline: "5 AI TOOLS HVAC CONTRACTORS ARE USING TO SAVE 10+ HOURS/WEEK"
- "5 AI TOOLS" should be in white
- "HVAC" should be highlighted in orange (#E8611A)
- "CONTRACTORS ARE USING TO SAVE" in white
- "10+ HOURS/WEEK" in orange (#E8611A)

Subtitle (italic, smaller, gray): "The best AI opportunities are in businesses nobody talks about."

Include an orange (#E8611A) card/box containing:
"WHAT'S INSIDE:"
"→ 5 tools saving real time & money"
"→ Exact costs and setup times"
"→ ROI that shows up in week one"

DESIGN SPECS:
- Background: Dark charcoal (#2D2D2D)
- Primary accent: Orange (#E8611A)
- Text: White (#FFFFFF) with orange highlights
- Top decorative element: Three orange stars/sparkles (✦ ✦ ✦)
- Handle "@DiegoVences" in top-right corner (gray text)
- Handle "@DiegoVences" also at bottom-left
- Orange chevron arrows (>>>) at bottom-right indicating "swipe"
- Thin orange border around the entire slide with rounded corners

LAYOUT:
- Stars top-left, handle top-right
- Large headline in upper portion
- Orange content box in lower-left area
- Clean, professional, modern design

DIMENSIONS: 1080x1080 pixels square
NO placeholder text - use exact copy provided above.
Make all text clearly legible at mobile size.`
  },
  {
    name: "variant-2-enhanced",
    description: "Same concept, premium polish",
    prompt: `Create a premium, elevated LinkedIn carousel title slide for HVAC business content.

EXACT CONTENT TO DISPLAY:
Headline: "5 AI TOOLS HVAC CONTRACTORS ARE USING TO SAVE 10+ HOURS/WEEK"
- "5 AI TOOLS" in white
- "HVAC" highlighted in bright orange (#E8611A)
- "CONTRACTORS ARE USING TO SAVE" in white
- "10+ HOURS/WEEK" in orange (#E8611A)

Subtitle: "The best AI opportunities are in businesses nobody talks about."

Orange card containing:
"WHAT'S INSIDE:"
"→ 5 tools saving real time & money"
"→ Exact costs and setup times"
"→ ROI that shows up in week one"

PREMIUM ENHANCEMENTS:
- Background: Rich dark charcoal (#2D2D2D) with subtle gradient or texture
- Add subtle depth and shadows to cards
- Premium typography with refined spacing
- Crisp, sharp orange (#E8611A) accents
- Elegant thin orange border with soft glow effect
- Professional lighting feel
- High-end editorial quality

LAYOUT:
- Three orange decorative stars top-left
- "@DiegoVences" top-right and bottom-left
- Large headline prominently placed
- Orange content card with premium styling
- Orange chevrons (>>>) bottom-right
- Overall feeling: premium, confident, polished

DIMENSIONS: 1080x1080 pixels
Make it look like a Fortune 500 company designed it.`
  },
  {
    name: "variant-3-layout-variation",
    description: "Different composition - centered layout",
    prompt: `Create a LinkedIn carousel title slide with CENTERED layout for HVAC content.

EXACT CONTENT:
Headline: "5 AI TOOLS HVAC CONTRACTORS ARE USING TO SAVE 10+ HOURS/WEEK"
- Highlight "HVAC" and "10+ HOURS/WEEK" in orange (#E8611A)
- Rest in white

Subtitle: "The best AI opportunities are in businesses nobody talks about."

What's inside list:
"→ 5 tools saving real time & money"
"→ Exact costs and setup times"
"→ ROI that shows up in week one"

LAYOUT VARIATION - CENTERED:
- Everything centered on the slide
- Headline at top, centered
- Subtitle below headline, centered
- Orange content box in the CENTER of the slide
- Orange decorative elements on BOTH sides (not just left)
- Handle "@DiegoVences" centered at bottom
- No photo placeholder needed
- Symmetrical, balanced design

DESIGN:
- Background: Dark charcoal (#2D2D2D)
- Accent: Orange (#E8611A)
- Text: White
- Thin orange border with rounded corners
- Orange chevrons centered at bottom

DIMENSIONS: 1080x1080 pixels
Professional, clean, centered composition.`
  },
  {
    name: "variant-4-mood-shift",
    description: "Warmer, more energetic feel",
    prompt: `Create a LinkedIn carousel title slide with WARM, ENERGETIC mood for HVAC content.

EXACT CONTENT:
Headline: "5 AI TOOLS HVAC CONTRACTORS ARE USING TO SAVE 10+ HOURS/WEEK"
- "HVAC" and "10+ HOURS/WEEK" in bright warm orange
- Rest in warm white/cream

Subtitle: "The best AI opportunities are in businesses nobody talks about."

What's inside:
"→ 5 tools saving real time & money"
"→ Exact costs and setup times"
"→ ROI that shows up in week one"

MOOD SHIFT - WARM & ENERGETIC:
- Background: Slightly warmer dark tone (hint of brown in the charcoal)
- Orange accent: Brighter, more vibrant #E8611A with warm glow
- Add subtle warm orange gradient or glow effects
- Text feels more dynamic and energetic
- Bolder, more impactful typography
- Energy and optimism in the design
- Like sunrise/golden hour lighting mood

ELEMENTS:
- Warm-toned decorative stars (✦ ✦ ✦)
- "@DiegoVences" handle
- Orange content card with warm styling
- Chevrons (>>>) with energy

DIMENSIONS: 1080x1080 pixels
Feel: Exciting, opportunity-rich, warm, inviting.`
  },
  {
    name: "variant-5-experimental",
    description: "Bold creative risk - asymmetric with strong focal point",
    prompt: `Create an EXPERIMENTAL, BOLD LinkedIn carousel title slide for HVAC content.

EXACT CONTENT:
Headline: "5 AI TOOLS HVAC CONTRACTORS ARE USING TO SAVE 10+ HOURS/WEEK"
Subtitle: "The best AI opportunities are in businesses nobody talks about."
What's inside list (same content as before)

EXPERIMENTAL APPROACH:
- Break conventional layout rules
- BOLD asymmetric composition
- One large "5" as a massive background element (oversized, faded)
- Headline could be arranged in an unexpected way (stacked differently, varied sizes)
- Orange (#E8611A) used in an unexpected, striking way
- Create strong visual tension and focal point
- Dark charcoal (#2D2D2D) background
- Still professional but attention-grabbing
- Make the viewer stop scrolling

CREATIVE RISKS TO TAKE:
- Extreme size contrast in typography
- Unexpected element placement
- Bold geometric shapes or lines
- The "5" number could be huge and stylized
- Orange border could be partial or broken
- Dynamic, almost poster-like design

Still include:
- "@DiegoVences" handle
- Orange chevrons (>>>)
- The what's inside content

DIMENSIONS: 1080x1080 pixels
Goal: Stand out dramatically while still being on-brand.`
  }
];

async function generateVariant(variant, index) {
  console.log(`\n[${index + 1}/5] Generating: ${variant.name}`);
  console.log(`Description: ${variant.description}`);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp-image-generation',
      contents: variant.prompt,
      config: {
        responseModalities: ['image', 'text'],
      },
    });

    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        const imageBytes = part.inlineData.data;
        const outputPath = path.join(outputDir, `${variant.name}.png`);
        const buffer = Buffer.from(imageBytes, 'base64');
        fs.writeFileSync(outputPath, buffer);
        console.log(`✅ Saved: ${variant.name}.png`);
        return { success: true, path: outputPath };
      }
    }

    console.log(`⚠️  No image returned for ${variant.name}`);
    return { success: false, reason: 'No image in response' };

  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return { success: false, reason: error.message };
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('CREATIVE VARIANTS GENERATOR');
  console.log('HVAC AI Tools - Title Slide');
  console.log('='.repeat(60));
  console.log(`Output: ${outputDir}`);

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const results = [];

  for (let i = 0; i < variants.length; i++) {
    const result = await generateVariant(variants[i], i);
    results.push({ variant: variants[i].name, ...result });

    // Small delay between requests
    if (i < variants.length - 1) {
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('GENERATION SUMMARY');
  console.log('='.repeat(60));

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`✅ Successful: ${successful.length}/5`);
  successful.forEach(r => console.log(`   - ${r.variant}`));

  if (failed.length > 0) {
    console.log(`❌ Failed: ${failed.length}/5`);
    failed.forEach(r => console.log(`   - ${r.variant}: ${r.reason}`));
  }

  // Save prompts for reference
  const promptsDoc = variants.map(v => `## ${v.name}\n\n**Description:** ${v.description}\n\n\`\`\`\n${v.prompt}\n\`\`\`\n`).join('\n---\n\n');
  fs.writeFileSync(path.join(outputDir, 'prompts.md'), `# Creative Variants Prompts\n\nGenerated: ${new Date().toISOString()}\n\n${promptsDoc}`);
  console.log('\n📝 Prompts saved to prompts.md');

  console.log('\n🎉 Done! Opening variants folder...');
}

main().catch(console.error);
