import { Router } from "express";
import jwt from "jsonwebtoken";
import { User } from "../types";

const router = Router();

let users: User[] = [];

// Kullanıcı kaydı
router.post("/register", (req, res) => {
  const { email, password } = req.body;

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser: User = {
    id: Date.now().toString(),
    email,
    password,
    role: "user",
    createdAt: new Date(),
  };

  users.push(newUser);
  res.status(201).json({ message: "User registered successfully" });
});

// Kullanıcı girişi
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

export default router;
