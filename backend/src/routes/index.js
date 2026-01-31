import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/health", (req, res) => {
  return res.status(200).json({
    status: "ok",
    message: "ServiceNest backend is alive",
  });
});

router.get("/me", requireAuth, (req, res) => {
  return res.status(200).json({
    message: "You are authenticated",
    auth: req.auth,
  });
});

export default router;
