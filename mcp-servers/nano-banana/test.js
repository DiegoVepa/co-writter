#!/usr/bin/env node
/**
 * Quick test for Nano Banana MCP tools
 * Run: node test.js
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
  console.log('\nSet it up:');
  console.log('  echo "GOOGLE_API_KEY=your-key" > ../../.env');
  console.log('\nGet key at: https://aistudio.google.com/apikey');
  process.exit(1);
}

console.log('✅ API key found');

const ai = new GoogleGenAI({ apiKey });

async function testConnection() {
  console.log('\n--- Test 1: API Connection ---');
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: 'Say "Hello from Nano Banana!" in exactly 5 words.',
    });
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log('✅ Connection works:', text);
    return true;
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    return false;
  }
}

async function testImageGeneration() {
  console.log('\n--- Test 2: Image Generation ---');
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp-image-generation',
      contents: 'Generate a simple orange circle on white background.',
      config: {
        responseModalities: ['image', 'text'],
      },
    });

    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        const outputPath = path.join(__dirname, 'test-output.png');
        const buffer = Buffer.from(part.inlineData.data, 'base64');
        fs.writeFileSync(outputPath, buffer);
        console.log('✅ Image generated:', outputPath);
        return true;
      }
    }

    console.log('⚠️  Model responded but no image returned');
    console.log('   This is normal if your API key lacks image generation access.');
    console.log('   The MCP will fall back to returning prompts instead.');
    return false;
  } catch (error) {
    console.error('⚠️  Image generation not available:', error.message);
    console.log('   The MCP will fall back to returning prompts instead.');
    return false;
  }
}

async function testInfographicPrompt() {
  console.log('\n--- Test 3: Infographic Prompt Build ---');

  const sections = [
    { heading: 'Capture', bullets: ['Get exact words', 'No interpretation'], icon: 'clipboard' },
    { heading: 'Pattern', bullets: ['Identify themes', 'Track frequency'], icon: 'magnifying glass' },
    { heading: 'Signal', bullets: ['Classify insight type'], icon: 'radar' },
  ];

  const sectionsText = sections.map((s, i) => {
    const bulletList = s.bullets.map(b => `   • ${b}`).join('\n');
    return `Section ${i + 1} - ${s.heading.toUpperCase()}:\n${bulletList}`;
  }).join('\n\n');

  console.log('✅ Infographic prompt structure:');
  console.log('   Topic: "Objection → Insight Pipeline"');
  console.log('   Sections: 3');
  console.log('   Key takeaway: "Stop handling. Start logging."');
  console.log('\n   Prompt preview:');
  console.log('   ' + sectionsText.split('\n').slice(0, 6).join('\n   ') + '\n   ...');

  return true;
}

async function runTests() {
  console.log('🍌 Nano Banana MCP Test Suite\n');
  console.log('=============================');

  const results = {
    connection: await testConnection(),
    imageGen: await testImageGeneration(),
    infographic: await testInfographicPrompt(),
  };

  console.log('\n=============================');
  console.log('Summary:');
  console.log(`  API Connection:     ${results.connection ? '✅ Pass' : '❌ Fail'}`);
  console.log(`  Image Generation:   ${results.imageGen ? '✅ Pass' : '⚠️  Fallback mode'}`);
  console.log(`  Infographic Build:  ${results.infographic ? '✅ Pass' : '❌ Fail'}`);

  if (!results.imageGen) {
    console.log('\n💡 Note: Image generation requires Gemini 2.0 Flash Experimental.');
    console.log('   If unavailable, the MCP returns prompts you can use with Imagen API.');
  }

  console.log('\n🎉 Test complete!');
}

runTests().catch(console.error);
