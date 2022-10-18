import { Router, Request, Response } from "express";
import core from "../core";

export const AppRouter = Router();

AppRouter.post("/", async (req: Request, res: Response) => {
  try {
    res.status(200).send(await core(req.body.url));
  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
});
