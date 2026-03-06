const puppeteer = require('puppeteer-core');
const { marked } = require('marked');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ROOT = path.join(__dirname, '..');

async function generatePdf(companyName) {
  const cvMdPath = path.join(ROOT, 'output', companyName, 'cv.md');
  const pdfOutPath = path.join(ROOT, 'output', companyName, 'cv.pdf');
  const photoPath = path.join(ROOT, 'assets', 'photo.jpeg');

  if (!fs.existsSync(cvMdPath)) {
    console.error(`cv.md not found at: ${cvMdPath}`);
    process.exit(1);
  }

  const mdContent = fs.readFileSync(cvMdPath, 'utf8');
  marked.use({ breaks: true });
  const htmlBody = marked.parse(mdContent);

  let photoDataUri = '';
  if (fs.existsSync(photoPath)) {
    const photoBuffer = fs.readFileSync(photoPath);
    photoDataUri = `data:image/jpeg;base64,${photoBuffer.toString('base64')}`;
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @page {
    size: A4;
    margin: 0;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Times New Roman', Times, serif;
    font-size: 10.5pt;
    line-height: 1.4;
    color: #1a1a1a;
    background: white;
    padding: 15mm 18mm 15mm 18mm;
    width: 210mm;
    min-height: 297mm;
    position: relative;
  }

  /* Header area */
  .cv-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
  }

  .cv-header-info h1 {
    font-size: 18pt;
    font-weight: 700;
    color: #111;
    margin-bottom: 3px;
  }

  .cv-header-info p {
    font-size: 9.5pt;
    color: #444;
    line-height: 1.5;
    text-align: left;
  }

  .cv-photo {
    width: 80px;
    height: auto;
    border-radius: 4px;
    flex-shrink: 0;
    margin-left: 15px;
  }

  /* Section headers (h2) */
  h2 {
    font-size: 10.5pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #111;
    margin-top: 10px;
    margin-bottom: 5px;
    text-align: center;
  }

  /* Job title (h2 immediately after header) */
  body > h2:first-of-type {
    border-bottom: none;
    font-size: 12pt;
    text-transform: none;
    letter-spacing: 0;
    color: #333;
    margin-top: 4px;
    margin-bottom: 6px;
    text-align: center;
  }

  /* Role headers inside experience (h3) */
  h3 {
    font-size: 10.5pt;
    font-weight: 600;
    margin-top: 6px;
    margin-bottom: 1px;
    color: #111;
  }

  /* Date lines (em/italic) */
  em {
    font-size: 9.5pt;
    color: #555;
    font-style: normal;
    display: block;
    margin-bottom: 3px;
  }

  /* Bullet lists */
  ul {
    padding-left: 14px;
    margin-bottom: 4px;
  }

  li {
    font-size: 10pt;
    line-height: 1.35;
    margin-bottom: 1px;
    color: #222;
  }

  /* Paragraphs (used in summary and skills) */
  p {
    font-size: 10pt;
    margin-bottom: 4px;
    color: #222;
    line-height: 1.4;
    text-align: justify;
  }

  /* Horizontal rule — hidden */
  hr {
    display: none;
  }

  /* Strong */
  strong {
    font-weight: 600;
  }

  @media print {
    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
</style>
</head>
<body>
${photoDataUri ? `
<div class="cv-header">
  <div class="cv-header-info">
${(() => { const lines = htmlBody.split('\n'); const h2Idx = lines.findIndex(l => l.trimStart().startsWith('<h2')); return h2Idx > 0 ? lines.slice(0, h2Idx).join('\n') : lines.slice(0, 2).join('\n'); })()}
  </div>
  <img class="cv-photo" src="${photoDataUri}" alt="Profile photo">
</div>
${(() => { const lines = htmlBody.split('\n'); const h2Idx = lines.findIndex(l => l.trimStart().startsWith('<h2')); return h2Idx > 0 ? lines.slice(h2Idx).join('\n') : lines.slice(2).join('\n'); })()}
` : htmlBody}
</body>
</html>`;

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const a4HeightPx = 1132; // ~297mm at 96dpi with small buffer for rounding
    if (scrollHeight > a4HeightPx) {
      console.warn(`[PAGE OVERFLOW] Content is ${scrollHeight}px — exceeds 1 A4 page (${a4HeightPx}px). CV must be shortened.`);
    }
    await page.pdf({
      path: pdfOutPath,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
    });
    console.log(`PDF saved: ${pdfOutPath}`);
    await page.close();

    await generateCoverLetterPdf(companyName, browser);
  } finally {
    await browser.close();
  }
}

async function generateCoverLetterPdf(companyName, browser) {
  const clMdPath = path.join(ROOT, 'output', companyName, 'cover_letter.md');
  const clPdfPath = path.join(ROOT, 'output', companyName, 'cover_letter.pdf');

  if (!fs.existsSync(clMdPath)) {
    console.log('No cover_letter.md found, skipping.');
    return;
  }

  const mdContent = fs.readFileSync(clMdPath, 'utf8');
  const htmlBody = marked.parse(mdContent);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Times New Roman', Times, serif;
    font-size: 11pt;
    line-height: 1.6;
    color: #1a1a1a;
    background: white;
    padding: 20mm 22mm;
    width: 210mm;
  }
  h1 { font-size: 14pt; font-weight: 700; margin-bottom: 6px; }
  h2 { font-size: 11pt; font-weight: 400; color: #555; margin-bottom: 18px; }
  hr { display: none; }
  p { margin-bottom: 12px; text-align: justify; }
</style>
</head>
<body>
${htmlBody}
</body>
</html>`;

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: clPdfPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
  });
  console.log(`Cover letter PDF saved: ${clPdfPath}`);
  await page.close();
}

const companyName = process.argv[2];
if (!companyName) {
  console.error('Usage: node scripts/generate-pdf.js <company-name>');
  process.exit(1);
}

generatePdf(companyName).catch((err) => {
  console.error('PDF generation failed:', err.message);
  process.exit(1);
});
