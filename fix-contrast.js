const fs = require('fs');

const path = './src/components/case-study/storyboard/RCMovieBeats.tsx';
let content = fs.readFileSync(path, 'utf8');

// Colors
content = content.replace(/text-zinc-600/g, 'text-zinc-400');
content = content.replace(/text-zinc-500/g, 'text-zinc-300');
content = content.replace(/text-rose-400\/50/g, 'text-rose-300/90');
content = content.replace(/border-rose-500\/20/g, 'border-rose-400/40');
content = content.replace(/bg-rose-500\/10/g, 'bg-rose-500/20');
content = content.replace(/text-emerald-400\/50/g, 'text-emerald-400/90');
content = content.replace(/zinc-600/g, 'zinc-400'); // catch any loose variables or icons


// Font sizes (bump up readability)
content = content.replace(/text-\[9px\]/g, 'text-[11px]');
content = content.replace(/text-\[10px\]/g, 'text-xs');

fs.writeFileSync(path, content, 'utf8');
console.log('RCMovieBeats.tsx updated for better contrast and legibility');

const path2 = './src/components/case-study/storyboard/AutoPlayStory.tsx';
let content2 = fs.readFileSync(path2, 'utf8');
content2 = content2.replace(/text-\[9px\]/g, 'text-[11px]');
content2 = content2.replace(/text-teal-400\/60/g, 'text-teal-300/90');
fs.writeFileSync(path2, content2, 'utf8');
console.log('AutoPlayStory.tsx updated for better contrast and legibility');

