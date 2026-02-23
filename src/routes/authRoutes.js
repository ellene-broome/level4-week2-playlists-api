// src/routes/authRoutes.js
import express from "express";
import bcrypt from "bcryptjs";
import { validateBody } from "../middleware/validate.js";
import { AppError } from "../utils/errors.js";
import { createUser, findUserByEmail } from "../repos/userRepo.js";
import { signToken } from "../utils/jwt.js";

const router = express.Router();

router.post(
  "/register",
  validateBody(["email", "password"]),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (findUserByEmail(email)) {
        throw new AppError(409, "EMAIL_EXISTS", "Email already registered");
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const user = createUser({ email, passwordHash });

      const token = signToken({ userId: user.id });

      res.status(201).json({
        ok: true,
        data: { token },
        meta: {},
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/login",
  validateBody(["email", "password"]),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = findUserByEmail(email);
      if (!user) {
        throw new AppError(401, "INVALID_CREDENTIALS", "Invalid email or password");
      }

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) {
        throw new AppError(401, "INVALID_CREDENTIALS", "Invalid email or password");
      }

      const token = signToken({ userId: user.id });

      res.json({
        ok: true,
        data: { token },
        meta: {},
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;