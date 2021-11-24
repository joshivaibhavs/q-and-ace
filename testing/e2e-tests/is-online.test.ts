import puppeteer from 'puppeteer';

let browser: puppeteer.Browser | undefined, page: puppeteer.Page;

const getBrowser = async (): Promise<puppeteer.Browser> => {
  if (browser) return browser;
  browser = await puppeteer.launch();
  return browser;
};

const getPage = async () => {
  const b = await getBrowser();
  if (page) return page;
  page = await b.newPage();
  await page.goto('https://joshivaibhavs.github.io/q-and-ace/');
  await page.waitForSelector('h1.logo');
  return page;
};

describe('Q & Ace e2e tests', () => {
  afterAll(async () => {
    if (browser) {
      await browser.close();
      browser = undefined;
    }
  });

  test('Site is online', async () => {
    const p = await getPage();
    expect(p).toBeTruthy();
  });

  test('Site has the correct logo', async () => {
    const p = await getPage();
    const logoEl = await p.$eval('h1.logo', (el) => el.innerHTML);
    console.log(logoEl);
    const logo = logoEl.toString();
    expect(logo).toEqual('<a href="index.html">Q &amp; Ace<span>.</span></a>');
  });

  test('Site has the correct image', async () => {
    const p = await getPage();
    const bgImage = await p.$eval('section#hero', (el) => getComputedStyle(el).getPropertyValue('background'));
    console.log(bgImage);
    expect(bgImage.includes('assets/img/hero-bg.jpg')).toBe(true);
  });
});
