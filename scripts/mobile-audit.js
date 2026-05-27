const { chromium, devices } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ...devices['iPhone 13'],
    // Ensure viewport-fit=cover behavior and safe area insets are simulated if possible
    // Playwright doesn't perfectly simulate the notch out of the box, but we can set padding
  });
  
  const page = await context.newPage();
  const url = 'http://localhost:3000';
  
  try {
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle' });
    
    const outputDir = '/Users/anu/.gemini/antigravity/brain/c268b2ee-9218-47f0-acde-07d122b8992a/';
    
    // 1. Home Page Screenshot
    await page.screenshot({ path: outputDir + 'mobile_home.png', fullPage: true });
    console.log('Saved mobile_home.png');

    // 2. Click "Let's Build" to trigger scroll to case studies
    // Let's just navigate to a case study directly to save time and capture it
    const csUrl = 'http://localhost:3000/work/reportcaster';
    console.log(`Navigating to ${csUrl}...`);
    await page.goto(csUrl, { waitUntil: 'networkidle' });
    
    // Take multiple screenshots down the page or a full page screenshot
    // For ScrollDeck, fullPage screenshot might look weird because of sticky/fixed elements
    // Let's scroll manually and take screenshots
    
    await page.screenshot({ path: outputDir + 'mobile_cs_hero.png' });
    console.log('Saved mobile_cs_hero.png');

    // Scroll down 1 viewport
    await page.mouse.wheel(0, 800);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: outputDir + 'mobile_cs_scroll1.png' });
    console.log('Saved mobile_cs_scroll1.png');

    // Scroll down 2 viewports
    await page.mouse.wheel(0, 800);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: outputDir + 'mobile_cs_scroll2.png' });
    console.log('Saved mobile_cs_scroll2.png');

  } catch (error) {
    console.error("Error during scraping:", error);
  } finally {
    await browser.close();
  }
})();
