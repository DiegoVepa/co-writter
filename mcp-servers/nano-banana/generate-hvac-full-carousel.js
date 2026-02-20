#!/usr/bin/env node

/**
 * Generate Full 8-Slide HVAC AI Tools Carousel
 * Style: Brand-Faithful (Variant #1)
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
const outputDir = path.resolve(__dirname, '../../content-library/2026-02-16-hvac-ai-tools/carousel-ai-generated');

// Brand specs (consistent across all slides)
const brandSpecs = `
BRAND SPECIFICATIONS (apply to ALL slides):
- Background: Dark charcoal (#2D2D2D)
- Primary accent: Orange (#E8611A)
- Headlines: White (#FFFFFF) with key words in orange
- Body text: White (#FFFFFF)
- Secondary text: Gray (#6B6B6B)
- Border: Thin orange (#E8611A) border with rounded corners around entire slide
- Top-left: Orange decorative stars (✦ ✦ ✦)
- Top-right: "@DiegoVences" in gray
- Bottom-right: Orange chevrons (>>>) indicating swipe
- Typography: Bold sans-serif headlines, clean sans-serif body
- Dimensions: 1080x1080 pixels square
- Make all text clearly legible at mobile size
`;

// All 8 slides content
const slides = [
  {
    name: "slide-01-title",
    prompt: `Create LinkedIn carousel TITLE SLIDE (slide 1 of 8).

CONTENT:
Headline: "5 AI TOOLS HVAC CONTRACTORS ARE USING TO SAVE 10+ HOURS/WEEK"
- "5 AI TOOLS" in white
- "HVAC" in orange (#E8611A)
- "CONTRACTORS ARE USING TO SAVE" in white
- "10+ HOURS/WEEK" in orange (#E8611A)

Subtitle (italic, gray): "The best AI opportunities are in businesses nobody talks about."

Orange card box containing:
"WHAT'S INSIDE:"
"→ 5 tools saving real time & money"
"→ Exact costs and setup times"
"→ ROI that shows up in week one"

${brandSpecs}

This is the HOOK slide - make it attention-grabbing and professional.`
  },
  {
    name: "slide-02-problem",
    prompt: `Create LinkedIn carousel PROBLEM SLIDE (slide 2 of 8).

CONTENT:
Headline: "Most HVAC businesses are DROWNING in manual work"
- "DROWNING" should be in orange (#E8611A)

Pain points (with icons):
📞 "Missed calls while on the job"
🚫 "No-shows eating into revenue"
💸 "Chasing unpaid invoices weekly"
🔁 "Phone tag with customers"

Bottom callout in orange pill/box:
"ROI sitting on the table."

${brandSpecs}

Use simple line-art style icons in orange outline. Show the frustration visually.`
  },
  {
    name: "slide-03-tool1",
    prompt: `Create LinkedIn carousel TOOL SLIDE (slide 3 of 8).

CONTENT:
Header badge: "TOOL #1" (small, orange background)

Headline: "Never miss a LEAD again"
- "LEAD" in orange (#E8611A)

Subhead: "24/7 Virtual Agent"

Bullet points:
• "Takes calls/texts at 3am"
• "Books appointments automatically"
• "Answers FAQs (pricing, availability)"

Bottom stats box:
"Cost: $50-150/month"
"ROI: 20-30% more leads captured"

${brandSpecs}

Include a simple phone/chat icon in orange outline style.`
  },
  {
    name: "slide-04-tool2",
    prompt: `Create LinkedIn carousel TOOL SLIDE (slide 4 of 8).

CONTENT:
Header badge: "TOOL #2" (small, orange background)

Headline: "Stop the SCHEDULING chaos"
- "SCHEDULING" in orange (#E8611A)

Subhead: "Smart Scheduling & Dispatch"

Bullet points:
• "Auto-builds daily routes"
• "Optimizes technician assignments"
• "Reshuffles when jobs cancel"

Bottom highlight box:
"4-6 hours/week back"

${brandSpecs}

Include a simple calendar/route icon in orange outline style.`
  },
  {
    name: "slide-05-tool3",
    prompt: `Create LinkedIn carousel TOOL SLIDE (slide 5 of 8).

CONTENT:
Header badge: "TOOL #3" (small, orange background)

Headline: "Cut NO-SHOWS by 60%"
- "NO-SHOWS" in orange (#E8611A)
- "60%" in large orange text

Subhead: "Appointment Reminders"

Bullet points:
• "Automated text 24hrs before"
• "Second text 2hrs before"
• "Flags non-confirmations"

Bottom stats:
"Cost: ~$15/month | Setup: 45 min"
"Result: Save $2K+/month in wasted trips"

${brandSpecs}

Include a simple bell/notification icon in orange outline style.`
  },
  {
    name: "slide-06-tool4",
    prompt: `Create LinkedIn carousel TOOL SLIDE (slide 6 of 8).

CONTENT:
Header badge: "TOOL #4" (small, orange background)

Headline: "Stop CHASING payments"
- "CHASING" in orange (#E8611A)

Subhead: "Quote & Invoice Follow-ups"

Bullet points:
• "Auto-reminder at 3, 7, 14 days"
• "Quote follow-ups before they go cold"
• "Late payment escalation"

Bottom highlight in orange:
"Revenue recovered: $2K+/month"

${brandSpecs}

Include a simple invoice/dollar icon in orange outline style.`
  },
  {
    name: "slide-07-tool5",
    prompt: `Create LinkedIn carousel TOOL SLIDE (slide 7 of 8).

CONTENT:
Header badge: "TOOL #5" (small, orange background)

Headline: "Troubleshoot FASTER"
- "FASTER" in orange (#E8611A)

Subhead: "AI-Powered Diagnostics"

Bullet points:
• "Captures real-time system data"
• "AI pinpoints issues instantly"
• "Guides techs through repairs"

Bottom result:
"Faster fixes. Fewer callbacks. Happy customers."

${brandSpecs}

Include a simple wrench/diagnostic icon in orange outline style.`
  },
  {
    name: "slide-08-summary",
    prompt: `Create LinkedIn carousel SUMMARY/CTA SLIDE (slide 8 of 8).

CONTENT:
Headline: "BORING automation that pays for itself"
- "BORING" in orange (#E8611A)

Summary stats (large, prominent):
• "Total investment: $100-300/month"
• "Time saved: 10+ hours/week"
• "ROI: Shows up in week one"

Closing statement (italic):
"These aren't cutting-edge AI experiments. They're simple tools that free you to focus on what matters: running your business."

CTA in orange box:
"What would you automate first?"

Handle: "@DiegoVences" prominently at bottom

${brandSpecs}

This is the CLOSING slide - make it impactful and memorable. NO chevrons on this final slide.`
  }
];

async function generateSlide(slide, index) {
  console.log(`\n[${index + 1}/8] Generating: ${slide.name}`);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp-image-generation',
      contents: slide.prompt,
      config: {
        responseModalities: ['image', 'text'],
      },
    });

    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        const imageBytes = part.inlineData.data;
        const outputPath = path.join(outputDir, `${slide.name}.png`);
        const buffer = Buffer.from(imageBytes, 'base64');
        fs.writeFileSync(outputPath, buffer);
        console.log(`✅ Saved: ${slide.name}.png`);
        return { success: true, path: outputPath };
      }
    }

    console.log(`⚠️  No image returned for ${slide.name}`);
    return { success: false, reason: 'No image in response' };

  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return { success: false, reason: error.message };
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('FULL CAROUSEL GENERATOR');
  console.log('HVAC AI Tools - 8 Slides');
  console.log('Style: Brand-Faithful (Dark Template)');
  console.log('='.repeat(60));
  console.log(`Output: ${outputDir}`);

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const results = [];

  for (let i = 0; i < slides.length; i++) {
    const result = await generateSlide(slides[i], i);
    results.push({ slide: slides[i].name, ...result });

    // Delay between requests to avoid rate limiting
    if (i < slides.length - 1) {
      console.log('   ⏳ Waiting 3s before next slide...');
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('GENERATION SUMMARY');
  console.log('='.repeat(60));

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`✅ Successful: ${successful.length}/8`);
  successful.forEach(r => console.log(`   - ${r.slide}`));

  if (failed.length > 0) {
    console.log(`❌ Failed: ${failed.length}/8`);
    failed.forEach(r => console.log(`   - ${r.slide}: ${r.reason}`));
  }

  console.log('\n🎉 Done! Carousel slides saved to:');
  console.log(outputDir);
}

main().catch(console.error);
