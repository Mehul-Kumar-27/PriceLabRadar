import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors/badrequest-error";
import scrapeProductDetails from "./scraper";

export async function getTheProductDetails(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const url =
  "https://www.amazon.in/Samsung-Segments-Smartphone-Octa-Core-Processor/dp/B0BZCSSNV7/ref=pd_day0fbt_img_sccl_1/257-8372583-1045813?pd_rd_w=UQkyn&content-id=amzn1.sym.9fcd4617-323e-42b7-9728-3395e1b2fea0&pf_rd_p=9fcd4617-323e-42b7-9728-3395e1b2fea0&pf_rd_r=S9XAMN5GBM0V8JKDZQ0T&pd_rd_wg=7wcL2&pd_rd_r=089c3703-a9f4-4b1c-8411-8814a3c9d684&pd_rd_i=B0BZCSSNV7&psc=1";
    //const url = req.body.url;
    const isValidUrl = validateUrl(url);



    try {
        const productDetails = await scrapeProductDetails(url);
        return res.status(200).json(productDetails);
    } catch (error) {
        
        console.error("Error scraping product details:", error);
        return next(new BadRequestError("Error fetching product details"));
    }
}

function validateUrl(input: string): boolean {
    const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6}\.?)(\/[\w.-]*)*\/?$/i;
    return urlRegex.test(input);
}
