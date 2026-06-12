import puppeteer from 'puppeteer';

async function scrapeSite() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.goto('https://anniexue.me/', { waitUntil: 'networkidle0' });
  
  // Extract text
  const text = await page.evaluate(() => document.body.innerText);
  console.log('--- HOMEPAGE TEXT ---');
  console.log(text.substring(0, 1000) + '...');
  
  // Extract links
  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a'))
      .map(a => a.href)
      .filter(href => href.startsWith('https://anniexue.me/') && !href.includes('#'));
  });
  
  const uniqueLinks = [...new Set(links)];
  console.log('\\n--- LINKS ---');
  console.log(uniqueLinks);

  for (const link of uniqueLinks) {
    if (link === 'https://anniexue.me/') continue;
    console.log(`\\n--- SCRAPING ${link} ---`);
    try {
      await page.goto(link, { waitUntil: 'networkidle0' });
      const pageText = await page.evaluate(() => document.body.innerText);
      console.log(pageText.substring(0, 1000) + '...');
    } catch (e) {
      console.log('Failed to load', link);
    }
  }
  
  await browser.close();
}

scrapeSite().catch(console.error);
