import puppeteer, { Page } from "puppeteer";

const scrapeProductDetails = async (url: string) => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  try {
    await page.goto(url);
    const productDetails = await page.$$("#ppd");

    const scrapedDetails = await Promise.all(
      productDetails.map((element) => scrapeTitleAndRating(page, element))
    );

    return scrapedDetails;
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await browser.close();
  }
};

const scrapeTitleAndRating = async (
  page: Page,
  element: { $: (arg0: string) => any }
) => {
  const titleElement = await element.$("#productTitle");
  const ratingElement = await element.$(
    "#acrPopover > span.a-declarative > a > span"
  );
  const priceElement = await element.$(".a-price");

  const title = titleElement
    ? await page.evaluate((el) => el.textContent.trim(), titleElement)
    : "Not Found";

  const rating = ratingElement
    ? await page.evaluate((el) => el.textContent.trim(), ratingElement)
    : "Rating Not Found";
  const price = priceElement
    ? await page.evaluate((el) => el.textContent.trim(), priceElement)
    : "Price Not Found";

  console.log("Title:", title);
  console.log("Rating:", rating);
  console.log("Price:", price);

  return { "Title": title, "Rating": rating, "Price": price };
};

export default scrapeProductDetails;
