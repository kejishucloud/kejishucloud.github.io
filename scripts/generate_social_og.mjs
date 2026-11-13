/**
 * KeJiShuCloud / Open Graph
 * Reproducible, screenshot-free social asset assembled from the same original
 * orbital vector used in the site hero. No third-party stock assets.
 */
import sharp from 'sharp';
import { resolve } from 'node:path';

const root=resolve(import.meta.dirname,'..');
const destination=resolve(root,'public/media/og.png');
const width=1200,height=630;
const xml=String.raw`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs>
<pattern id="grid" width="70" height="70" patternUnits="userSpaceOnUse"><path d="M70 0H0V70" fill="none" stroke="#6b80b2" stroke-opacity=".13" stroke-width="1"/></pattern>
</defs>
<rect width="1200" height="630" fill="#080d19"/>
<rect width="1200" height="630" fill="url(#grid)"/>
<rect x="72" y="67" width="12" height="12" fill="none" stroke="#a6a9ff" stroke-width="2" transform="rotate(45 78 73)"/>
<text x="102" y="78" fill="#afbde0" font-size="21" font-family="Arial,sans-serif" font-weight="700" letter-spacing="4">KEJISHUCLOUD / RESEARCH STUDIO</text>
<path d="M70 112H1130" stroke="#556486" stroke-opacity=".75"/>
<text x="71" y="275" fill="#f6f8ff" font-size="77" font-family="Arial,sans-serif" font-weight="800" letter-spacing="-4">INTELLIGENCE,</text>
<text x="71" y="372" fill="#b9b5ff" font-size="85" font-family="Arial,sans-serif" font-weight="800" letter-spacing="-5">ENGINEERED.</text>
<path d="M70 448H475" stroke="#899bd6" stroke-opacity=".6"/>
<text x="71" y="495" fill="#bac4df" font-size="18" font-family="Arial,sans-serif" letter-spacing="3">AI RESEARCH / AGENTS</text>
<text x="71" y="527" fill="#bac4df" font-size="18" font-family="Arial,sans-serif" letter-spacing="3">SOFTWARE ENGINEERING / WORK</text>
<path d="M70 568H1130" stroke="#556486" stroke-opacity=".75"/>
<text x="71" y="598" fill="#8293b5" font-family="Arial,sans-serif" font-size="16" letter-spacing="3">RESEARCH  /  BUILD  /  VERIFY</text>
<text x="1130" y="598" text-anchor="end" fill="#8293b5" font-family="Arial,sans-serif" font-size="16" letter-spacing="3">KEJISHUCLOUD.GITHUB.IO</text>
</svg>`;
const visual=await sharp(resolve(root,'public/media/signal-core.svg'))
 .resize({width:680})
 .png({compressionLevel:9})
 .toBuffer();

await sharp(Buffer.from(xml)).composite([
 {input:visual,left:515,top:9,blend:'screen'}
]).png({compressionLevel:9}).toFile(destination);
console.log('Generated social preview: '+destination);
