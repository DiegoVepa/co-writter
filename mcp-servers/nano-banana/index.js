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
import { GoogleGenAI } from '@google/genai';
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

const ai = new GoogleGenAI({ apiKey });

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
      {
        name: 'generate_infographic',
        description: 'Generate a hand-drawn style infographic for LinkedIn posts. Creates a whiteboard/notebook style image with handwritten text and doodles using only black and orange (#E8611A) markers.',
        inputSchema: {
          type: 'object',
          properties: {
            topic: {
              type: 'string',
              description: 'Main topic/title of the infographic',
            },
            sections: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  heading: { type: 'string', description: 'Section heading' },
                  bullets: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Bullet points for this section',
                  },
                  icon: { type: 'string', description: 'Icon suggestion (e.g., lightbulb, clipboard, gear)' },
                },
              },
              description: 'Array of 3-5 sections, each with heading, bullets, and icon suggestion',
            },
            keyTakeaway: {
              type: 'string',
              description: 'Key takeaway to highlight at the bottom',
            },
            outputPath: {
              type: 'string',
              description: 'Path to save the generated infographic',
            },
          },
          required: ['topic', 'sections', 'keyTakeaway'],
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
        const stylePrompts = {
          professional: 'Professional, clean, corporate style. High quality.',
          casual: 'Casual, approachable, friendly style.',
          artistic: 'Artistic, creative, visually striking.',
          photorealistic: 'Photorealistic, like a real photograph.',
        };

        const fullPrompt = `${args.prompt}. ${stylePrompts[args.style] || stylePrompts.professional}`;

        try {
          // Use Gemini 2.0 Flash for image generation
          const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp-image-generation',
            contents: fullPrompt,
            config: {
              responseModalities: ['image', 'text'],
            },
          });

          // Extract image from response
          const parts = response.candidates?.[0]?.content?.parts || [];
          for (const part of parts) {
            if (part.inlineData) {
              const imageBytes = part.inlineData.data;
              const mimeType = part.inlineData.mimeType || 'image/png';
              const ext = mimeType.includes('jpeg') ? 'jpg' : 'png';
              const outputPath = args.outputPath || path.join(process.cwd(), `generated-${Date.now()}.${ext}`);

              const buffer = Buffer.from(imageBytes, 'base64');
              fs.writeFileSync(outputPath, buffer);

              return {
                content: [
                  {
                    type: 'text',
                    text: JSON.stringify({
                      status: 'image_generated',
                      imagePath: outputPath,
                      prompt: fullPrompt,
                    }),
                  },
                ],
              };
            }
          }

          // Fallback: return prompt if no image was generated
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  status: 'prompt_ready',
                  prompt: fullPrompt,
                  message: 'Model did not return an image. Use this prompt with Imagen API.',
                  suggestedFilename: args.outputPath || 'generated-image.png',
                }),
              },
            ],
          };
        } catch (genError) {
          // Fallback to prompt-only mode
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  status: 'prompt_ready',
                  prompt: fullPrompt,
                  message: `Image generation failed (${genError.message}). Use this prompt with Imagen API.`,
                  suggestedFilename: args.outputPath || 'generated-image.png',
                }),
              },
            ],
          };
        }
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

        try {
          // Use Gemini 2.0 Flash for image generation
          const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp-image-generation',
            contents: backgroundPrompt,
            config: {
              responseModalities: ['image', 'text'],
            },
          });

          // Extract image from response
          const parts = response.candidates?.[0]?.content?.parts || [];
          for (const part of parts) {
            if (part.inlineData) {
              const imageBytes = part.inlineData.data;
              const mimeType = part.inlineData.mimeType || 'image/png';
              const ext = mimeType.includes('jpeg') ? 'jpg' : 'png';
              const outputPath = args.outputPath || path.join(process.cwd(), `background-${Date.now()}.${ext}`);

              const buffer = Buffer.from(imageBytes, 'base64');
              fs.writeFileSync(outputPath, buffer);

              return {
                content: [
                  {
                    type: 'text',
                    text: JSON.stringify({
                      status: 'image_generated',
                      imagePath: outputPath,
                      scene: args.scene,
                      mood: args.mood || 'warm',
                    }),
                  },
                ],
              };
            }
          }

          // Fallback: return prompt if no image was generated
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  status: 'prompt_ready',
                  prompt: backgroundPrompt,
                  scene: args.scene,
                  mood: args.mood || 'warm',
                  message: 'Model did not return an image. Use this prompt with Imagen API.',
                  suggestedFilename: args.outputPath || 'background.png',
                }),
              },
            ],
          };
        } catch (genError) {
          // Fallback to prompt-only mode
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  status: 'prompt_ready',
                  prompt: backgroundPrompt,
                  scene: args.scene,
                  mood: args.mood || 'warm',
                  message: `Image generation failed (${genError.message}). Use this prompt with Imagen API.`,
                  suggestedFilename: args.outputPath || 'background.png',
                }),
              },
            ],
          };
        }
      }

      case 'analyze_photo': {
        // Read the image file
        const imagePath = args.imagePath;
        if (!fs.existsSync(imagePath)) {
          throw new Error(`Image not found: ${imagePath}`);
        }

        const imageData = fs.readFileSync(imagePath);
        const base64Image = imageData.toString('base64');
        const mimeType = imagePath.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';

        const result = await ai.models.generateContent({
          model: 'gemini-2.0-flash',
          contents: [
            {
              parts: [
                {
                  inlineData: {
                    mimeType,
                    data: base64Image,
                  },
                },
                {
                  text: `Analyze this photo for use in LinkedIn content creation. Provide:
          1. Subject description (pose, attire, expression)
          2. Background description
          3. Lighting quality (warm/cool/neutral, soft/harsh)
          4. Suggested use cases (infographic, carousel, professional post, casual post)
          5. Mood/tone conveyed
          6. Recommended template style (light cream background or dark charcoal)

          Format as JSON.`,
                },
              ],
            },
          ],
        });

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                status: 'analyzed',
                imagePath: args.imagePath,
                analysis: result.candidates?.[0]?.content?.parts?.[0]?.text || 'No analysis returned',
              }),
            },
          ],
        };
      }

      case 'suggest_photo': {
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

            const result = await ai.models.generateContent({
              model: 'gemini-2.0-flash',
              contents: [
                {
                  parts: [
                    {
                      inlineData: {
                        mimeType,
                        data: base64Image,
                      },
                    },
                    {
                      text: 'Briefly describe this photo in 20 words: pose, attire, mood, background.',
                    },
                  ],
                },
              ],
            });

            photoAnalyses.push({
              file: photo,
              path: fullPath,
              description: result.candidates?.[0]?.content?.parts?.[0]?.text || 'No description',
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

        const selectionResult = await ai.models.generateContent({
          model: 'gemini-2.0-flash',
          contents: selectionPrompt,
        });

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                status: 'selected',
                postTopic: args.postTopic,
                creativeType: args.creativeType,
                availablePhotos: photoAnalyses.length,
                selection: selectionResult.candidates?.[0]?.content?.parts?.[0]?.text || 'No selection',
              }),
            },
          ],
        };
      }

      case 'generate_infographic': {
        // Build sections text
        const sectionsText = args.sections.map((s, i) => {
          const bulletList = s.bullets.map(b => `   • ${b}`).join('\n');
          return `Section ${i + 1} - ${s.heading.toUpperCase()} (orange heading):
${bulletList}
[${s.icon || 'icon'} doodle]`;
        }).join('\n\n');

        const infographicPrompt = `You are a visual infographic designer.
Generate a single hand-drawn infographic image.

TOPIC:
${args.topic}

CONTENT TO VISUALIZE:
${sectionsText}

KEY TAKEAWAY:
${args.keyTakeaway}

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
- Title at the top in big bold marker lettering with orange underline.
- ${args.sections.length} clear sections with hand-drawn separators/arrows.
- Each section should have:
   • a mini-heading (orange marker or black with orange underline)
   • 2–4 bullet points (black marker)
   • one simple hand-drawn icon/doodle
- Use hand-drawn boxes, arrows, separators, and highlights to guide the eye.
- Include a key takeaway boxed or circled near the bottom.

VISUAL CLARITY RULES:
- Make text large and legible (this will be viewed on mobile phones).
- Do not overcrowd the page — generous whitespace between sections.
- Highlight only the most important words (2-3 per section maximum).

BOTTOM CTA:
Add handwritten text at the bottom:
"Follow @DiegoVences for more AI + Sales content"

IMAGE FORMAT:
- 1080 x 1350 pixels, portrait orientation.
- Bright natural lighting with slight realistic shadows.
- Background should be whiteboard or premium paper texture.
- The final image should look like a real photograph taken of a
  physical whiteboard/notebook — not a digital design.`;

        try {
          // Use Gemini 2.0 Flash for image generation
          const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp-image-generation',
            contents: infographicPrompt,
            config: {
              responseModalities: ['image', 'text'],
            },
          });

          // Extract image from response
          const parts = response.candidates?.[0]?.content?.parts || [];
          for (const part of parts) {
            if (part.inlineData) {
              const imageBytes = part.inlineData.data;
              const mimeType = part.inlineData.mimeType || 'image/png';
              const ext = mimeType.includes('jpeg') ? 'jpg' : 'png';
              const outputPath = args.outputPath || path.join(process.cwd(), `infographic-${Date.now()}.${ext}`);

              const buffer = Buffer.from(imageBytes, 'base64');
              fs.writeFileSync(outputPath, buffer);

              return {
                content: [
                  {
                    type: 'text',
                    text: JSON.stringify({
                      status: 'image_generated',
                      imagePath: outputPath,
                      topic: args.topic,
                      sections: args.sections.length,
                    }),
                  },
                ],
              };
            }
          }

          // Fallback: return prompt if no image was generated
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  status: 'prompt_ready',
                  prompt: infographicPrompt,
                  topic: args.topic,
                  message: 'Model did not return an image. Use this prompt with Imagen API.',
                  suggestedFilename: args.outputPath || 'infographic.png',
                }),
              },
            ],
          };
        } catch (genError) {
          // Fallback to prompt-only mode
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  status: 'prompt_ready',
                  prompt: infographicPrompt,
                  topic: args.topic,
                  message: `Image generation failed (${genError.message}). Use this prompt with Imagen API.`,
                  suggestedFilename: args.outputPath || 'infographic.png',
                }),
              },
            ],
          };
        }
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
