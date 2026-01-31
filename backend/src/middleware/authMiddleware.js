import { verifyToken } from "../utils/jwt.js";

export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      error: "Missing Authorization header",
    });
  }

  const parts = header.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({
      error: "Invalid Authorization header format",
    });
  }

  const scheme = parts[0];
  const token = parts[1];

  if (scheme !== "Bearer") {
    return res.status(401).json({
      error: "Authorization scheme must be Bearer",
    });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }

  req.auth = decoded;
  return next();
};
