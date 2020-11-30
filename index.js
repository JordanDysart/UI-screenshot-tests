const puppeteer = require('puppeteer');
const ScreenshotTester = require('puppeteer-screenshot-tester');

(async () => {

  
  const tester = await ScreenshotTester(0.2, true, true, [], {
    transparency: 0.8,
    errorSettings: {
      errorColor: {
        red: 255,
        green: 0,
        blue: 255
      },
      errorType: 'flat',
      transparency: 0.7
    }
  });
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage({
    headless: false,
    slowMo: 500
  });



  await page.setViewport({width: 1920, height: 1080})
  await page.goto(`https://clarkstreetsports1.myshopify.com/collections/chicago-blackhawks`, { waitUntil: 'networkidle0' });
  await page.screenshot({path: `./test/original.png`});
  await page.goto(`https://clarkstreetsports1.myshopify.com/collections/chicago-blackhawks?preview_theme_id=83486933097`, { waitUntil: 'networkidle0' });

  // call our tester with browser page returned by puppeteer browser
  // second parameter is optional it's just a test name if provide that's filename
  const result = await tester(page, 'test2', { 
    path: './test/original.png',
    fullPage: true,
    saveNewImageOnError:'./errors/results.png'
  });

  await browser.close();

})();