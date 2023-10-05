import { Request, Response } from "express";
import { createUser } from "../services/user.services";

export async function createUserHandeller(req: Request, res: Response) {
  try {
    const user = await createUser(req.body).then((user) => {
      res.status(201).json(user);
    });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
}
