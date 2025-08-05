/*
  # Add timeframe field to contact submissions

  1. Changes
    - Add timeframe column to contact_submissions table
*/

ALTER TABLE contact_submissions
ADD COLUMN IF NOT EXISTS timeframe text;