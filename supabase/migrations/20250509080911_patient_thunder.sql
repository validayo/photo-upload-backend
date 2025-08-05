/*
  # Add newsletter subscribers table

  1. New Tables
    - `newsletter_subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
      
  2. Security
    - Enable RLS on `newsletter_subscribers` table
    - Add policy for inserting new subscribers
    - Add policy for service role to read all subscribers
*/

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe
CREATE POLICY "Anyone can subscribe to newsletter" 
  ON newsletter_subscribers
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only service role can read subscribers
CREATE POLICY "Service role can read all subscribers"
  ON newsletter_subscribers
  FOR SELECT
  TO service_role
  USING (true);