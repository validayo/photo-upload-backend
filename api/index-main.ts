import express from "express";
import cors from "cors";

const app = express();
const corsOrigin = "http://localhost:5173"; // hardcoded for testing

app.use(cors({
  origin: corsOrigin,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Authorization", "Content-Type"],
}));
app.use(express.json());

// CORS preflight handler for ALL routes
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", corsOrigin);
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
});

// Example test route
app.get("/ping", (_, res) => {
  res.json({ message: "🏓 Pong from backend!" });
});

// --- Vercel handler export ---
import type { VercelRequest, VercelResponse } from "@vercel/node";
export default (req: VercelRequest, res: VercelResponse) => {
  app(req, res);
};