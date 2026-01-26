const pptxgen = require('pptxgenjs');
const html2pptx = require('/Users/diegovences/.claude/plugins/cache/anthropic-agent-skills/document-skills/69c0b1a06741/skills/pptx/scripts/html2pptx.js');
const path = require('path');

async function createCarousel() {
    const pptx = new pptxgen();

    // Set square layout for LinkedIn carousel (1:1 aspect ratio)
    pptx.defineLayout({ name: 'SQUARE', width: 7.5, height: 7.5 });
    pptx.layout = 'SQUARE';

    pptx.author = 'Diego Vences';
    pptx.title = 'De Pilotos a Impacto - Why 95% of AI Pilots Fail';
    pptx.subject = 'LinkedIn Carousel';

    const slidesDir = path.join(__dirname, 'slides');

    // Create all 8 slides
    for (let i = 1; i <= 8; i++) {
        const htmlFile = path.join(slidesDir, `slide${i}.html`);
        console.log(`Processing slide ${i}...`);
        await html2pptx(htmlFile, pptx);
    }

    // Save the presentation
    const outputPath = path.join(__dirname, 'carousel.pptx');
    await pptx.writeFile({ fileName: outputPath });
    console.log(`Carousel created: ${outputPath}`);
}

createCarousel().catch(console.error);
