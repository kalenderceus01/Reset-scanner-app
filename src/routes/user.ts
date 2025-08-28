import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { User } from "../types";

const router = Router();

// örnek kullanıcı verisi
let users: User[] = [];

// kullanıcı bilgilerini getir
router.get("/me", authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// yeni kullanıcı ekle
router.post("/", (req, res) => {
  const newUser: User = {
    id: Date.now().toString(),
    email: req.body.email,
    password: req.body.password,
    role: "user",
    createdAt: new Date(),
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

export default router;
