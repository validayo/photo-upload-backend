/*
  # Contact Form Schema

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `service` (text)
      - `occasion` (text)
      - `add_ons` (text[])
      - `date` (date)
      - `pinterest_inspo` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for service role to read all submissions
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  service text NOT NULL,
  occasion text NOT NULL,
  add_ons text[] DEFAULT '{}',
  date date NOT NULL,
  pinterest_inspo text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can read all submissions"
  ON contact_submissions
  FOR SELECT
  TO service_role
  USING (true);