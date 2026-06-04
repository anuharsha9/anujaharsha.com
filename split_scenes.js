const fs = require('fs');
const content = fs.readFileSync('src/app/manifesto/page.tsx', 'utf8');

// We will just read the file to find where each scene starts and ends, then dump them.
// Actually, it's easier to just do it manually if we can't parse it well. Let's just create the files.
