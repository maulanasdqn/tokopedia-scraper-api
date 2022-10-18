import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

const app = puppeteer;
app.use(StealthPlugin());

const core = async (url: string): Promise<{ product_name: string; product_price: number }> => {
  const browser = await app.launch({
    headless: true,
    executablePath: process.env.BROWSER,
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();

  await page.setViewport({ width: 300, height: 300 });

  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });
  try {
    const product_name = await page.evaluate(
      () => document?.querySelector(".css-1320e6c")?.textContent,
    );

    const product_price = parseInt(
      await page.evaluate(() => document?.querySelector(".price")?.textContent),
    );

    await browser.close();

    return {
      product_name,
      product_price,
    };
  } catch (err) {
    console.log(err);
  }
};

export default core;
