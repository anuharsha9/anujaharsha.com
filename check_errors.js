const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text());
    }
  });

  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.message);
  });

  console.log('Navigating...');
  await page.goto('http://localhost:3002/work/reportcaster');
  
  console.log('Waiting for network idle...');
  await page.waitForNetworkIdle({ timeout: 5000 }).catch(() => {});
  
  const html = await page.evaluate(() => document.body.innerHTML);
  console.log('Main content length:', html.length);
  
  await browser.close();
})();
