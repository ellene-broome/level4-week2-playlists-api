// src/middleware/requireAuth.js
import { AppError } from "../utils/errors.js";
import { verifyToken } from "../utils/jwt.js";
import { findUserById } from "../repos/userRepo.js";

export function requireAuth(req, _res, next) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    return next(new AppError(401, "AUTH_REQUIRED", "Missing Bearer token"));
  }

  try {
    const payload = verifyToken(token);

    const user = findUserById(payload.userId);
    if (!user) {
      return next(new AppError(401, "AUTH_INVALID", "Invalid token user"));
    }

    // Attach authenticated user to request (safe fields only)
    req.user = { id: user.id, email: user.email };

    return next();
  } catch (_err) {
    return next(new AppError(401, "AUTH_INVALID", "Invalid or expired token"));
  }
}