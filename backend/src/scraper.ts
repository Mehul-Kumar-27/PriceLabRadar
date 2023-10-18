import puppeteer from "puppeteer";

const url =
  "https://www.amazon.in/Samsung-Segments-Smartphone-Octa-Core-Processor/dp/B0BZCSSNV7/ref=pd_day0fbt_img_sccl_1/257-8372583-1045813?pd_rd_w=UQkyn&content-id=amzn1.sym.9fcd4617-323e-42b7-9728-3395e1b2fea0&pf_rd_p=9fcd4617-323e-42b7-9728-3395e1b2fea0&pf_rd_r=S9XAMN5GBM0V8JKDZQ0T&pd_rd_wg=7wcL2&pd_rd_r=089c3703-a9f4-4b1c-8411-8814a3c9d684&pd_rd_i=B0BZCSSNV7&psc=1";

const scrapeProductDetails = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  try {
    await page.goto(url);
    const productDetails = await page.$$("#ppd");

    const scrapeTitleAndRating = async (element: { $: (arg0: string) => any; }) => {
      const titleElement = await element.$("#productTitle");
      const ratingElement = await element.$(
        "#acrPopover > span.a-declarative > a > span"
      );

      const title = titleElement
        ? await page.evaluate((el) => el.textContent.trim(), titleElement)
        : "Not Found";

      const rating = ratingElement
        ? await page.evaluate((el) => el.textContent.trim(), ratingElement)
        : "Rating Not Found";

      console.log("Title:", title);
      console.log("Rating:", rating);
    };

    await Promise.all(productDetails.map(scrapeTitleAndRating));
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await browser.close();
  }
};

scrapeProductDetails();
