/*
  # Update Contact Submissions Schema

  1. Changes
    Add new columns to contact_submissions table:
    - `time` (text) - Preferred time slot
    - `instagram` (text) - Instagram handle
    - `location` (text) - Desired shoot location  
    - `referral_source` (text) - How they heard about us
    - `questions` (text) - Additional questions/comments

  2. Security
    - Existing RLS policies remain unchanged
*/

ALTER TABLE contact_submissions
ADD COLUMN IF NOT EXISTS time text,
ADD COLUMN IF NOT EXISTS instagram text,
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS referral_source text,
ADD COLUMN IF NOT EXISTS questions text;