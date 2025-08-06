import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load .env from backend folder, or override via ENV_PATH
const envPath =
  process.env.ENV_PATH ||
  path.resolve(__dirname, '../../../../project/backend/.env');

dotenv.config({ path: envPath });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('❌ Supabase environment variables are missing');
}

console.log('🔑 Supabase URL loaded');

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);