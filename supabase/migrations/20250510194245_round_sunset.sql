/*
  # Add photos table

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
    - Add policy for service role to manage photos
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

-- Allow public read access
CREATE POLICY "Anyone can view photos" 
  ON photos
  FOR SELECT
  TO public
  USING (true);

-- Allow service role full access
CREATE POLICY "Service role can manage photos"
  ON photos
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);