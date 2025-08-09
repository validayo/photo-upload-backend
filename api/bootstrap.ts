import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ESM compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env BEFORE anything else
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(__dirname, "../backend/.env") });
}

// Now, import your main server
import("./index-main.js");