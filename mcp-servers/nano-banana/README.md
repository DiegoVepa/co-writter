# Nano Banana MCP Server

AI-powered image generation and photo analysis for LinkedIn content creation.

## Features

### Tools Available

1. **generate_image** - Generate images from text prompts
2. **generate_background** - Create backgrounds for photo compositing
3. **analyze_photo** - Analyze photos for style, lighting, mood
4. **suggest_photo** - AI-powered photo selection based on post content

## Setup

1. **API Key**: Add your Google API key to `/.env`:
   ```
   GOOGLE_API_KEY=your_key_here
   ```

2. **Install dependencies**:
   ```bash
   cd mcp-servers/nano-banana
   npm install
   ```

3. **MCP Configuration**: The `.mcp.json` in repo root configures this server.

## Usage Examples

### Analyze a Photo
```
Tool: analyze_photo
Input: { "imagePath": "/path/to/photo.jpg" }
Output: JSON with pose, lighting, mood, suggested uses
```

### Suggest Best Photo for Post
```
Tool: suggest_photo
Input: {
  "photosDir": "/path/to/photos",
  "postTopic": "Product thinking applied to sales",
  "creativeType": "infographic",
  "audience": "career_pivot"
}
Output: Best matching photo with reasoning
```

### Generate Background
```
Tool: generate_background
Input: {
  "scene": "city skyline at golden hour",
  "mood": "warm"
}
Output: Prompt ready for Google Imagen
```

## Integration with Visual Workflow

This MCP integrates with the visual creation workflow in `/skills/visuals/linkedin-visuals.md`:

1. When user selects "Generate via Nano Banana" for photos
2. Agent calls `suggest_photo` or `generate_background`
3. Results are integrated into infographic/carousel HTML

## Supported Models

- **Gemini 2.0 Flash** - Photo analysis, text generation
- **Google Imagen** - Image generation (via prompt output)

---

**Note**: Image generation currently outputs prompts. Direct generation requires Imagen API access.
