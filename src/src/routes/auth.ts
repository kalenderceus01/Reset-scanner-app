import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../types";

const router = Router();

// Geçici kullanıcı veritabanı (ileride gerçek DB olacak)
const users: User[] = [];

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Kayıt endpoint
router.post("/register", (req, res) => {
  const { email, password } = req.body;

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Bu email zaten kayıtlı" });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser: User = {
    id: users.length + 1,
    email,
    password: hashedPassword,
    role: "user",
    createdAt: new Date(),
  };

  users.push(newUser);
  res.json({ message: "Kayıt başarılı", user: { email: newUser.email } });
});

// Login endpoint
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({ message: "Kullanıcı bulunamadı" });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Hatalı şifre" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ message: "Giriş başarılı", token });
});

export default router;
