import fs from 'fs';
import path from 'path';
import { reportcasterCaseStudy } from '../src/data/reportcaster.ts';
import { mlFunctionsCaseStudy } from '../src/data/ml-functions.ts';
import { iqPluginCaseStudy } from '../src/data/iq-plugin.ts';
import { CaseStudyData } from '../src/types/caseStudy.ts';

const outDir = path.join(process.cwd(), 'public/assets');

function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function generateHTML(data: CaseStudyData, accentColor: string): string {
  const relativeImage = (src: string | undefined) => {
    if (!src) return '';
    return src.startsWith('/images/') ? '../images/' + src.substring(8) : src;
  };

  // 2. DETAILED SECTIONS
  let sectionsHtml = '';
  for (const sec of data.sections) {
    let bodyHtml = sec.body.split('\n\n').map((p: string) => {
      let content = p.trim();
      
      // Handle blockquotes
      const quoteMatch = content.match(/^>\s*(.*)$/);
      if (quoteMatch) {
        return `<blockquote style="font-size: 1.35rem; font-style: italic; border-left: 4px solid var(--accent); padding-left: 20px; margin: 32px 0; color: var(--text-muted); line-height: 1.5;">${escapeHtml(quoteMatch[1])}</blockquote>`;
      }
      
      // Handle images globally within the text block
      content = content.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, src) => {
        const caption = alt ? `<figcaption style="text-align: center; color: var(--text-muted); font-size: 0.9rem; margin-top: 8px; font-style: italic;">${escapeHtml(alt)}</figcaption>` : '';
        return `</p><figure class="story-image"><img src="${relativeImage(src)}" alt="${escapeHtml(alt)}" />${caption}</figure><p>`;
      });
      
      // Handle bold
      content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Clean up empty paragraphs created by image injection
      let html = '<p>' + content + '</p>';
      html = html.replace(/<p><\/p>/g, '');
      html = html.replace(/<p>\s*<\/p>/g, '');
      
      return html;
    }).join('');

    let subsectionsHtml = '';
    
    if (sec.v1Data && sec.v1Data.images) {
      let bodyHtml1 = escapeHtml(sec.v1Data.body || '');
      bodyHtml1 = bodyHtml1.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      subsectionsHtml += '<div class="subsection page-break-inside-avoid"><h3>' + escapeHtml(sec.v1Data.title) + '</h3><p>' + bodyHtml1.replace(/\n\n/g, '</p><p>') + '</p><div class="image-grid">' + sec.v1Data.images.map((img: any) => '<img src="' + relativeImage(img.src) + '" alt="' + escapeHtml(img.alt || '') + '" />').join('') + '</div></div>';
    }
    
    if (sec.v2Data && sec.v2Data.images) {
      let bodyHtml2 = escapeHtml(sec.v2Data.body || '');
      bodyHtml2 = bodyHtml2.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      subsectionsHtml += '<div class="subsection page-break-inside-avoid"><h3>' + escapeHtml(sec.v2Data.title) + '</h3><p>' + bodyHtml2.replace(/\n\n/g, '</p><p>') + '</p><div class="image-grid">' + sec.v2Data.images.map((img: any) => '<img src="' + relativeImage(img.src) + '" alt="' + escapeHtml(img.alt || '') + '" />').join('') + '</div></div>';
    }

    if (sec.v3Data) {
      subsectionsHtml += '<div class="subsection page-break-inside-avoid"><h3>' + escapeHtml(sec.v3Data.title) + '</h3>';
      
      // Parse markdown bold in the body text
      let bodyHtml = escapeHtml(sec.v3Data.body || '');
      bodyHtml = bodyHtml.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      subsectionsHtml += '<p>' + bodyHtml.replace(/\n\n/g, '</p><p>') + '</p></div>';

      if (sec.v3Data.subsections) {
        for (const sub of sec.v3Data.subsections) {
          let imagesHtml = '';
        if (sub.images) {
          imagesHtml = '<div class="image-grid">' + sub.images.map((img: any) => '<img src="' + relativeImage(img.src) + '" alt="' + escapeHtml(img.alt || '') + '" />').join('') + '</div>';
        }
        subsectionsHtml += '<div class="subsection page-break-inside-avoid"><h3>' + escapeHtml(sub.title) + '</h3><p>' + escapeHtml(sub.description) + '</p>' + imagesHtml + '</div>';
      }
    }
  }

    let beforeAfterHtml = '';
    if (sec.beforeAfter) {
      beforeAfterHtml = `
        <div class="before-after page-break-inside-avoid">
          <div class="half">
            <h4>${escapeHtml(sec.beforeAfter.beforeLabel || 'Before')}</h4>
            <img src="${relativeImage(sec.beforeAfter.before.src)}" alt="${escapeHtml(sec.beforeAfter.before.alt || '')}" />
          </div>
          <div class="half">
            <h4>${escapeHtml(sec.beforeAfter.afterLabel || 'After')}</h4>
            <img src="${relativeImage(sec.beforeAfter.after.src)}" alt="${escapeHtml(sec.beforeAfter.after.alt || '')}" />
          </div>
        </div>
      `;
    }

    sectionsHtml += `
      <div class="section page-break-inside-avoid">
        <h2>${escapeHtml(sec.title)}</h2>
        ${sec.summary ? `<p class="summary-lead">${escapeHtml(sec.summary)}</p>` : ''}
        <div class="prose">
          ${bodyHtml}
        </div>
        ${subsectionsHtml}
        ${beforeAfterHtml}
      </div>
    `;
  }

  let keyDecisionsHtml = '';
  if (data.keyDecisions && data.keyDecisions.length > 0) {
    keyDecisionsHtml += `
      <div class="section page-break-inside-avoid">
        <h2>Key Principles & Decisions</h2>
        <div class="decisions-list">
    `;
    for (const kd of data.keyDecisions) {
      keyDecisionsHtml += `
        <div class="decision-item">
          <h3>${escapeHtml(kd.decision)}</h3>
          <p>${escapeHtml(kd.rationale)}</p>
        </div>
      `;
    }
    keyDecisionsHtml += `</div></div><div class="page-break"></div>`;
  }
  let prototypeMediaHtml = '';

  let metricsHtml = '';
  if (data.projectSnapshot.metrics && data.projectSnapshot.metrics.length > 0) {
    metricsHtml = `<div style="margin-top: 24px; padding: 20px; background: var(--bg-card); border-radius: 8px; border: 1px solid var(--border);">
      <h3 style="margin-top: 0; margin-bottom: 16px; color: var(--accent); font-size: 1.1rem;">Key Metrics</h3>
      <ul style="margin: 0; padding-left: 20px;">
        ${data.projectSnapshot.metrics.map((m: string) => `<li>${escapeHtml(m)}</li>`).join('')}
      </ul>
    </div>`;
  }

  let snapshotDetailsHtml = `<div style="display: flex; gap: 40px; margin-top: 24px; font-size: 0.95rem; border-top: 1px solid var(--border); padding-top: 16px;">
    ${data.projectSnapshot.timeline ? `<div><strong style="color: var(--text-muted); display: block; margin-bottom: 4px;">Timeline</strong>${escapeHtml(data.projectSnapshot.timeline)}</div>` : ''}
    ${data.projectSnapshot.team ? `<div><strong style="color: var(--text-muted); display: block; margin-bottom: 4px;">Team</strong>${escapeHtml(data.projectSnapshot.team)}</div>` : ''}
    ${data.projectSnapshot.budget ? `<div><strong style="color: var(--text-muted); display: block; margin-bottom: 4px;">Budget</strong>${escapeHtml(data.projectSnapshot.budget)}</div>` : ''}
  </div>`;

  let testimonialsHtml = '';
  if (data.reflection && data.reflection.people && data.reflection.people.length > 0) {
    testimonialsHtml += `
      <div class="section page-break-inside-avoid" style="margin-top: 80px; padding-top: 40px; border-top: 1px solid var(--border);">
        <h2 style="color: var(--accent); font-style: italic; font-size: 2rem;">"What They Said"</h2>
        <div class="testimonials-list" style="margin-top: 40px;">
    `;
    for (const person of data.reflection.people) {
      testimonialsHtml += `
        <div class="testimonial-item" style="margin-bottom: 40px;">
          <blockquote style="font-size: 1.25rem; font-style: italic; color: var(--text); border-left: none; padding-left: 0; line-height: 1.6;">
            "${escapeHtml(person.quote)}"
          </blockquote>
          <p style="margin-top: 16px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); font-size: 0.85rem;">
            — ${escapeHtml(person.name)}, <span style="color: var(--accent);">${escapeHtml(person.role)}</span>
          </p>
        </div>
      `;
    }
    testimonialsHtml += `</div></div>`;
  }

  const tagsHtml = data.scope.map((s: string) => '<span class="tag">' + escapeHtml(s) + '</span>').join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(data.slug)} - Case Study</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #ffffff;
      --bg-card: #f8f8fa;
      --text: #18181b;
      --text-muted: #52525b;
      --accent: ${accentColor};
      --border: rgba(0, 0, 0, 0.1);
    }
    
    * { box-sizing: border-box; }
    
    body {
      font-family: 'Inter', sans-serif;
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.7;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .container {
      max-width: 840px;
      margin: 0 auto;
      padding: 60px 40px;
    }
    
    header {
      margin-bottom: 60px;
      page-break-after: avoid;
    }
    
    .hero-label {
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--accent);
      font-weight: 600;
      margin-bottom: 24px;
      display: block;
    }

    h1 {
      font-size: 3.5rem;
      font-weight: 700;
      letter-spacing: -0.03em;
      margin: 0 0 24px 0;
      line-height: 1.1;
    }
    
    .subheading {
      font-size: 1.5rem;
      color: var(--text);
      font-weight: 400;
      margin: 0 0 40px 0;
      line-height: 1.4;
      max-width: 90%;
    }
    
    .meta-strip {
      display: flex;
      flex-wrap: wrap;
      gap: 32px;
      padding: 24px 0;
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
      margin-bottom: 40px;
    }
    
    .meta-item {
      display: flex;
      flex-direction: column;
    }
    
    .meta-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin-bottom: 8px;
    }
    
    .meta-value {
      font-weight: 500;
      font-size: 0.9375rem;
    }
    
    .cover-image {
      width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 0 0 40px 0;
    }
    
    h2 {
      font-size: 2.25rem;
      margin: 60px 0 32px 0;
      color: var(--text);
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.2;
    }
    
    h3 {
      font-size: 1.35rem;
      margin: 0 0 16px 0;
      font-weight: 600;
      color: var(--text);
      line-height: 1.3;
    }
    
    h4 {
      font-size: 1rem;
      margin: 0 0 8px 0;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    p {
      margin: 0 0 20px 0;
      font-size: 1.125rem;
      color: var(--text-muted);
    }

    strong {
      color: var(--text);
      font-weight: 600;
    }
    
    .section {
      margin-bottom: 80px;
    }
    
    .summary-lead {
      font-size: 1.375rem;
      font-weight: 500;
      color: var(--text);
      line-height: 1.5;
      margin-bottom: 32px;
    }
    
    .decision-item {
      margin-bottom: 32px;
      padding-left: 24px;
      border-left: 2px solid var(--accent);
    }

    .decision-item h3 {
      margin-top: 0;
      font-size: 1.25rem;
    }
    
    .decision-item p {
      font-size: 1.0625rem;
      margin: 0;
    }
    
    /* Storyboard Styles */
    .storyboard-grid {
      display: flex;
      flex-direction: column;
      gap: 60px;
      margin-top: 40px;
    }
    
    .slide-card {
      margin-bottom: 32px;
    }
    
    .slide-card h3 {
      font-size: 1.4rem;
      margin: 0 0 16px 0;
      color: var(--text);
    }
    
    .slide-content {
      font-size: 1.05rem;
      color: var(--text-muted);
      line-height: 1.6;
    }
    
    .slide-notes {
      margin-top: 16px;
      padding-left: 16px;
      border-left: 3px solid #3b82f6;
      font-size: 0.95rem;
      font-style: italic;
      color: var(--text-muted);
    }
    
    .image-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 32px;
      margin: 32px 0;
    }
    
    .image-grid img {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }
    
    .before-after {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin: 40px 0;
      background: var(--bg-card);
      padding: 32px;
      border-radius: 8px;
    }
    
    .tag-container {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 24px;
    }
    
    .tag {
      color: var(--accent);
      font-size: 0.875rem;
      font-weight: 500;
    }
    
    .page-break {
      page-break-before: always;
    }
    
    .page-break-inside-avoid {
      page-break-inside: avoid;
    }
    
    .story-image {
      margin: 40px 0;
      width: 100%;
    }
    
    .story-image img {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }
    
    @media print {
      body {
        font-size: 11pt;
      }
      .container {
        padding: 0;
        max-width: 100%;
      }
      .cover-image {
        page-break-after: always;
      }
      .slide-card {
        border: none;
        padding: 0;
        margin-bottom: 60px;
      }
      @page {
        margin: 20mm 15mm;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <span class="hero-label">Case Study</span>
      <h1>${escapeHtml(data.heroTitle)}</h1>
      <div class="subheading">${escapeHtml(data.heroSubheading)}</div>
      
      <div class="meta-strip">
        <div class="meta-item">
          <span class="meta-label">Role</span>
          <span class="meta-value">${escapeHtml(data.role)}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Company</span>
          <span class="meta-value">${escapeHtml(data.company)}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Timeline</span>
          <span class="meta-value">${escapeHtml(data.timeframe)}</span>
        </div>
      </div>
      
      <div class="tag-container">
        ${tagsHtml}
      </div>
    </header>

    ${data.coverImage ? '<img class="cover-image" src="' + relativeImage(data.coverImage.src) + '" alt="' + escapeHtml(data.coverImage.alt || '') + '" />' : ''}

    <div class="page-break"></div>

    <div class="section page-break-inside-avoid">
      <p class="summary-lead"><strong>The Problem:</strong> ${escapeHtml(data.projectSnapshot.problem)}</p>
      <p class="summary-lead"><strong>Impact:</strong> ${escapeHtml(data.projectSnapshot.impactDirectional)}</p>
      ${metricsHtml}
      ${snapshotDetailsHtml}
    </div>

    ${keyDecisionsHtml}

    ${sectionsHtml}

    ${testimonialsHtml}

  </div>
</body>
</html>`;
}

const reportcasterHtml = generateHTML(reportcasterCaseStudy, '#078B9C');
const mlFunctionsHtml = generateHTML(mlFunctionsCaseStudy, '#06b6d4');
const iqPluginHtml = generateHTML(iqPluginCaseStudy, '#0891b2');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'reportcaster-case-study.html'), reportcasterHtml);
fs.writeFileSync(path.join(outDir, 'ml-functions-case-study.html'), mlFunctionsHtml);
fs.writeFileSync(path.join(outDir, 'iq-plugin-case-study.html'), iqPluginHtml);

console.log('Successfully regenerated HTML.');
