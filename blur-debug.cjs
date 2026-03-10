const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(4000);
  
  // Scroll to CSG block
  await page.evaluate(() => window.scrollTo(0, 1800));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/wave-1-before.png' });
  
  // Click RC link (trailing slash)
  const link = await page.$('a[href="/work/reportcaster/"]');
  if (!link) { console.log('Still no link'); await browser.close(); return; }
  
  // Capture frames during transition
  const captureLoop = async () => {
    for (let i = 0; i < 14; i++) {
      await page.waitForTimeout(100);
      await page.screenshot({ path: `/tmp/wave-t${String(i).padStart(2,'0')}.png` });
    }
  };
  
  await Promise.all([link.click(), captureLoop()]);
  
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/tmp/wave-final.png' });
  
  console.log('Done — check /tmp/wave-t*.png');
  await browser.close();
})();
