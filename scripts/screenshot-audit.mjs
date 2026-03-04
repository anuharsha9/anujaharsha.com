#!/usr/bin/env node
/**
 * Portfolio Screenshot & Audit Tool
 * ─────────────────────────────────
 * Takes full-page screenshots, runs accessibility checks,
 * and measures performance for all portfolio pages.
 *
 * Usage:
 *   node scripts/screenshot-audit.mjs                    # All pages
 *   node scripts/screenshot-audit.mjs --page /           # Single page
 *   node scripts/screenshot-audit.mjs --mobile           # Mobile viewport
 *   node scripts/screenshot-audit.mjs --lighthouse       # With Lighthouse
 */

import { chromium } from 'playwright';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const OUTPUT_DIR = join(process.cwd(), 'screenshots');

const PAGES = [
    { path: '/', name: 'landing' },
    { path: '/me', name: 'me' },
    { path: '/work/reportcaster', name: 'reportcaster' },
    { path: '/work/ml-functions', name: 'ml-functions' },
    { path: '/work/iq-plugin', name: 'iq-plugin' },
    { path: '/work/wordu', name: 'wordu' },
    { path: '/quiz', name: 'quiz' },
];

const VIEWPORTS = {
    desktop: { width: 1920, height: 1080 },
    tablet: { width: 768, height: 1024 },
    mobile: { width: 390, height: 844 },
};

// Parse args
const args = process.argv.slice(2);
const singlePage = args.includes('--page') ? args[args.indexOf('--page') + 1] : null;
const isMobile = args.includes('--mobile');
const doAudit = args.includes('--audit');
const viewportName = isMobile ? 'mobile' : 'desktop';
const viewport = VIEWPORTS[viewportName];

async function screenshotPage(page, pageDef, vp, vpName) {
    const url = `${BASE_URL}${pageDef.path}`;
    console.log(`\n📸 ${pageDef.name} (${vpName}: ${vp.width}x${vp.height})`);
    console.log(`   ${url}`);

    await page.setViewportSize(vp);
    const start = Date.now();
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for animations to settle
    await page.waitForTimeout(2000);

    const loadTime = Date.now() - start;
    console.log(`   ⏱  Load: ${loadTime}ms`);

    // Full page screenshot
    const filename = `${pageDef.name}_${vpName}.png`;
    await page.screenshot({
        path: join(OUTPUT_DIR, filename),
        fullPage: true,
    });
    console.log(`   ✅ ${filename}`);

    // Above-the-fold screenshot
    const foldFilename = `${pageDef.name}_${vpName}_fold.png`;
    await page.screenshot({
        path: join(OUTPUT_DIR, foldFilename),
        fullPage: false,
    });

    return { name: pageDef.name, vpName, loadTime, url };
}

async function auditPage(page, pageDef) {
    const url = `${BASE_URL}${pageDef.path}`;
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);

    const audit = await page.evaluate(() => {
        const results = {};

        // H1 count
        results.h1Count = document.querySelectorAll('h1').length;
        results.h1Text = Array.from(document.querySelectorAll('h1')).map(h => h.textContent?.trim().slice(0, 50));

        // Title
        results.title = document.title;

        // Meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        results.metaDescription = metaDesc ? metaDesc.content?.slice(0, 80) + '...' : 'MISSING';

        // OG tags
        results.ogTitle = document.querySelector('meta[property="og:title"]')?.content || 'MISSING';
        results.ogImage = document.querySelector('meta[property="og:image"]')?.content || 'MISSING';

        // Canonical
        results.canonical = document.querySelector('link[rel="canonical"]')?.href || 'MISSING';

        // Images without alt
        const imgs = document.querySelectorAll('img');
        results.totalImages = imgs.length;
        results.imagesWithoutAlt = Array.from(imgs).filter(i => !i.alt && !i.getAttribute('aria-hidden')).length;

        // Semantic elements
        results.hasMain = !!document.querySelector('main');
        results.hasNav = !!document.querySelector('nav');
        results.hasHeader = !!document.querySelector('header');
        results.hasFooter = !!document.querySelector('footer');

        // Buttons without accessible names
        const buttons = document.querySelectorAll('button');
        results.totalButtons = buttons.length;
        results.buttonsWithoutLabel = Array.from(buttons).filter(b =>
            !b.textContent?.trim() && !b.getAttribute('aria-label') && !b.getAttribute('aria-labelledby')
        ).length;

        // Links without href
        const links = document.querySelectorAll('a');
        results.totalLinks = links.length;
        results.linksWithoutHref = Array.from(links).filter(a => !a.href).length;

        // Color contrast check (rough — finds very low opacity text)
        const allText = document.querySelectorAll('*');
        let lowContrastCount = 0;
        allText.forEach(el => {
            const style = getComputedStyle(el);
            const color = style.color;
            const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]*)\)/);
            if (match && match[4] && parseFloat(match[4]) < 0.35 && el.textContent?.trim()) {
                lowContrastCount++;
            }
        });
        results.lowContrastElements = lowContrastCount;

        return results;
    });

    return { page: pageDef.name, ...audit };
}

async function main() {
    if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        deviceScaleFactor: 2, // Retina
        colorScheme: 'dark',
    });
    const page = await context.newPage();

    const pagesToProcess = singlePage
        ? PAGES.filter(p => p.path === singlePage)
        : PAGES;

    if (pagesToProcess.length === 0) {
        console.error(`Page not found: ${singlePage}`);
        process.exit(1);
    }

    // Screenshots
    console.log(`\n${'═'.repeat(50)}`);
    console.log(`  Portfolio Screenshot Tool`);
    console.log(`  Viewport: ${viewportName} (${viewport.width}x${viewport.height})`);
    console.log(`${'═'.repeat(50)}`);

    const results = [];
    for (const pageDef of pagesToProcess) {
        try {
            const r = await screenshotPage(page, pageDef, viewport, viewportName);
            results.push(r);

            if (isMobile) {
                // Also do tablet
                const r2 = await screenshotPage(page, pageDef, VIEWPORTS.tablet, 'tablet');
                results.push(r2);
            }
        } catch (err) {
            console.log(`   ❌ Error: ${err.message}`);
        }
    }

    // Audit
    if (doAudit) {
        console.log(`\n${'═'.repeat(50)}`);
        console.log(`  Accessibility & SEO Audit`);
        console.log(`${'═'.repeat(50)}`);

        const audits = [];
        for (const pageDef of pagesToProcess) {
            try {
                const a = await auditPage(page, pageDef);
                audits.push(a);
            } catch (err) {
                console.log(`   ❌ ${pageDef.name}: ${err.message}`);
            }
        }

        // Print audit results
        for (const a of audits) {
            console.log(`\n── ${a.page} ──`);
            console.log(`  Title: ${a.title}`);
            console.log(`  H1 count: ${a.h1Count} ${a.h1Count === 1 ? '✅' : '❌'}`);
            if (a.h1Text?.length) console.log(`    → ${a.h1Text.join(' | ')}`);
            console.log(`  Meta desc: ${a.metaDescription}`);
            console.log(`  OG title: ${a.ogTitle}`);
            console.log(`  Canonical: ${a.canonical}`);
            console.log(`  Images: ${a.totalImages} total, ${a.imagesWithoutAlt} missing alt ${a.imagesWithoutAlt === 0 ? '✅' : '⚠️'}`);
            console.log(`  Buttons: ${a.totalButtons} total, ${a.buttonsWithoutLabel} unlabeled ${a.buttonsWithoutLabel === 0 ? '✅' : '⚠️'}`);
            console.log(`  Semantic: main=${a.hasMain ? '✅' : '❌'} nav=${a.hasNav ? '✅' : '❌'} header=${a.hasHeader ? '✅' : '❌'} footer=${a.hasFooter ? '✅' : '❌'}`);
            console.log(`  Low contrast text: ${a.lowContrastElements} ${a.lowContrastElements === 0 ? '✅' : '⚠️'}`);
        }

        // Save audit JSON
        writeFileSync(join(OUTPUT_DIR, 'audit.json'), JSON.stringify(audits, null, 2));
        console.log(`\n📄 Audit saved to screenshots/audit.json`);
    }

    // Summary
    console.log(`\n${'═'.repeat(50)}`);
    console.log(`  Summary`);
    console.log(`${'═'.repeat(50)}`);
    for (const r of results) {
        console.log(`  ${r.name.padEnd(20)} ${r.vpName.padEnd(8)} ${r.loadTime}ms`);
    }
    console.log(`\n📁 Screenshots saved to: ${OUTPUT_DIR}/`);

    await browser.close();
}

main().catch(console.error);
