import { Router, Request, Response } from "express";
import { Role, User } from "../types";

const router = Router();
let users: User[] = [];

const normalizeEmail = (email: string) => email.trim().toLowerCase();

router.post("/register", (req: Request, res: Response) => {
  const { email, password, role } = req.body as {
    email?: string;
    password?: string;
    role?: Role;
  };
  if (!email || !password) {
    return res.status(400).json({ error: "email and password required" });
  }

  const e = normalizeEmail(email);
  if (users.find((u) => u.email === e)) {
    return res.status(409).json({ error: "already_registered" });
  }

  const user: User = {
    id: (Date.now() + Math.random()).toString(36),
    email: e,
    password,
    role: role || "user",
    createdAt: new Date()
  };
  users.push(user);
  return res.status(201).json({ id: user.id, email: user.email, role: user.role });
});

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) {
    return res.status(400).json({ error: "email and password required" });
  }

  const e = normalizeEmail(email);
  const user = users.find((u) => u.email === e && u.password === password);
  if (!user) {
    return res.status(401).json({ error: "invalid_credentials" });
  }

  return res.json({ id: user.id, email: user.email, role: user.role });
});

export default router;
