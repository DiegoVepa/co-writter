const pptxgen = require('pptxgenjs');
const path = require('path');
const html2pptx = require('/Users/diegovences/.claude/plugins/cache/anthropic-agent-skills/document-skills/69c0b1a06741/skills/pptx/scripts/html2pptx');

async function build() {
  const pptx = new pptxgen();

  // Custom 1:1 layout for LinkedIn carousel (7.5 x 7.5 inches = 540pt x 540pt)
  pptx.defineLayout({ name: 'SQUARE', width: 7.5, height: 7.5 });
  pptx.layout = 'SQUARE';
  pptx.author = 'Diego Vences';
  pptx.title = 'SMB Decision Speed';

  const slideDir = path.join(__dirname, 'slides');

  for (let i = 1; i <= 8; i++) {
    const htmlFile = path.join(slideDir, `slide${i}.html`);
    await html2pptx(htmlFile, pptx);
    console.log(`Slide ${i} done`);
  }

  const outFile = path.join(__dirname, 'smb-decision-speed-carousel.pptx');
  await pptx.writeFile({ fileName: outFile });
  console.log(`Saved: ${outFile}`);
}

build().catch(e => { console.error(e); process.exit(1); });
