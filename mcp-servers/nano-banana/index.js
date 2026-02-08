#!/usr/bin/env node

/**
 * Nano Banana MCP Server
 * AI Image Generation using Google Gemini/Imagen API
 *
 * Tools:
 * - generate_image: Generate images from text prompts
 * - generate_background: Generate backgrounds for photo compositing
 * - analyze_photo: Analyze a photo for style matching
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables from repo root .env
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../../.env');
config({ path: envPath });

const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  console.error('GOOGLE_API_KEY environment variable is required');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

// Initialize MCP server
const server = new Server(
  {
    name: 'nano-banana',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'generate_image',
        description: 'Generate an image from a text prompt using Google Imagen',
        inputSchema: {
          type: 'object',
          properties: {
            prompt: {
              type: 'string',
              description: 'Detailed description of the image to generate',
            },
            style: {
              type: 'string',
              enum: ['professional', 'casual', 'artistic', 'photorealistic'],
              description: 'Style of the generated image',
            },
            outputPath: {
              type: 'string',
              description: 'Path to save the generated image',
            },
          },
          required: ['prompt'],
        },
      },
      {
        name: 'generate_background',
        description: 'Generate a background image suitable for photo compositing',
        inputSchema: {
          type: 'object',
          properties: {
            scene: {
              type: 'string',
              description: 'Description of the background scene (e.g., "city skyline at dusk", "modern office")',
            },
            mood: {
              type: 'string',
              enum: ['warm', 'cool', 'neutral', 'vibrant'],
              description: 'Color mood of the background',
            },
            outputPath: {
              type: 'string',
              description: 'Path to save the generated background',
            },
          },
          required: ['scene'],
        },
      },
      {
        name: 'analyze_photo',
        description: 'Analyze a photo to understand its style, lighting, and composition for matching',
        inputSchema: {
          type: 'object',
          properties: {
            imagePath: {
              type: 'string',
              description: 'Path to the image to analyze',
            },
          },
          required: ['imagePath'],
        },
      },
      {
        name: 'suggest_photo',
        description: 'Suggest the best photo from a collection based on post content and creative type',
        inputSchema: {
          type: 'object',
          properties: {
            photosDir: {
              type: 'string',
              description: 'Directory containing photos to choose from',
            },
            postTopic: {
              type: 'string',
              description: 'Topic or theme of the post',
            },
            creativeType: {
              type: 'string',
              enum: ['infographic', 'carousel', 'single_image', 'video_thumbnail'],
              description: 'Type of creative being made',
            },
            audience: {
              type: 'string',
              enum: ['career_pivot', 'agency_build', 'both'],
              description: 'Target audience segment',
            },
          },
          required: ['photosDir', 'postTopic', 'creativeType'],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'generate_image': {
        // Use gemma-3-27b-it as primary (reliable quota), fallback to gemini models
const model = genAI.getGenerativeModel({ model: 'gemma-3-27b-it' });

        const stylePrompts = {
          professional: 'Professional, clean, corporate style. High quality.',
          casual: 'Casual, approachable, friendly style.',
          artistic: 'Artistic, creative, visually striking.',
          photorealistic: 'Photorealistic, like a real photograph.',
        };

        const fullPrompt = `${args.prompt}. ${stylePrompts[args.style] || stylePrompts.professional}`;

        // Note: Gemini 2.0 has image generation capabilities
        // For now, return a prompt that can be used with Imagen API
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                status: 'prompt_ready',
                prompt: fullPrompt,
                message: 'Image generation prompt prepared. Use Google Imagen API or Cloud Console to generate.',
                suggestedFilename: args.outputPath || 'generated-image.png',
              }),
            },
          ],
        };
      }

      case 'generate_background': {
        const moodColors = {
          warm: 'warm orange and golden tones',
          cool: 'cool blues and soft grays',
          neutral: 'neutral beige and soft whites',
          vibrant: 'vibrant and saturated colors',
        };

        const backgroundPrompt = `Background for photo compositing: ${args.scene}.
          Style: ${moodColors[args.mood] || moodColors.warm}.
          Soft bokeh effect, slightly blurred, suitable for placing a person's headshot on top.
          Leave center-right area relatively clear for photo placement.
          No people in the image. Professional, editorial photography quality.
          Square format 1080x1080 pixels.`;

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                status: 'prompt_ready',
                prompt: backgroundPrompt,
                scene: args.scene,
                mood: args.mood || 'warm',
                message: 'Background generation prompt prepared.',
                suggestedFilename: args.outputPath || 'background.png',
              }),
            },
          ],
        };
      }

      case 'analyze_photo': {
        // Use gemma-3-27b-it as primary (reliable quota), fallback to gemini models
const model = genAI.getGenerativeModel({ model: 'gemma-3-27b-it' });

        // Read the image file
        const imagePath = args.imagePath;
        if (!fs.existsSync(imagePath)) {
          throw new Error(`Image not found: ${imagePath}`);
        }

        const imageData = fs.readFileSync(imagePath);
        const base64Image = imageData.toString('base64');
        const mimeType = imagePath.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';

        const result = await model.generateContent([
          {
            inlineData: {
              mimeType,
              data: base64Image,
            },
          },
          `Analyze this photo for use in LinkedIn content creation. Provide:
          1. Subject description (pose, attire, expression)
          2. Background description
          3. Lighting quality (warm/cool/neutral, soft/harsh)
          4. Suggested use cases (infographic, carousel, professional post, casual post)
          5. Mood/tone conveyed
          6. Recommended template style (light cream background or dark charcoal)

          Format as JSON.`,
        ]);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                status: 'analyzed',
                imagePath: args.imagePath,
                analysis: result.response.text(),
              }),
            },
          ],
        };
      }

      case 'suggest_photo': {
        // Use gemma-3-27b-it as primary (reliable quota), fallback to gemini models
const model = genAI.getGenerativeModel({ model: 'gemma-3-27b-it' });

        // List photos in directory
        const photosDir = args.photosDir;
        if (!fs.existsSync(photosDir)) {
          throw new Error(`Photos directory not found: ${photosDir}`);
        }

        const photoFiles = fs.readdirSync(photosDir, { recursive: true })
          .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
          .slice(0, 10); // Limit to 10 for analysis

        const photoAnalyses = [];

        for (const photo of photoFiles) {
          const fullPath = path.join(photosDir, photo);
          try {
            const imageData = fs.readFileSync(fullPath);
            const base64Image = imageData.toString('base64');
            const mimeType = photo.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';

            const result = await model.generateContent([
              {
                inlineData: {
                  mimeType,
                  data: base64Image,
                },
              },
              'Briefly describe this photo in 20 words: pose, attire, mood, background.',
            ]);

            photoAnalyses.push({
              file: photo,
              path: fullPath,
              description: result.response.text(),
            });
          } catch (e) {
            // Skip problematic files
          }
        }

        // Now select best match
        const selectionPrompt = `Given these photos and their descriptions:
        ${JSON.stringify(photoAnalyses, null, 2)}

        Select the BEST photo for:
        - Post topic: ${args.postTopic}
        - Creative type: ${args.creativeType}
        - Target audience: ${args.audience || 'both'}

        Selection criteria:
        - Infographic/carousel: Professional, approachable headshot
        - Career content: Formal, confident poses
        - Agency content: Relaxed, friendly poses

        Return JSON with: selectedFile, selectedPath, reason`;

        const selectionResult = await model.generateContent(selectionPrompt);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                status: 'selected',
                postTopic: args.postTopic,
                creativeType: args.creativeType,
                availablePhotos: photoAnalyses.length,
                selection: selectionResult.response.text(),
              }),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            status: 'error',
            error: error.message,
          }),
        },
      ],
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Nano Banana MCP server running');
}

main().catch(console.error);
