/*
  # Fix Photos Table Schema

  1. Changes
    - Drop and recreate photos table with correct schema
    - Add proper RLS policies
    - Add indexes for performance

  2. Security
    - Enable RLS
    - Add policy for public read access
    - Add policy for service role management
*/

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  thumb_url text NOT NULL,
  full_url text NOT NULL,
  title text,
  created_at timestamptz DEFAULT now()
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS photos_category_idx ON photos(category);
CREATE INDEX IF NOT EXISTS photos_created_at_idx ON photos(created_at DESC);

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