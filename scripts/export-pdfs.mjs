import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function exportPDFs() {
  console.log('Starting PDF Export...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set viewport for a standard desktop
  await page.setViewport({ width: 1440, height: 900 });

  const routes = [
    { url: 'http://localhost:3000/export/rc', filename: 'reportcaster-case-study.pdf' },
    { url: 'http://localhost:3000/export/ml', filename: 'ml-functions-case-study.pdf' },
    { url: 'http://localhost:3000/export/iq', filename: 'iq-plugin-case-study.pdf' }
  ];

  const outDir = path.join(__dirname, '../public/assets');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const route of routes) {
    console.log(`Navigating to ${route.url}...`);
    await page.goto(route.url, { waitUntil: 'networkidle2', timeout: 0 });
    
    // Optional: wait a bit for any slow loading fonts/images
    await new Promise(resolve => setTimeout(resolve, 2000));

    const outPath = path.join(outDir, route.filename);
    console.log(`Exporting ${route.filename}...`);
    await page.pdf({
      path: outPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        bottom: '20px',
        left: '20px',
        right: '20px'
      }
    });
    console.log(`Saved: ${outPath}`);
  }

  await browser.close();
  console.log('PDF Export Complete!');
}

exportPDFs().catch(console.error);
