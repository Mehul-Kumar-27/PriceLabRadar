import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors/badrequest-error";
import scrapeProductDetails from "./scraper";

export async function getTheProductDetails(
    req: Request,
    res: Response,
    next: NextFunction
) {

    const url = req.query.url as string;
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
