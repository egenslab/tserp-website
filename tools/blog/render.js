// Render HTML pages to 2x PNG screenshots: node tools/blog/render.js <dir> <name> [<name> ...]
// Reads <dir>/<name>.html and writes <dir>/<name>.png (2400x1350). Used by art.py.
const { chromium } = require("playwright");

(async () => {
  const [dir, ...names] = process.argv.slice(2);
  const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM || "/opt/pw-browsers/chromium" });
  const page = await browser.newPage({ viewport: { width: 1200, height: 675 }, deviceScaleFactor: 2 });
  for (const name of names) {
    await page.goto(`file://${dir}/${name}.html`);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${dir}/${name}.png` });
  }
  await browser.close();
})();
