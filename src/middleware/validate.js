// src/middleware/validate.js
import { AppError } from "../utils/errors.js";

export function validateBody(requiredFields = []) {
  return (req, _res, next) => {
    const body = req.body || {};

    const missing = requiredFields.filter(
      (f) => body[f] === undefined || body[f] === ""
    );

    if (missing.length) {
      return next(
        new AppError(400, "VALIDATION_ERROR", "Missing required fields", { missing })
      );
    }

    return next();
  };
}