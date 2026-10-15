// Imports the 2025 summit photo library from the WordPress export into the frontend.
// Usage: npm run import:gallery-2025
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const frontendDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const exportDir = path.resolve(frontendDir, '..', 'wordpress-export');
const contentDir = path.join(exportDir, 'content');
const mediaDir = path.join(exportDir, 'media', '2025', '12');
const outImageDir = path.join(frontendDir, 'public', 'images-2025', 'gallery');
const outDataFile = path.join(frontendDir, 'src', 'data', 'gallery2025.json');
const publicPrefix = '/images-2025/gallery/';

const EVENT_PHOTO = /wp-1763\d+\.jpg$/;

const GALLERIES = [
  { heading: '2025 Photo Library', category: 'conference', fallbackAlt: 'International Commodity Summit 2025 Conference' },
  { heading: '2025 VIP Gala Photo Library', category: 'gala', fallbackAlt: 'International Commodity Summit 2025 VIP Gala' },
];
const MOMENTS = { category: 'moments', fallbackAlt: 'International Commodity Summit 2025' };

const xml = fs
  .readdirSync(contentDir)
  .filter((f) => f.endsWith('.xml'))
  .sort()
  .map((f) => fs.readFileSync(path.join(contentDir, f), 'utf8'))
  .join('\n');
const items = xml.split('<item>').slice(1);

const tag = (item, name) => {
  const m = item.match(new RegExp(`<${name}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${name}>`));
  return m ? m[1].trim() : '';
};

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

const cleanAlt = (alt) => decode(alt.split(/\n\s*\n/)[0]).replace(/\s+/g, ' ').trim();

const page = items.find((it) => tag(it, 'wp:post_type') === 'page' && tag(it, 'title') === '2025');
if (!page) throw new Error('Could not find the "2025" page in the WordPress export.');

const galleryImages = (heading) => {
  const start = page.indexOf(`>${heading}</h3>`);
  if (start === -1) throw new Error(`Could not find the "${heading}" gallery on the 2025 page.`);
  const open = page.indexOf('<!-- wp:gallery', start);
  const close = page.indexOf('<!-- /wp:gallery -->', open);
  const block = page.slice(open, close);
  return [...block.matchAll(/<img src="[^"]*\/([^/"?]+?)(?:\?[^"]*)?" alt="([^"]*)"/g)].map((m) => ({
    file: m[1],
    alt: cleanAlt(m[2]),
  }));
};

const attachments = items
  .filter((it) => tag(it, 'wp:post_type') === 'attachment')
  .map((it) => ({
    id: Number(tag(it, 'wp:post_id')),
    file: tag(it, 'wp:attachment_url').split('/').pop(),
    url: tag(it, 'wp:attachment_url'),
  }))
  .filter((a) => a.url.includes('/uploads/2025/12/') && EVENT_PHOTO.test(a.file))
  .sort((a, b) => a.id - b.id);

const ordered = [];
for (const g of GALLERIES) {
  for (const img of galleryImages(g.heading)) {
    ordered.push({ file: img.file, category: g.category, alt: img.alt || g.fallbackAlt });
  }
}
const placed = new Set(ordered.map((p) => p.file));
for (const a of attachments) {
  if (!placed.has(a.file)) ordered.push({ file: a.file, category: MOMENTS.category, alt: MOMENTS.fallbackAlt });
}

function jpegInfo(buf) {
  let width = 0;
  let height = 0;
  let orientation = 1;
  let i = 2;
  while (i + 4 < buf.length) {
    if (buf[i] !== 0xff) {
      i++;
      continue;
    }
    const marker = buf[i + 1];
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7) || marker === 0xff) {
      i += marker === 0xff ? 1 : 2;
      continue;
    }
    const len = buf.readUInt16BE(i + 2);
    if (marker === 0xe1 && buf.toString('ascii', i + 4, i + 8) === 'Exif') {
      const tiff = i + 10;
      const le = buf.toString('ascii', tiff, tiff + 2) === 'II';
      const u16 = (o) => (le ? buf.readUInt16LE(o) : buf.readUInt16BE(o));
      const u32 = (o) => (le ? buf.readUInt32LE(o) : buf.readUInt32BE(o));
      const ifd = tiff + u32(tiff + 4);
      for (let e = 0; e < u16(ifd); e++) {
        const entry = ifd + 2 + e * 12;
        if (u16(entry) === 0x0112) orientation = u16(entry + 8);
      }
    }
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      height = buf.readUInt16BE(i + 5);
      width = buf.readUInt16BE(i + 7);
      break;
    }
    i += 2 + len;
  }
  return orientation >= 5 ? { width: height, height: width } : { width, height };
}

fs.mkdirSync(outImageDir, { recursive: true });
fs.mkdirSync(path.dirname(outDataFile), { recursive: true });

const seenHashes = new Map();
const photos = [];
const duplicates = [];
for (const p of ordered) {
  const source = path.join(mediaDir, p.file);
  if (!fs.existsSync(source)) {
    console.warn(`Missing in media export, skipped: ${p.file}`);
    continue;
  }
  const buf = fs.readFileSync(source);
  const hash = crypto.createHash('sha1').update(buf).digest('hex');
  if (seenHashes.has(hash)) {
    duplicates.push(`${p.file} (same as ${seenHashes.get(hash)})`);
    continue;
  }
  seenHashes.set(hash, p.file);
  fs.copyFileSync(source, path.join(outImageDir, p.file));
  photos.push({ src: publicPrefix + p.file, ...jpegInfo(buf), category: p.category, alt: p.alt });
}

const keep = new Set(photos.map((p) => path.basename(p.src)));
for (const f of fs.readdirSync(outImageDir)) {
  if (!keep.has(f)) fs.rmSync(path.join(outImageDir, f));
}

fs.writeFileSync(outDataFile, JSON.stringify(photos, null, 2) + '\n');

const counts = photos.reduce((acc, p) => ({ ...acc, [p.category]: (acc[p.category] || 0) + 1 }), {});
console.log(`Imported ${photos.length} photos into ${path.relative(frontendDir, outImageDir)}`);
console.log('By category:', counts);
if (duplicates.length) console.log(`Skipped ${duplicates.length} duplicate file(s):\n  ${duplicates.join('\n  ')}`);
