/*
  # Photos table schema

  1. New Tables
    - `photos`
      - `id` (uuid, primary key)
      - `category` (text)
      - `thumb_url` (text)
      - `full_url` (text)
      - `title` (text, nullable)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `photos` table
    - Add policy for public read access
    - Add policy for service role management
*/

CREATE TABLE IF NOT EXISTS photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  thumb_url text NOT NULL,
  full_url text NOT NULL,
  title text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Anyone can view photos" ON photos;
  DROP POLICY IF EXISTS "Service role can manage photos" ON photos;
  
  -- Create new policies
  CREATE POLICY "Anyone can view photos" 
    ON photos
    FOR SELECT
    TO public
    USING (true);

  CREATE POLICY "Service role can manage photos"
    ON photos
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
END $$;