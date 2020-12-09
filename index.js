const puppeteer = require('puppeteer');
const fs = require('fs');

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  await page.goto(
    'http://localhost:3000/share/be70d46f-7b80-43b1-9447-469122455171',
    {
      waitUntil: 'networkidle2',
    }
  );
  await page.addStyleTag({
    content: '@page { size: auto; }',
  });
  let height = await page.evaluate(() => document.documentElement.offsetHeight);
  console.log('Height', height);

  const pdf = await page.pdf({
    path: 'download.pdf',
    printBackground: true,
    margin: 'none',
    // height: height + "px",
  });

  await browser.close();
})();
