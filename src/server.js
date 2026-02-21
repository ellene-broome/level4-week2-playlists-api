t// src/server.js

import express from 'express';

const app = express();

app.get("/health", (req, res) => {
    res.json({ ok: true, status: "ok" });
});

app.listen(3000, () => {
    console.log("API is running on http://localhost:3000");
});