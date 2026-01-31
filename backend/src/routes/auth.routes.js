import express from "express";
import prisma from "../db/prismaClient.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new account
 * @access  Public
 */
router.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        error: "email, password, and role are required",
      });
    }

    const existing = await prisma.account.findUnique({
      where: { email },
    });

    if (existing) {
      return res.status(409).json({
        error: "Email already exists",
      });
    }

    const passwordHash = await hashPassword(password);

    const created = await prisma.account.create({
      data: {
        email,
        passwordHash,
        role,
        status: "active",
      },
      select: {
        accountId: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    const safeAccount = {
      accountId: created.accountId.toString(),
      email: created.email,
      role: created.role,
      status: created.status,
      createdAt: created.createdAt,
    };

    return res.status(201).json({
      message: "Account created",
      account: safeAccount,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Registration failed",
    });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user
 * @access  Public
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "email and password are required",
      });
    }

    const account = await prisma.account.findUnique({
      where: { email },
    });

    if (!account) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const match = await verifyPassword(password, account.passwordHash);

    if (!match) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const token = generateToken({
      accountId: account.accountId.toString(),
      role: account.role,
    });

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Login failed",
    });
  }
});

export default router;
