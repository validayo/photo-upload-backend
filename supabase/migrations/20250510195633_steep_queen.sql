/*
  # Photos Schema Update

  1. Changes
    - Drop existing photos table if it exists
    - Create photos table with updated schema
    - Set up RLS policies

  2. Security
    - Enable RLS on photos table
    - Add policy for public read access
    - Add policy for service role full access
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