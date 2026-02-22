import express from "express";
import cors from "cors";
import { requestId } from "./middleware/requestId.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(requestId);
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
    data: {status: "ok" },
    meta: {},
 });
});