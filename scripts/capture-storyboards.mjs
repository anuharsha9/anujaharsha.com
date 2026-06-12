import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.join(process.cwd(), 'public/images/case-study/storyboards');

const TARGETS = [
  { id: 'target-job-log-redesign', name: 'job-log-redesign.png', waitMs: 25000 },
  { id: 'target-beat-fragmentation', name: 'beat-fragmentation.png', waitMs: 15000 },
  { id: 'target-beat-breakthrough', name: 'beat-breakthrough.png', waitMs: 8000 },
  { id: 'target-beat-scheduler', name: 'beat-scheduler.png', waitMs: 8000 },
  { id: 'target-beat-recurrence', name: 'beat-recurrence.png', waitMs: 8000 }
];

async function run() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: { width: 1280, height: 800, deviceScaleFactor: 2 } // high res
  });

  const page = await browser.newPage();
  
  console.log('Navigating to http://localhost:3000/screenshot...');
  await page.goto('http://localhost:3000/screenshot', { waitUntil: 'networkidle2' });

  for (const target of TARGETS) {
    console.log(`\n--- Processing ${target.name} ---`);
    const element = await page.$(`#${target.id}`);
    
    if (!element) {
      console.error(`Element #${target.id} not found!`);
      continue;
    }

    console.log(`Scrolling ${target.name} into view to trigger animations...`);
    // Scroll element into center of viewport to trigger intersection observer
    await page.evaluate((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'center' });
      }
    }, target.id);

    console.log(`Waiting ${target.waitMs / 1000} seconds for animations to finish...`);
    await new Promise(r => setTimeout(r, target.waitMs));

    const outPath = path.join(OUT_DIR, target.name);
    console.log(`Taking screenshot: ${outPath}`);
    
    await element.screenshot({ path: outPath });
    console.log(`Saved ${target.name}!`);
  }

  await browser.close();
  console.log('\nAll done!');
}

run().catch(console.error);
