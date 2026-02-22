// src/middleware/errorHandler.js
export function errorHandler(err, req, res, _next) {
    const status = err.status || 500;

    const code = err.code || "INTERNAL_SERVER_ERROR";
    const message = err.message || "Internal Server Error";

// Phase 1
const details = err.details ?? null;

return res.status(status).json({
    ok: false,
    error: {
        code,
        message,
        details,
        requestId: req.requestId || null,
    }
});
}