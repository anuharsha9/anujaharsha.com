import fs from 'fs';
import path from 'path';

function buildMap(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const map = new Map<string, string>();
  // Match <ImageTile src="..." alt="..." caption="..." />
  // Note: caption might have quotes, let's use a regex to grab src and caption
  const regex = /<ImageTile[^>]*src="([^"]+)"[^>]*caption="([^"]+)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    let src = match[1];
    let caption = match[2];
    map.set(src, caption);
  }
  // Try another order just in case caption comes before alt
  const regex2 = /<ImageTile[^>]*caption="([^"]+)"[^>]*src="([^"]+)"/g;
  while ((match = regex2.exec(content)) !== null) {
    let src = match[2];
    let caption = match[1];
    map.set(src, caption);
  }
  return map;
}

function updateDataFile(filePath: string, map: Map<string, string>) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  content = content.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, src) => {
    // Some urls are encoded, decode them for lookup
    let decodedSrc = decodeURIComponent(src);
    // Remove query params or hashes if any (though usually none here)
    if (map.has(decodedSrc)) {
      return `![${map.get(decodedSrc)}](${src})`;
    }
    if (map.has(src)) {
      return `![${map.get(src)}](${src})`;
    }
    // If not found, keep original
    return match;
  });
  
  fs.writeFileSync(filePath, content, 'utf-8');
}

const rcMap = buildMap(path.resolve('src/components/case-study-experiment/RCFullContent.tsx'));
const iqMap = buildMap(path.resolve('src/components/case-study-experiment/DSMLFullContent.tsx'));

updateDataFile(path.resolve('src/data/reportcaster.ts'), rcMap);
updateDataFile(path.resolve('src/data/iq-plugin.ts'), iqMap);

console.log('Updated captions for RC and IQ');
