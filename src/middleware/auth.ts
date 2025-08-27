import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

  if (!token) return res.status(401).json({ message: "Token gerekli" });

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
    // @ts-ignore
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: "Geçersiz veya süresi dolmuş token" });
  }
}
