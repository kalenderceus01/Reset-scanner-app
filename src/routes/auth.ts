import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../middleware/auth";
import { User } from "../types";

const router = Router();

// Basit demo için bellek içi kullanıcı listesi
let users: User[] = [];

router.post("/register", (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });
  if (users.some(u => u.email === email)) return res.status(409).json({ message: "Email already used" });

  const newUser: User = {
    id: Date.now().toString(),
    email,
    password, // DİKKAT: demo; prod'da hash’le
    role: "user",
    createdAt: new Date()
  };

  users.push(newUser);

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, role: newUser.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  res.status(201).json({ token });
});

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  res.json({ token });
});

router.get("/me", authenticateToken, (req: Request, res: Response) => {
  res.json({ user: req.user });
});

export default router;
