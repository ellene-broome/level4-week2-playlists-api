// src/app.js
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { requireAuth } from "./middleware/requireAuth.js";
import { requestId } from "./middleware/requestId.js";
import { validateBody } from "./middleware/validate.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

export const app = express();

// 1. Global middleware
app.use(requestId);
app.use(cors());
app.use(express.json());

// 2. Routes
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    ok: true,
    data: { message: "Welcome to the Playlists API" },
    meta: {},
  });
});

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    data: { status: "ok" },
    meta: {},
  });
});

// Temporary route to test validation middleware
app.post("/test-validation", validateBody(["name"]), (req, res) => {
  res.json({
    ok: true,
    data: { received: req.body.name },
    meta: {},
  });
});
// Temporary route to test auth middleware
app.get("/me", requireAuth, (req, res) => {
  res.json({
    ok: true,
    data: { user: req.user },
    meta: {},
  });
});

// 3. 404 handler (after routes)
app.use(notFound);

// 4. Error handler (MUST BE LAST)
app.use(errorHandler);