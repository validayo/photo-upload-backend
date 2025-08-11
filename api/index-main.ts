import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Set up __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env BEFORE ANY other imports!
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(__dirname, "../backend/.env") });
}

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import contactFormRouter from "../backend/routes/contactForm.js";
import newsletterRouter from "../backend/routes/newsletter.js";
import storageRouter from "../backend/routes/storage.js";
import galleryRouter from "../backend/routes/gallery.js";

// Debug: Confirm environment variables are loaded
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "present" : "MISSING");

const app = express();
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

// CORS MUST be the very first middleware!
app.use(
  cors({
    origin: corsOrigin,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
app.use(express.json());

// Handle CORS preflight OPTIONS requests for ALL routes
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", corsOrigin);
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
});

app.get("/ping", (_, res) => {
  res.json({ message: "🏓 Pong from backend!" });
});

app.use("/contact-form", contactFormRouter);
app.use("/newsletter", newsletterRouter);
app.use("/upload-photos", storageRouter);
app.use("/images", galleryRouter);

// Error handler that always sends CORS headers
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", corsOrigin);
  res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  if (!res.headersSent) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

app.get("/health", (_, res) => {
  res.status(200).send("✅ Backend is healthy");
});

// --- Vercel handler export ---
import type { VercelRequest, VercelResponse } from "@vercel/node";
export default (req: VercelRequest, res: VercelResponse) => {
  app(req, res);
};