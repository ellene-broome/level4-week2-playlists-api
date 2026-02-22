// src/middleware/notFound.js
import { AppError } from "../utils/errors.js";

export function notFound(_req, _res, next) {
    next(new AppError(404, "NOT_FOUND", "Route not Found"));
}