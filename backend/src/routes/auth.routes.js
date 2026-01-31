import express from "express";

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new account
 * @access  Public
 */
router.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    return res.status(200).json({
      message: "Register endpoint reached",
      data: { email, role },
    });
  } catch (err) {
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
    const { email } = req.body;

    return res.status(200).json({
      message: "Login endpoint reached",
      data: { email },
    });
  } catch (err) {
    return res.status(500).json({
      error: "Login failed",
    });
  }
});

export default router;
