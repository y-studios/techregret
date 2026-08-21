import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const svg = readFileSync(new URL("./icon.svg", import.meta.url));
const png = async (size) => sharp(svg, { density: 512 }).resize(size, size).png().toBuffer();

writeFileSync(new URL("../app/icon.png", import.meta.url), await png(512));
writeFileSync(new URL("../app/apple-icon.png", import.meta.url), await png(180));
writeFileSync(new URL("../public/icon-512.png", import.meta.url), await png(512));

const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = [];
for (let i = 0; i < sizes.length; i++) {
  const e = Buffer.alloc(16);
  e.writeUInt8(sizes[i], 0);
  e.writeUInt8(sizes[i], 1);
  e.writeUInt8(0, 2);
  e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(images[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += images[i].length;
  entries.push(e);
}
writeFileSync(new URL("../app/favicon.ico", import.meta.url), Buffer.concat([header, ...entries, ...images]));

const ogp = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="t" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#00a37b"/><stop offset="1" stop-color="#00d09c"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#f8fafc"/>
  <circle cx="1010" cy="140" r="230" fill="#00d09c" fill-opacity="0.10"/>
  <circle cx="1120" cy="420" r="150" fill="#0f172a" fill-opacity="0.06"/>
  <g font-family="Hiragino Sans, Noto Sans JP, sans-serif">
    <text x="80" y="150" font-size="28" fill="#64748b" font-weight="700">技術乗り換え・移行理由DB</text>
    <text x="80" y="250" font-size="70" font-weight="900" fill="#0f172a">選んで失敗した</text>
    <text x="80" y="340" font-size="70" font-weight="900" fill="url(#t)">現場の生ログ集。</text>
    <text x="80" y="410" font-size="24" fill="#64748b">From → To の比較マトリクスと後悔ログを検索・投稿</text>
  </g>
  <g transform="translate(870,470)">
    <rect x="0" y="0" rx="10" width="150" height="44" fill="#fef2f2" stroke="#fecaca"/>
    <text x="75" y="29" text-anchor="middle" font-family="Hiragino Sans, Noto Sans JP, sans-serif" font-size="18" font-weight="800" fill="#e11d48">Vercel</text>
    <path d="M158 22 L188 22 M180 14 L190 22 L180 30" stroke="#94a3b8" stroke-width="3" fill="none"/>
    <rect x="196" y="0" rx="10" width="150" height="44" fill="#ecfdf5" stroke="#a7f3d0"/>
    <text x="271" y="29" text-anchor="middle" font-family="Hiragino Sans, Noto Sans JP, sans-serif" font-size="18" font-weight="800" fill="#00a37b">Cloudflare</text>
  </g>
</svg>`;
writeFileSync(new URL("../public/ogp.png", import.meta.url), await sharp(Buffer.from(ogp)).png().toBuffer());
console.log("icons + ogp generated");
