import { NextFunction, Request, Response } from "express";

export function userVerification(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) return res.sendStatus(401);

  next();
}
