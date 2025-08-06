import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

import contactFormRouter from "../backend/routes/contactForm.js";
import newsletterRouter from "../backend/routes/newsletter.js";
import storageRouter from "../backend/routes/storage.js";
import galleryRouter from "../backend/routes/gallery.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(__dirname, "../backend/.env") });
}

const app = express();
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json());

app.get("/ping", (_, res) => {
  res.json({ message: "🏓 Pong from backend!" });
});

app.use("/contact-form", contactFormRouter);
app.use("/newsletter", newsletterRouter);
app.use("/upload-photos", storageRouter);
app.use("/images", galleryRouter);

app.get("/health", (_, res) => {
  res.status(200).send("✅ Backend is healthy");
});

// ✅ Export the Express app directly
export default app;