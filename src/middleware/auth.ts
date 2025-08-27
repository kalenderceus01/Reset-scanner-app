import { Request, Response, NextFunction } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.headers["x-user-id"]) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
