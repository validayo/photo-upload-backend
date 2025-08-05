/*
  # Blocked Times Schema

  1. New Tables
    - `blocked_times`
      - `id` (uuid, primary key)
      - `start_time` (timestamptz)
      - `end_time` (timestamptz)
      - `title` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `blocked_times` table
    - Add policy for service role to manage blocked times
*/

CREATE TABLE IF NOT EXISTS blocked_times (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  title text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blocked_times ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage blocked times"
  ON blocked_times
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);