import { Router } from "express";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.get("/profile", authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;
