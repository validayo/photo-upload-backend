import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

import contactFormRouter from './routes/contactForm';
import newsletterRouter from './routes/newsletter';
import storageRouter from './routes/storage';
import galleryRouter from './routes/gallery';

// 👇 Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

console.log('Loaded SUPABASE_URL:', process.env.SUPABASE_URL);

// ❌ Check for missing env vars
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing Supabase environment variables.');
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 3001;
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';

// ✅ Middleware
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json());

// ✅ Routes
app.use('/contact-form', contactFormRouter);
app.use('/newsletter', newsletterRouter);
app.use('/upload-photos', storageRouter);
app.use('/images', galleryRouter);

// ✅ Health check
app.get('/health', (_, res) => {
  res.status(200).send('✅ Backend is healthy');
});

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Backend running at http://localhost:${port}`);
});