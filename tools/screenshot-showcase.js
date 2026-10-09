// Renders tools/showcase.html for each sample client and saves screenshots to public/assets/img/success/.
// Usage: node tools/screenshot-showcase.js   (needs the `playwright` package)
// Replace these images with real client website screenshots when available.
const path = require('path');
const { chromium } = require('playwright');

const SITES = ['umrah', 'b2b', 'tours', 'gulf', 'visa', 'corp'];

(async () => {
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 0.75 });
  const file = 'file://' + path.resolve(__dirname, 'showcase.html');
  for (const id of SITES) {
    await page.goto(`${file}?id=${id}`);
    const out = path.resolve(__dirname, '..', 'public/assets/img/success', `${id}.jpg`);
    await page.screenshot({ path: out, type: 'jpeg', quality: 82 });
    console.log('saved', out);
  }
  await browser.close();
})();
